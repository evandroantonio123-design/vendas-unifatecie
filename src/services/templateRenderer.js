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

function computeDiscountPct(priceFrom, priceTo, storedPct) {
  if (storedPct !== null && storedPct !== undefined && storedPct !== '') return Math.round(storedPct);
  if (!priceFrom || priceTo === null || priceTo === undefined) return null;
  const pct = 100 - (Number(priceTo) / Number(priceFrom)) * 100;
  return Math.round(pct);
}

/**
 * Monta o texto padrao de venda a partir de curso + campanha + preco.
 * Esta funcao e a UNICA fonte do texto final mostrado ao vendedor -
 * tanto a busca simples quanto o chat de IA passam por aqui, para
 * garantir que nenhum valor seja "inventado".
 */
export function renderCourseText({ course, campaign, pricing }) {
  const lines = [];

  lines.push(`🎓 Curso de ${course.name} (${course.modality})`);
  lines.push(`🚀 Duração: ${course.duration}`);

  const priceFromFmt = formatCurrency(pricing.priceFrom);
  const priceToFmt = formatCurrency(pricing.priceTo);
  const discountPct = computeDiscountPct(pricing.priceFrom, pricing.priceTo, pricing.discountPct);

  if (priceFromFmt && priceToFmt) {
    const discountSuffix = discountPct !== null ? ` (${discountPct}% OFF)` : '';
    lines.push(`💰 Mensalidade: De: ${priceFromFmt} por apenas: ${priceToFmt}${discountSuffix}`);
  } else if (priceToFmt) {
    lines.push(`💰 Mensalidade: ${priceToFmt}`);
  }

  if (discountPct !== null) {
    lines.push(`🎉 Promoção especial ${campaign.name}! ${discountPct}% de desconto por tempo limitado!`);
  } else {
    lines.push(`🎉 Promoção especial ${campaign.name}!`);
  }

  if (campaign.bonusText) {
    lines.push(campaign.bonusText);
  }

  const feeFromFmt = formatCurrency(pricing.enrollmentFeeFrom);
  const feeToFmt = formatCurrency(pricing.enrollmentFeeTo);
  if (feeFromFmt && pricing.enrollmentFeeTo !== null && pricing.enrollmentFeeTo !== undefined) {
    const feeToDisplay =
      Number(pricing.enrollmentFeeTo) === 0 ? `${feeToFmt} (Grátis)` : feeToFmt;
    lines.push(`💳 Matrícula: De ${feeFromFmt} por ${feeToDisplay}`);
  } else if (feeToFmt) {
    lines.push(`💳 Matrícula: ${feeToFmt}`);
  }

  if (pricing.firstPaymentNote) {
    lines.push(`📅 ${pricing.firstPaymentNote}`);
  }

  if (campaign.validUntil) {
    lines.push(`🗓️ Promoção válida até: ${formatDate(campaign.validUntil)}`);
  }

  if (pricing.notes) {
    lines.push(pricing.notes);
  }

  return lines.join('\n');
}
