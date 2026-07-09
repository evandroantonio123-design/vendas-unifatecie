import { Router } from 'express';
import { search as searchCourses, getJoined } from '../repositories/courseRepository.js';
import { listActiveLinks } from '../repositories/linkRepository.js';
import { renderCourseText } from '../services/templateRenderer.js';
import { chatWithSearch } from '../services/claudeClient.js';

export const apiRouter = Router();

// Links oficiais de matrícula (menu "Links de Matrícula" da tela do vendedor).
apiRouter.get('/links', (req, res) => {
  res.json(listActiveLinks());
});

// Busca simples e determinística - ferramenta principal do dia a dia do vendedor.
apiRouter.get('/search', (req, res) => {
  const q = typeof req.query.q === 'string' ? req.query.q : '';
  const results = searchCourses(q).map(({ course, campaign }) => ({
    courseId: course.id,
    campaignId: campaign.id,
    label: `${course.name} — ${course.modality} (${campaign.name})`,
  }));
  res.json(results);
});

apiRouter.get('/generate-text', (req, res) => {
  const courseId = Number(req.query.courseId);
  const campaignId = Number(req.query.campaignId);
  if (!courseId || !campaignId) {
    return res.status(400).json({ error: 'courseId e campaignId são obrigatórios.' });
  }
  const joined = getJoined(courseId, campaignId);
  if (!joined) return res.status(404).json({ error: 'Curso/campanha não encontrado.' });
  res.json({ text: renderCourseText(joined) });
});

// Assistente de IA (opcional) - grounded na mesma busca/renderer acima.
apiRouter.post('/chat', async (req, res) => {
  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Campo "message" é obrigatório.' });
    }
    const cleanHistory = Array.isArray(history)
      ? history
          .filter((h) => h && typeof h.content === 'string' && (h.role === 'user' || h.role === 'assistant'))
          .map((h) => ({ role: h.role, content: h.content }))
      : [];
    const { text } = await chatWithSearch(message, cleanHistory);
    res.json({ text });
  } catch (err) {
    if (err.code === 'MISSING_API_KEY') {
      return res.status(503).json({ error: err.message });
    }
    console.error('Erro no /api/chat:', err);
    res.status(500).json({ error: 'Erro ao consultar o assistente de IA.' });
  }
});
