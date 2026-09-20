// NihonGo! Android APK 자동 빌더 (Node.js 크로스 플랫폼 엔진)
import { execSync, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('\x1b[36m%s\x1b[0m', '========================================================');
console.log('\x1b[36m%s\x1b[0m', '      NihonGo! 안드로이드 APK 파일 자동 생성기');
console.log('\x1b[36m%s\x1b[0m', '========================================================\n');

function runCommand(command, cwd = rootDir) {
  try {
    execSync(command, { cwd, stdio: 'inherit', shell: true });
    return true;
  } catch (error) {
    return false;
  }
}

// 0. 필수 Capacitor 라이브러리 설치 확인
const capCliPath = path.join(rootDir, 'node_modules', '@capacitor', 'cli');
if (!fs.existsSync(capCliPath)) {
  console.log('\x1b[33m%s\x1b[0m', '[준비] 필수 안드로이드 빌드 도구(@capacitor/cli) 설치 중... (최초 1회)');
  if (!runCommand('npm install')) {
    console.error('\x1b[31m%s\x1b[0m', '[오류] 패키지 설치 실패. 네트워크 연결 상태를 확인해주세요.');
    process.exit(1);
  }
}

// 1. 최신 웹 애플리케이션 빌드
console.log('\x1b[33m%s\x1b[0m', '\n[1/4] 최신 웹 애플리케이션 빌드 중...');
if (!runCommand('npm run build')) {
  console.error('\x1b[31m%s\x1b[0m', '\n[오류] 웹 빌드 실패. TypeScript 컴파일 오류 등을 확인해주세요.');
  process.exit(1);
}

// 2. 안드로이드 플랫폼 프로젝트 확인 및 생성
const androidDir = path.join(rootDir, 'android');
if (!fs.existsSync(androidDir)) {
  console.log('\x1b[33m%s\x1b[0m', '\n[2/4] 최초 1회: 안드로이드 네이티브 프로젝트 생성 중...');
  runCommand('npx cap add android');
}

// 3. 웹 빌드 동기화
console.log('\x1b[33m%s\x1b[0m', '\n[3/4] 최신 파일 동기화 중 (Capacitor Sync)...');
runCommand('npx cap sync android');

// 4. 안드로이드 APK 컴파일 (Gradle Build)
console.log('\x1b[33m%s\x1b[0m', '\n[4/4] 안드로이드 APK 파일 컴파일 중 (Gradle Build)...');
console.log('\x1b[90m%s\x1b[0m', '      (최초 실행 시 안드로이드 라이브러리 다운로드로 1~3분 소요될 수 있습니다)\n');

const gradlewCmd = process.platform === 'win32' ? 'gradlew.bat assembleDebug' : './gradlew assembleDebug';
const buildSuccess = runCommand(gradlewCmd, androidDir);

const apkSrc = path.join(androidDir, 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
const releaseDir = path.join(rootDir, 'release');
const apkDest = path.join(releaseDir, 'NihonGo.apk');

if (buildSuccess && fs.existsSync(apkSrc)) {
  if (!fs.existsSync(releaseDir)) {
    fs.mkdirSync(releaseDir, { recursive: true });
  }
  fs.copyFileSync(apkSrc, apkDest);

  console.log('\x1b[32m%s\x1b[0m', '\n========================================================');
  console.log('\x1b[32m%s\x1b[0m', ' [성공] 스마트폰 설치용 APK 파일이 성공적으로 생성되었습니다!');
  console.log('\x1b[37m%s\x1b[0m', ` 파일 위치: ${apkDest}`);
  console.log('\x1b[32m%s\x1b[0m', '========================================================\n');

  console.log('\x1b[36m%s\x1b[0m', '완성된 폴더를 탐색기로 엽니다...');
  if (process.platform === 'win32') {
    spawnSync('explorer', [releaseDir], { detached: true });
  }
} else {
  console.log('\x1b[35m%s\x1b[0m', '\n========================================================');
  console.log('\x1b[35m%s\x1b[0m', ' [안내] CLI 컴파일 환경(JDK/Android SDK)이 준비되지 않아');
  console.log('\x1b[35m%s\x1b[0m', '       [Android Studio]를 자동으로 실행합니다.');
  console.log('\x1b[35m%s\x1b[0m', '');
  console.log('\x1b[37m%s\x1b[0m', ' Android Studio 상단 메뉴: Build > Build APK(s) 를 클릭하시면');
  console.log('\x1b[37m%s\x1b[0m', ' 스마트폰 설치용 APK 파일이 바로 생성됩니다.');
  console.log('\x1b[35m%s\x1b[0m', '========================================================\n');
  runCommand('npx cap open android');
}
