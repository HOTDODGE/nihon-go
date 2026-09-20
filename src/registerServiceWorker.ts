// Service Worker Registration for PWA (PC 로컬 환경에서는 안전하게 비활성화 및 기존 캐시 정리)
export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

  const hostname = window.location.hostname;
  const isLocalPc = hostname === 'localhost' || hostname === '127.0.0.1';

  if (isLocalPc) {
    // PC 데스크톱 실행 시 이전 서비스 워커의 불일치 캐시로 인한 빈 화면을 원천 방지하기 위해 등록 해제
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister().then(() => {
          console.log('[PWA] Unregistered local PC service worker to ensure fresh loading');
        });
      }
    }).catch(() => {});
    return;
  }

  // 모바일 및 외부 접속 환경에서만 PWA 서비스 워커 등록
  if (window.location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./sw.js')
        .then((registration) => {
          console.log('[PWA] Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.warn('[PWA] Service Worker registration failed:', error);
        });
    });
  }
}
