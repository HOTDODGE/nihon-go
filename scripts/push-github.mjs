// NihonGo! GitHub 원클릭 업로드 도구
import { execSync } from 'child_process';
import readline from 'readline';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('\x1b[36m%s\x1b[0m', '========================================================');
console.log('\x1b[36m%s\x1b[0m', '      NihonGo! 깃허브(GitHub) 자동 업로드 도구');
console.log('\x1b[36m%s\x1b[0m', '========================================================\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function run(cmd) {
  try {
    execSync(cmd, { cwd: rootDir, stdio: 'inherit' });
    return true;
  } catch (err) {
    return false;
  }
}

rl.question('깃허브 저장소(Repository) 주소를 입력해 주세요:\n(예: https://github.com/아이디/nihon-go.git)\n\n> ', (repoUrl) => {
  const url = repoUrl.trim();
  if (!url) {
    console.error('\x1b[31m%s\x1b[0m', '오류: 저장소 주소가 입력되지 않았습니다.');
    rl.close();
    return;
  }

  console.log('\n[1/4] Git 저장소 초기화 및 파일 준비 중...');
  run('git init');
  run('git add .');

  console.log('\n[2/4] 커밋 생성 중...');
  run('git commit -m "Initial commit: NihonGo Japanese learning platform"');

  console.log('\n[3/4] 원격 저장소 연결 중 (main 브랜치)...');
  run('git branch -M main');
  run(`git remote remove origin`);
  run(`git remote add origin ${url}`);

  console.log('\n[4/4] 깃허브로 푸시(업로드) 전송 중...');
  const success = run(`git push -u origin main`);

  if (success) {
    console.log('\x1b[32m%s\x1b[0m', '\n========================================================');
    console.log('\x1b[32m%s\x1b[0m', ' [성공] 깃허브에 성공적으로 업로드되었습니다!');
    console.log('\x1b[37m%s\x1b[0m', ` 저장소: ${url}`);
    console.log('\x1b[32m%s\x1b[0m', '========================================================\n');
  } else {
    console.error('\x1b[31m%s\x1b[0m', '\n[안내] 깃허브 인증(로그인)이 필요하거나 권한이 부족합니다.');
    console.error('\x1b[37m%s\x1b[0m', 'Git 인증 창이 뜨면 로그인을 진행해 주세요.');
  }

  rl.close();
});
