import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = path.resolve(__dirname, '../src/data/conversations');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 템플릿 데이터 정의
// 레벨별 60개씩 총 300개 시나리오 정의

const generateScenarios = () => {
  console.log('Generating 300 real-life conversation scenarios across N5~N1...');
  
  // 기존 30개 시나리오 베이스 로드 또는 확장
  // N5 60개, N4 60개, N3 60개, N2 60개, N1 60개 생성
};
