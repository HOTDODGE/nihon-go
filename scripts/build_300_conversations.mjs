import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputFile = path.resolve(__dirname, '../src/data/conversations.ts');

// 300개 시나리오 마스터 팩토리
import { raw30Scenarios } from './scenarios_base.mjs';
import { generateN5Scenarios } from './scenarios_n5.mjs';
import { generateN4Scenarios } from './scenarios_n4.mjs';
import { generateN3Scenarios } from './scenarios_n3.mjs';
import { generateN2Scenarios } from './scenarios_n2.mjs';
import { generateN1Scenarios } from './scenarios_n1.mjs';

console.log('Building 300 real-life conversation scenarios across N5~N1...');

const allScenarios = [
  ...raw30Scenarios,
  ...generateN5Scenarios(),
  ...generateN4Scenarios(),
  ...generateN3Scenarios(),
  ...generateN2Scenarios(),
  ...generateN1Scenarios(),
];

console.log(`Total Scenarios Collected: ${allScenarios.length}`);

// 중복 ID 방지 및 정렬
const uniqueScenarios = [];
const seenIds = new Set();
for (const s of allScenarios) {
  if (!seenIds.has(s.id)) {
    seenIds.add(s.id);
    uniqueScenarios.push(s);
  }
}

console.log(`Unique Scenarios: ${uniqueScenarios.length}`);

const fileContent = `import type { ConversationScenario } from '../types';

export const CONVERSATIONS: ConversationScenario[] = ${JSON.stringify(uniqueScenarios, null, 2)};
`;

fs.writeFileSync(outputFile, fileContent, 'utf-8');
console.log(`Successfully generated ${uniqueScenarios.length} scenarios to ${outputFile}!`);
