import { db } from './db.js';
import { createCourse, createCampaign } from './repositories/courseRepository.js';
import { seedCampaign, seedCourses } from './data/seedCatalog.js';

/**
 * Recarrega o catálogo base sempre que o banco estiver vazio - inclusive
 * depois de um redeploy no Render, cujo disco não é permanente no plano Free.
 * Edições feitas só pelo admin (sem atualizar seedCatalog.js) ainda se perdem
 * nesse cenário; isso é um paliativo até termos um banco persistente.
 */
export async function seedCatalogIfEmpty() {
  if (db.data.courses.length > 0 || db.data.campaigns.length > 0) return;
  await createCampaign(seedCampaign);
  for (const course of seedCourses) {
    await createCourse(course);
  }
  console.log(`Catálogo inicial carregado: ${seedCourses.length} cursos.`);
}
