import 'dotenv/config';
import { createCourse, createCampaign, upsertPricing } from './repositories/courseRepository.js';

async function seed() {
  const campaign = await createCampaign({
    name: 'Campanha de Junho',
    validUntil: '2026-06-30',
    bonusText: '🚗 Matriculando agora você concorre a 1 carro 0KM!',
    active: true,
  });

  const fono = await createCourse({
    name: 'Fonoaudiologia',
    level: 'graduacao',
    modality: 'Semi-presencial',
    duration: '4 anos',
  });
  await upsertPricing(fono.id, campaign.id, {
    priceFrom: 859.0,
    priceTo: 257.7,
    discountPct: 70,
    enrollmentFeeFrom: 49.9,
    enrollmentFeeTo: 0,
    firstPaymentNote: '1ª mensalidade apenas para Agosto!',
  });

  const pedagogia = await createCourse({
    name: 'Pedagogia',
    level: 'graduacao',
    modality: 'EAD',
    duration: '4 anos',
  });
  await upsertPricing(pedagogia.id, campaign.id, {
    priceFrom: 399.0,
    priceTo: 149.9,
    discountPct: 62,
    enrollmentFeeFrom: 49.9,
    enrollmentFeeTo: 0,
    firstPaymentNote: '1ª mensalidade apenas para Agosto!',
  });

  const posNeuro = await createCourse({
    name: 'Pós-graduação em Neuropsicopedagogia',
    level: 'pos',
    modality: 'EAD',
    duration: '18 meses',
  });
  await upsertPricing(posNeuro.id, campaign.id, {
    priceFrom: 299.0,
    priceTo: 119.6,
    discountPct: 60,
    enrollmentFeeFrom: 0,
    enrollmentFeeTo: 0,
  });

  console.log('Seed concluído: 1 campanha e 3 cursos de exemplo criados.');
}

seed().then(() => process.exit(0));
