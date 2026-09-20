// NihonGo! PC 데스크톱 앱 런처 (로컬 정적 서버 + 전용 데스크톱 앱 창)
import http from 'http';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('\x1b[36m%s\x1b[0m', '========================================================');
console.log('\x1b[36m%s\x1b[0m', '      NihonGo! PC 데스크톱 애플리케이션');
console.log('\x1b[36m%s\x1b[0m', '========================================================\n');

function run(cmd, env = process.env) {
  return execSync(cmd, { cwd: rootDir, stdio: 'inherit', shell: true, env });
}

// 0. PWA 필수 표준 PNG 아이콘 동기화
const iconSrc = path.join(rootDir, 'android', 'app', 'src', 'main', 'res', 'mipmap-xxxhdpi', 'ic_launcher.png');
const icon192 = path.join(rootDir, 'public', 'pwa-192.png');
const icon512 = path.join(rootDir, 'public', 'pwa-512.png');
if (fs.existsSync(iconSrc)) {
  if (!fs.existsSync(icon192)) fs.copyFileSync(iconSrc, icon192);
  if (!fs.existsSync(icon512)) fs.copyFileSync(iconSrc, icon512);
}

// 1. 최신 웹 에셋 빌드
console.log('\x1b[33m%s\x1b[0m', '[1/2] 최신 웹 애플리케이션 빌드 중...');
try {
  run('npm run build');
} catch (e) {
  console.error('\x1b[31m%s\x1b[0m', '[오류] 웹 빌드 실패. TypeScript 컴파일 상태를 확인해주세요.');
  process.exit(1);
}

// 2. MIME 매핑 및 로컬 고속 서버 생성 (정확한 MIME 타입 및 캐시 완전 방지)
const mimeMap = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.wasm': 'application/wasm',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
};

function startServer(port = 5174) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let reqPath = req.url.split('?')[0];
      if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

      let filePath = path.join(distDir, reqPath);
      const ext = path.extname(reqPath).toLowerCase();

      // SPA 라우팅 규칙: 확장자가 없는 경로(/conversation 등)이거나 .html인 경우에만 index.html로 폴백
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        if (!ext || ext === '.html') {
          filePath = path.join(distDir, 'index.html');
        } else {
          // JS, CSS, 이미지 등은 404를 명확히 반환하여 HTML 오인식(MIME 타입 충돌) 원천 방지
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('404 Not Found');
        }
      }

      const fileExt = path.extname(filePath).toLowerCase();
      const contentType = mimeMap[fileExt] || 'application/octet-stream';

      try {
        const data = fs.readFileSync(filePath);
        res.writeHead(200, {
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
        });
        res.end(data);
      } catch (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
      }
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(startServer(port + 1));
      } else {
        reject(err);
      }
    });

    server.listen(port, '127.0.0.1', () => {
      resolve({ server, port });
    });
  });
}

console.log('\x1b[33m%s\x1b[0m', '\n[2/2] NihonGo! 데스크톱 창을 실행합니다...');

const { server, port } = await startServer(5174);
const appUrl = `http://127.0.0.1:${port}/`;

// 3. 독립 데스크톱 App 모드로 실행
let launched = false;
try {
  // Edge App Mode (Chromium 기반 독립 창)
  execSync(`start msedge --app="${appUrl}" --window-size=1240,840`, { shell: true });
  launched = true;
} catch (e) {
  // Chrome App Mode
  try {
    execSync(`start chrome --app="${appUrl}" --window-size=1240,840`, { shell: true });
    launched = true;
  } catch (err) {
    // 기본 브라우저
    execSync(`start "" "${appUrl}"`, { shell: true });
    launched = true;
  }
}

console.log('\x1b[32m%s\x1b[0m', '\n========================================================');
console.log('\x1b[32m%s\x1b[0m', ' [성공] NihonGo! 독립 데스크톱 창이 실행되었습니다!');
console.log('\x1b[37m%s\x1b[0m', ` 접속 주소: ${appUrl}`);
console.log('\x1b[90m%s\x1b[0m', ' (앱을 이용하시는 동안 이 콘솔 창을 열어두세요)');
console.log('\x1b[32m%s\x1b[0m', '========================================================\n');

// Keep server alive
process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});
