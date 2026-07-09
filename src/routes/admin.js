import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { requireAdmin } from '../middleware/auth.js';
import { extractCourseFromText } from '../services/claudeClient.js';
import {
  findAdminByEmail,
  listCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  listCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from '../repositories/courseRepository.js';
import { listLinks, createLink, updateLink, deleteLink } from '../repositories/linkRepository.js';
import {
  listVouchers,
  createVoucher,
  updateVoucher,
  deleteVoucher,
} from '../repositories/voucherRepository.js';

export const adminRouter = Router();

// ---- auth ----

adminRouter.post('/api/login', async (req, res) => {
  const { email, password } = req.body || {};
  const user = email && findAdminByEmail(email);
  if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) {
    return res.status(401).json({ error: 'Email ou senha inválidos.' });
  }
  req.session.adminId = user.id;
  res.json({ ok: true, email: user.email });
});

adminRouter.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

adminRouter.get('/api/me', requireAdmin, (req, res) => {
  res.json({ ok: true });
});

// tudo abaixo exige sessão de admin
adminRouter.use('/api', requireAdmin);

// ---- courses ----
// O curso guarda só a mensalidade cheia (priceFull).

adminRouter.get('/api/courses', (req, res) => {
  res.json(listCourses());
});

adminRouter.post('/api/courses', async (req, res) => {
  const { name, level, modality, duration, priceFull } = req.body || {};
  if (!name || !level || !modality || !duration) {
    return res.status(400).json({ error: 'name, level, modality e duration são obrigatórios.' });
  }
  const course = await createCourse({ name, level, modality, duration, priceFull });
  res.status(201).json(course);
});

adminRouter.put('/api/courses/:id', async (req, res) => {
  const course = await updateCourse(Number(req.params.id), req.body || {});
  if (!course) return res.status(404).json({ error: 'Curso não encontrado.' });
  res.json(course);
});

adminRouter.delete('/api/courses/:id', async (req, res) => {
  await deleteCourse(Number(req.params.id));
  res.json({ ok: true });
});

// ---- campaigns ----
// Desconto, matrícula e nota da 1ª mensalidade valem pra todos os cursos da campanha.

adminRouter.get('/api/campaigns', (req, res) => {
  res.json(listCampaigns());
});

adminRouter.post('/api/campaigns', async (req, res) => {
  const { name, level } = req.body || {};
  if (!name || !level) return res.status(400).json({ error: 'name e level são obrigatórios.' });
  const campaign = await createCampaign(req.body);
  res.status(201).json(campaign);
});

adminRouter.put('/api/campaigns/:id', async (req, res) => {
  const campaign = await updateCampaign(Number(req.params.id), req.body || {});
  if (!campaign) return res.status(404).json({ error: 'Campanha não encontrada.' });
  res.json(campaign);
});

adminRouter.delete('/api/campaigns/:id', async (req, res) => {
  await deleteCampaign(Number(req.params.id));
  res.json({ ok: true });
});

// ---- links de matrícula ----

adminRouter.get('/api/links', (req, res) => {
  res.json(listLinks());
});

adminRouter.post('/api/links', async (req, res) => {
  const { name, url } = req.body || {};
  if (!name || !url) return res.status(400).json({ error: 'name e url são obrigatórios.' });
  const link = await createLink(req.body);
  res.status(201).json(link);
});

adminRouter.put('/api/links/:id', async (req, res) => {
  const link = await updateLink(Number(req.params.id), req.body || {});
  if (!link) return res.status(404).json({ error: 'Link não encontrado.' });
  res.json(link);
});

adminRouter.delete('/api/links/:id', async (req, res) => {
  await deleteLink(Number(req.params.id));
  res.json({ ok: true });
});

// ---- vouchers de isenção de matrícula ----

adminRouter.get('/api/vouchers', (req, res) => {
  res.json(listVouchers());
});

adminRouter.post('/api/vouchers', async (req, res) => {
  const { name, code } = req.body || {};
  if (!name || !code) return res.status(400).json({ error: 'name e code são obrigatórios.' });
  const voucher = await createVoucher(req.body);
  res.status(201).json(voucher);
});

adminRouter.put('/api/vouchers/:id', async (req, res) => {
  const voucher = await updateVoucher(Number(req.params.id), req.body || {});
  if (!voucher) return res.status(404).json({ error: 'Voucher não encontrado.' });
  res.json(voucher);
});

adminRouter.delete('/api/vouchers/:id', async (req, res) => {
  await deleteVoucher(Number(req.params.id));
  res.json({ ok: true });
});

// ---- importação assistida por IA (sempre com revisão humana antes de salvar) ----

adminRouter.post('/api/import/extract', async (req, res) => {
  try {
    const { rawText } = req.body || {};
    if (!rawText || typeof rawText !== 'string' || rawText.trim().length < 20) {
      return res.status(400).json({ error: 'Cole o texto do regulamento (mínimo ~20 caracteres).' });
    }
    const draft = await extractCourseFromText(rawText);
    if (!draft) return res.status(502).json({ error: 'Não foi possível extrair dados desse texto.' });
    res.json({ draft });
  } catch (err) {
    if (err.code === 'MISSING_API_KEY') {
      return res.status(503).json({ error: err.message });
    }
    console.error('Erro no /admin/api/import/extract:', err);
    res.status(500).json({ error: 'Erro ao processar a extração com IA.' });
  }
});
