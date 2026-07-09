import 'dotenv/config';
import { createCourse, createCampaign } from './repositories/courseRepository.js';

async function seed() {
  await createCampaign({
    name: 'Campanha de Junho',
    validUntil: '2026-06-30',
    bonusText: '🚗 Matriculando agora você concorre a 1 carro 0KM!',
    active: true,
    discountPct: 70,
    enrollmentFeeFrom: 49.9,
    enrollmentFeeTo: 0,
    firstPaymentNote: '1ª mensalidade apenas para Agosto!',
  });

  await createCourse({
    name: 'Fonoaudiologia',
    level: 'graduacao',
    modality: 'Semi-presencial',
    duration: '4 anos',
    priceFull: 859.0,
  });

  await createCourse({
    name: 'Pedagogia',
    level: 'graduacao',
    modality: 'EAD',
    duration: '4 anos',
    priceFull: 399.0,
  });

  await createCourse({
    name: 'Pós-graduação em Neuropsicopedagogia',
    level: 'pos',
    modality: 'EAD',
    duration: '18 meses',
    priceFull: 299.0,
  });

  console.log('Seed concluído: 1 campanha e 3 cursos de exemplo criados.');
}

seed().then(() => process.exit(0));
