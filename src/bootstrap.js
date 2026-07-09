import { db } from './db.js';
import { createCourse, createCampaign } from './repositories/courseRepository.js';
import { createLink } from './repositories/linkRepository.js';
import { seedCampaigns, seedCourses } from './data/seedCatalog.js';
import { seedLinks } from './data/enrollmentLinks.js';

/**
 * Recarrega o catálogo base sempre que o banco estiver vazio - inclusive
 * depois de um redeploy no Render, cujo disco não é permanente no plano Free.
 * Edições feitas só pelo admin (sem atualizar seedCatalog.js) ainda se perdem
 * nesse cenário; isso é um paliativo até termos um banco persistente.
 */
export async function seedCatalogIfEmpty() {
  if (db.data.courses.length === 0 && db.data.campaigns.length === 0) {
    for (const campaign of seedCampaigns) {
      await createCampaign(campaign);
    }
    for (const course of seedCourses) {
      await createCourse(course);
    }
    console.log(`Catálogo inicial carregado: ${seedCampaigns.length} campanhas, ${seedCourses.length} cursos.`);
  }

  if (db.data.enrollmentLinks.length === 0) {
    for (const link of seedLinks) {
      await createLink(link);
    }
    console.log(`Links de matrícula carregados: ${seedLinks.length}.`);
  }
}
