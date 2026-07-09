import { db, nextId } from '../db.js';

function normalize(str) {
  return String(str || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

// ---- courses ----
// O curso guarda só a mensalidade cheia (priceFull). Desconto, matrícula e
// texto da 1ª mensalidade vivem na campanha e se aplicam a todos os cursos dela.

export function listCourses() {
  return [...db.data.courses].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}

export function getCourse(id) {
  return db.data.courses.find((c) => c.id === id) || null;
}

export async function createCourse(input) {
  const now = new Date().toISOString();
  const course = {
    id: nextId('courses'),
    name: input.name,
    level: input.level,
    modality: input.modality,
    duration: input.duration,
    priceFull: input.priceFull ?? null,
    createdAt: now,
    updatedAt: now,
  };
  db.data.courses.push(course);
  await db.write();
  return course;
}

export async function updateCourse(id, input) {
  const course = getCourse(id);
  if (!course) return null;
  Object.assign(course, {
    name: input.name ?? course.name,
    level: input.level ?? course.level,
    modality: input.modality ?? course.modality,
    duration: input.duration ?? course.duration,
    priceFull: input.priceFull !== undefined ? input.priceFull : course.priceFull,
    updatedAt: new Date().toISOString(),
  });
  await db.write();
  return course;
}

export async function deleteCourse(id) {
  db.data.courses = db.data.courses.filter((c) => c.id !== id);
  await db.write();
}

// ---- campaigns ----
// Desconto, matrícula e nota da 1ª mensalidade ficam aqui e valem para
// todos os cursos automaticamente enquanto a campanha estiver ativa.

export function listCampaigns() {
  return [...db.data.campaigns].sort((a, b) => b.id - a.id);
}

export function getCampaign(id) {
  return db.data.campaigns.find((c) => c.id === id) || null;
}

export async function createCampaign(input) {
  const campaign = {
    id: nextId('campaigns'),
    name: input.name,
    level: input.level,
    validUntil: input.validUntil || null,
    bonusText: input.bonusText || null,
    active: input.active !== undefined ? !!input.active : true,
    discountPct: input.discountPct ?? null,
    enrollmentFeeFrom: input.enrollmentFeeFrom ?? null,
    enrollmentFeeTo: input.enrollmentFeeTo ?? null,
    firstPaymentNote: input.firstPaymentNote || null,
    installments: input.installments ?? null,
  };
  db.data.campaigns.push(campaign);
  await db.write();
  return campaign;
}

export async function updateCampaign(id, input) {
  const campaign = getCampaign(id);
  if (!campaign) return null;
  Object.assign(campaign, {
    name: input.name ?? campaign.name,
    level: input.level ?? campaign.level,
    validUntil: input.validUntil ?? campaign.validUntil,
    bonusText: input.bonusText ?? campaign.bonusText,
    active: input.active !== undefined ? !!input.active : campaign.active,
    discountPct: input.discountPct !== undefined ? input.discountPct : campaign.discountPct,
    enrollmentFeeFrom:
      input.enrollmentFeeFrom !== undefined ? input.enrollmentFeeFrom : campaign.enrollmentFeeFrom,
    enrollmentFeeTo: input.enrollmentFeeTo !== undefined ? input.enrollmentFeeTo : campaign.enrollmentFeeTo,
    firstPaymentNote: input.firstPaymentNote !== undefined ? input.firstPaymentNote : campaign.firstPaymentNote,
    installments: input.installments !== undefined ? input.installments : campaign.installments,
  });
  await db.write();
  return campaign;
}

export async function deleteCampaign(id) {
  db.data.campaigns = db.data.campaigns.filter((c) => c.id !== id);
  await db.write();
}

// ---- joined lookups usados pela busca simples + chat ----

export function getJoined(courseId, campaignId) {
  const course = getCourse(courseId);
  const campaign = getCampaign(campaignId);
  if (!course || !campaign) return null;
  return { course, campaign };
}

/**
 * Busca cursos em campanhas ativas. Todo curso com mensalidade cheia
 * cadastrada aparece automaticamente em toda campanha ativa do MESMO NÍVEL
 * (graduação só casa com campanha de graduação, pós só com campanha de pós).
 * Aceita termos parciais/informais (acento-insensitive).
 */
export function search(query, { limit = 20 } = {}) {
  const q = normalize(query).trim();
  const activeCampaigns = db.data.campaigns.filter((c) => c.active);
  const courses = db.data.courses.filter((c) => c.priceFull !== null && c.priceFull !== undefined);

  const rows = [];
  for (const campaign of activeCampaigns) {
    for (const course of courses) {
      if (course.level !== campaign.level) continue;
      rows.push({ course, campaign });
    }
  }

  if (!q) return rows.slice(0, limit);

  const matches = rows.filter((r) =>
    normalize(`${r.course.name} ${r.course.modality} ${r.course.level} ${r.campaign.name}`).includes(q)
  );

  matches.sort((a, b) => {
    const an = normalize(a.course.name);
    const bn = normalize(b.course.name);
    const aStarts = an.startsWith(q) ? 0 : 1;
    const bStarts = bn.startsWith(q) ? 0 : 1;
    if (aStarts !== bStarts) return aStarts - bStarts;
    return an.localeCompare(bn, 'pt-BR');
  });

  return matches.slice(0, limit);
}

// ---- admin users ----

export function findAdminByEmail(email) {
  return db.data.adminUsers.find((u) => u.email.toLowerCase() === String(email).toLowerCase()) || null;
}

export async function createAdminUser({ email, passwordHash }) {
  const user = { id: nextId('adminUsers'), email, passwordHash };
  db.data.adminUsers.push(user);
  await db.write();
  return user;
}
