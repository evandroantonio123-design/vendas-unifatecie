import { db, nextId } from '../db.js';

function normalize(str) {
  return String(str || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

// ---- courses ----

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
    updatedAt: new Date().toISOString(),
  });
  await db.write();
  return course;
}

export async function deleteCourse(id) {
  db.data.courses = db.data.courses.filter((c) => c.id !== id);
  db.data.coursePricing = db.data.coursePricing.filter((p) => p.courseId !== id);
  await db.write();
}

// ---- campaigns ----

export function listCampaigns() {
  return [...db.data.campaigns].sort((a, b) => (b.id - a.id));
}

export function getCampaign(id) {
  return db.data.campaigns.find((c) => c.id === id) || null;
}

export async function createCampaign(input) {
  const campaign = {
    id: nextId('campaigns'),
    name: input.name,
    validUntil: input.validUntil || null,
    bonusText: input.bonusText || null,
    active: input.active !== undefined ? !!input.active : true,
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
    validUntil: input.validUntil ?? campaign.validUntil,
    bonusText: input.bonusText ?? campaign.bonusText,
    active: input.active !== undefined ? !!input.active : campaign.active,
  });
  await db.write();
  return campaign;
}

export async function deleteCampaign(id) {
  db.data.campaigns = db.data.campaigns.filter((c) => c.id !== id);
  db.data.coursePricing = db.data.coursePricing.filter((p) => p.campaignId !== id);
  await db.write();
}

// ---- pricing (course x campaign) ----

export function getPricing(courseId, campaignId) {
  return (
    db.data.coursePricing.find((p) => p.courseId === courseId && p.campaignId === campaignId) ||
    null
  );
}

export function getPricingById(id) {
  return db.data.coursePricing.find((p) => p.id === id) || null;
}

export function listPricingForCourse(courseId) {
  return db.data.coursePricing.filter((p) => p.courseId === courseId);
}

export async function upsertPricing(courseId, campaignId, input) {
  let pricing = getPricing(courseId, campaignId);
  const fields = {
    priceFrom: input.priceFrom ?? null,
    priceTo: input.priceTo ?? null,
    discountPct: input.discountPct ?? null,
    enrollmentFeeFrom: input.enrollmentFeeFrom ?? null,
    enrollmentFeeTo: input.enrollmentFeeTo ?? null,
    firstPaymentNote: input.firstPaymentNote ?? null,
    notes: input.notes ?? null,
  };
  if (pricing) {
    Object.assign(pricing, fields);
  } else {
    pricing = { id: nextId('coursePricing'), courseId, campaignId, ...fields };
    db.data.coursePricing.push(pricing);
  }
  await db.write();
  return pricing;
}

export async function deletePricing(id) {
  db.data.coursePricing = db.data.coursePricing.filter((p) => p.id !== id);
  await db.write();
}

// ---- joined lookups used by the vendor tool + chat ----

export function getJoined(courseId, campaignId) {
  const course = getCourse(courseId);
  const campaign = getCampaign(campaignId);
  const pricing = getPricing(courseId, campaignId);
  if (!course || !campaign || !pricing) return null;
  return { course, campaign, pricing };
}

/**
 * Busca cursos com preco cadastrado em campanha ativa.
 * Aceita termos parciais/informais (acento-insensitive).
 */
export function search(query, { limit = 20 } = {}) {
  const q = normalize(query).trim();
  const activeCampaignIds = new Set(db.data.campaigns.filter((c) => c.active).map((c) => c.id));

  const rows = db.data.coursePricing
    .filter((p) => activeCampaignIds.has(p.campaignId))
    .map((p) => {
      const course = getCourse(p.courseId);
      const campaign = getCampaign(p.campaignId);
      return course && campaign ? { course, campaign, pricing: p } : null;
    })
    .filter(Boolean);

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
