import { db, nextId } from '../db.js';

// ---- links de matrícula ----
// Lista curta de links oficiais (vestibular, pós, 2ª graduação, etc.)
// que o vendedor acessa rápido pelo menu "Links de Matrícula" do site.

export function listLinks() {
  return [...db.data.enrollmentLinks].sort((a, b) => a.order - b.order);
}

export function listActiveLinks() {
  return listLinks().filter((l) => l.active);
}

export function getLink(id) {
  return db.data.enrollmentLinks.find((l) => l.id === id) || null;
}

export async function createLink(input) {
  const link = {
    id: nextId('enrollmentLinks'),
    name: input.name,
    url: input.url,
    active: input.active !== undefined ? !!input.active : true,
    order: input.order ?? db.data.enrollmentLinks.length,
  };
  db.data.enrollmentLinks.push(link);
  await db.write();
  return link;
}

export async function updateLink(id, input) {
  const link = getLink(id);
  if (!link) return null;
  Object.assign(link, {
    name: input.name ?? link.name,
    url: input.url ?? link.url,
    active: input.active !== undefined ? !!input.active : link.active,
    order: input.order !== undefined ? input.order : link.order,
  });
  await db.write();
  return link;
}

export async function deleteLink(id) {
  db.data.enrollmentLinks = db.data.enrollmentLinks.filter((l) => l.id !== id);
  await db.write();
}
