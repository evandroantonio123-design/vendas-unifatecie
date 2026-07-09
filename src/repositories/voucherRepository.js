import { db, nextId } from '../db.js';

// ---- vouchers de isenção de matrícula ----
// Códigos do mês que o vendedor usa para isentar a taxa de matrícula.
// Mostrados sempre visíveis (sem precisar clicar) na tela do vendedor.

export function listVouchers() {
  return [...db.data.vouchers].sort((a, b) => a.order - b.order);
}

export function listActiveVouchers() {
  return listVouchers().filter((v) => v.active);
}

export function getVoucher(id) {
  return db.data.vouchers.find((v) => v.id === id) || null;
}

export async function createVoucher(input) {
  const voucher = {
    id: nextId('vouchers'),
    name: input.name,
    code: input.code,
    active: input.active !== undefined ? !!input.active : true,
    order: input.order ?? db.data.vouchers.length,
  };
  db.data.vouchers.push(voucher);
  await db.write();
  return voucher;
}

export async function updateVoucher(id, input) {
  const voucher = getVoucher(id);
  if (!voucher) return null;
  Object.assign(voucher, {
    name: input.name ?? voucher.name,
    code: input.code ?? voucher.code,
    active: input.active !== undefined ? !!input.active : voucher.active,
    order: input.order !== undefined ? input.order : voucher.order,
  });
  await db.write();
  return voucher;
}

export async function deleteVoucher(id) {
  db.data.vouchers = db.data.vouchers.filter((v) => v.id !== id);
  await db.write();
}
