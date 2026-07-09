import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import session from 'express-session';
import bcrypt from 'bcryptjs';

import { db } from './src/db.js';
import { createAdminUser } from './src/repositories/courseRepository.js';
import { seedCatalogIfEmpty } from './src/bootstrap.js';
import { apiRouter } from './src/routes/api.js';
import { adminRouter } from './src/routes/admin.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function ensureAdminSeed() {
  if (db.data.adminUsers.length > 0) return;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.warn(
      'Nenhum admin cadastrado e ADMIN_EMAIL/ADMIN_PASSWORD não definidos no .env - o painel admin ficará inacessível até você configurar isso.'
    );
    return;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await createAdminUser({ email, passwordHash });
  console.log(`Admin seedado: ${email}`);
}

await ensureAdminSeed();
await seedCatalogIfEmpty();

const app = express();
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-secret-troque-isto',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 8 * 60 * 60 * 1000 },
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use('/admin', adminRouter);

app.get('/health', (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
