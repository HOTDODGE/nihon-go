// Piper 일본어 경량 AI 모델 (VITS2 ONNX) 브라우저/앱 로컬 캐시 관리자
// 모델: ayousanz/piper-plus-tsukuyomi-chan (츠쿠요미짱 일본어 신경망 모델, ~38MB)

const MODEL_CONFIG_URL = 'https://huggingface.co/ayousanz/piper-plus-tsukuyomi-chan/raw/main/config.json';
const MODEL_BIN_URL = 'https://huggingface.co/ayousanz/piper-plus-tsukuyomi-chan/resolve/main/tsukuyomi-chan-6lang-fp16.onnx';

const DB_NAME = 'nihongo_ai_models';
const STORE_NAME = 'onnx_weights';
const MODEL_KEY = 'tsukuyomi_chan_onnx';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const req = indexedDB.open(DB_NAME, 2);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/**
 * 모델 가중치(.onnx)가 로컬에 이미 저장되어 있는지 확인
 */
export async function checkPiperModelLoaded(): Promise<{ exists: boolean; source: 'indexeddb' | 'local_file' | 'none'; sizeMB?: number }> {
  try {
    // 1. IndexedDB 확인
    const db = await openDB();
    const hasData = await new Promise<boolean>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(MODEL_KEY);
      req.onsuccess = () => {
        const val = req.result;
        resolve(Boolean(val && val.byteLength > 1000000));
      };
      req.onerror = () => resolve(false);
    });

    if (hasData) {
      return { exists: true, source: 'indexeddb', sizeMB: 38.5 };
    }

    // 2. public/models 정적 파일 확인
    const res = await fetch('/models/tsukuyomi-chan.onnx', { method: 'HEAD' });
    if (res.ok) {
      const len = res.headers.get('content-length');
      const mb = len ? Math.round(parseInt(len, 10) / (1024 * 1024)) : 38.5;
      return { exists: true, source: 'local_file', sizeMB: mb };
    }
  } catch {
    // Fail silently
  }
  return { exists: false, source: 'none' };
}

/**
 * 원클릭으로 일본어 경량 AI 모델(.onnx)을 다운로드하여 로컬에 영구 저장
 */
export async function downloadPiperModelToCache(
  onProgress?: (percent: number, loadedMB: number, totalMB: number) => void
): Promise<boolean> {
  try {
    const response = await fetch(MODEL_BIN_URL, { redirect: 'follow' });
    if (!response.ok) {
      throw new Error(`다운로드 실패: HTTP ${response.status}`);
    }

    const contentLength = response.headers.get('content-length');
    const totalBytes = contentLength ? parseInt(contentLength, 10) : 40300000;
    const totalMB = Math.round((totalBytes / (1024 * 1024)) * 10) / 10;

    const reader = response.body?.getReader();
    if (!reader) {
      const buffer = await response.arrayBuffer();
      await saveModelToDB(buffer);
      if (onProgress) onProgress(100, totalMB, totalMB);
      return true;
    }

    const chunks: Uint8Array[] = [];
    let receivedBytes = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        chunks.push(value);
        receivedBytes += value.length;
        const percent = Math.min(100, Math.round((receivedBytes / totalBytes) * 100));
        const loadedMB = Math.round((receivedBytes / (1024 * 1024)) * 10) / 10;
        if (onProgress) onProgress(percent, loadedMB, totalMB);
      }
    }

    // Uint8Array 병합
    const mergedArray = new Uint8Array(receivedBytes);
    let offset = 0;
    for (const chunk of chunks) {
      mergedArray.set(chunk, offset);
      offset += chunk.length;
    }

    await saveModelToDB(mergedArray.buffer);
    return true;
  } catch (err) {
    console.error('[PiperModel] Download error:', err);
    throw err;
  }
}

async function saveModelToDB(buffer: ArrayBuffer): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const req = tx.objectStore(STORE_NAME).put(buffer, MODEL_KEY);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

/**
 * 저장된 로컬 모델 삭제
 */
export async function deletePiperModelCache(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const req = tx.objectStore(STORE_NAME).delete(MODEL_KEY);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

/**
 * Piper 모델 정보 및 다운로드 링크 메타데이터
 */
export const PIPER_MODEL_METADATA = {
  name: 'tsukuyomi-chan-vits2',
  architecture: 'MB-iSTFT-VITS2 (신경망 음향 모델)',
  voiceName: 'つくよみちゃん (츠쿠요미짱 - 일본어)',
  fileSize: '약 38.5 MB',
  source: 'Hugging Face (ayousanz/piper-plus-tsukuyomi-chan)',
  modelBinUrl: MODEL_BIN_URL,
  modelConfigUrl: MODEL_CONFIG_URL,
};
