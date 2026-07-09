const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatCurrency(value) {
  if (value === null || value === undefined || value === '') return null;
  return `R$ ${currencyFormatter.format(Number(value))}`;
}

function formatDate(isoDate) {
  if (!isoDate) return null;
  const [year, month, day] = String(isoDate).split('-');
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}

function computeDiscountedPrice(priceFull, discountPct) {
  if (priceFull === null || priceFull === undefined) return null;
  if (discountPct === null || discountPct === undefined) return null;
  return Number(priceFull) * (1 - Number(discountPct) / 100);
}

/**
 * Monta o texto padrao de venda a partir de curso + campanha.
 * O curso guarda a mensalidade cheia; desconto, matricula e a nota da
 * 1a mensalidade vem da campanha e valem pra todos os cursos dela.
 * Esta funcao e a UNICA fonte do texto final mostrado ao vendedor -
 * tanto a busca simples quanto o chat de IA passam por aqui, para
 * garantir que nenhum valor seja "inventado".
 */
export function renderCourseText({ course, campaign }) {
  const lines = [];

  lines.push(`🎓 Curso de ${course.name} (${course.modality})`);
  lines.push(`🚀 Duração: ${course.duration}`);

  const priceFullFmt = formatCurrency(course.priceFull);
  const discountedPrice = computeDiscountedPrice(course.priceFull, campaign.discountPct);
  const discountedFmt = formatCurrency(discountedPrice);
  const discountPct =
    campaign.discountPct !== null && campaign.discountPct !== undefined
      ? Math.round(campaign.discountPct)
      : null;

  if (priceFullFmt && discountedFmt) {
    lines.push(`💰 Mensalidade: De: ${priceFullFmt} por apenas: ${discountedFmt} (${discountPct}% OFF)`);
  } else if (priceFullFmt) {
    lines.push(`💰 Mensalidade: ${priceFullFmt}`);
  }

  if (discountPct !== null) {
    lines.push(`🎉 Promoção especial ${campaign.name}! ${discountPct}% de desconto por tempo limitado!`);
  } else {
    lines.push(`🎉 Promoção especial ${campaign.name}!`);
  }

  if (campaign.bonusText) {
    lines.push(campaign.bonusText);
  }

  const feeFromFmt = formatCurrency(campaign.enrollmentFeeFrom);
  const feeToFmt = formatCurrency(campaign.enrollmentFeeTo);
  if (feeFromFmt && campaign.enrollmentFeeTo !== null && campaign.enrollmentFeeTo !== undefined) {
    const feeToDisplay = Number(campaign.enrollmentFeeTo) === 0 ? `${feeToFmt} (Grátis)` : feeToFmt;
    lines.push(`💳 Matrícula: De ${feeFromFmt} por ${feeToDisplay}`);
  } else if (feeToFmt) {
    lines.push(`💳 Matrícula: ${feeToFmt}`);
  }

  if (campaign.firstPaymentNote) {
    lines.push(`📅 ${campaign.firstPaymentNote}`);
  }

  if (campaign.validUntil) {
    lines.push(`🗓️ Promoção válida até: ${formatDate(campaign.validUntil)}`);
  }

  return lines.join('\n');
}
