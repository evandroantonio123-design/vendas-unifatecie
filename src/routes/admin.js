import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { requireAdmin } from '../middleware/auth.js';
import { extractCourseFromText } from '../services/claudeClient.js';
import {
  findAdminByEmail,
  listCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  listCampaigns,
  getCampaign,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  listPricingForCourse,
  upsertPricing,
  deletePricing,
} from '../repositories/courseRepository.js';

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

adminRouter.get('/api/courses', (req, res) => {
  const courses = listCourses().map((course) => ({
    ...course,
    pricing: listPricingForCourse(course.id),
  }));
  res.json(courses);
});

adminRouter.post('/api/courses', async (req, res) => {
  const { name, level, modality, duration } = req.body || {};
  if (!name || !level || !modality || !duration) {
    return res.status(400).json({ error: 'name, level, modality e duration são obrigatórios.' });
  }
  const course = await createCourse({ name, level, modality, duration });
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

adminRouter.get('/api/campaigns', (req, res) => {
  res.json(listCampaigns());
});

adminRouter.post('/api/campaigns', async (req, res) => {
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: 'name é obrigatório.' });
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

// ---- pricing ----

adminRouter.put('/api/pricing/:courseId/:campaignId', async (req, res) => {
  const courseId = Number(req.params.courseId);
  const campaignId = Number(req.params.campaignId);
  if (!getCourse(courseId)) return res.status(404).json({ error: 'Curso não encontrado.' });
  if (!getCampaign(campaignId)) return res.status(404).json({ error: 'Campanha não encontrada.' });
  const pricing = await upsertPricing(courseId, campaignId, req.body || {});
  res.json(pricing);
});

adminRouter.delete('/api/pricing/:id', async (req, res) => {
  await deletePricing(Number(req.params.id));
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
