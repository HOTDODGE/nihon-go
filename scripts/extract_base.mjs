import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath = path.resolve(__dirname, '../src/data/conversations.ts');
const destPath = path.resolve(__dirname, './scenarios_base.mjs');

const content = fs.readFileSync(srcPath, 'utf-8');
const startIdx = content.indexOf('[');
const endIdx = content.lastIndexOf(']');

if (startIdx !== -1 && endIdx !== -1) {
  const arrayCode = content.substring(startIdx, endIdx + 1);
  fs.writeFileSync(destPath, `export const raw30Scenarios = ${arrayCode};\n`, 'utf-8');
  console.log('Successfully extracted base scenarios!');
} else {
  console.error('Could not find array brackets');
}
