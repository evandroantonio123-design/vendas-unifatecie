import { JSONFilePreset } from 'lowdb/node';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'data');
const dataFile = path.join(dataDir, 'app.json');

fs.mkdirSync(dataDir, { recursive: true });

const defaultData = {
  courses: [],
  campaigns: [],
  adminUsers: [],
  enrollmentLinks: [],
};

export const db = await JSONFilePreset(dataFile, defaultData);

export function nextId(collection) {
  const items = db.data[collection];
  if (!items || items.length === 0) return 1;
  return Math.max(...items.map((i) => i.id)) + 1;
}
