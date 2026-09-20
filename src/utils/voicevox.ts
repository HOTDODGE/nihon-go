// VOICEVOX 오픈소스 로컬 음성 합성 엔진 클라이언트
// VOICEVOX 공식 엔진 기본 로컬 포트: 50021

export interface VoicevoxSpeakerStyle {
  id: number;
  name: string;
}

export interface VoicevoxSpeaker {
  name: string;
  speaker_uuid: string;
  styles: VoicevoxSpeakerStyle[];
  version?: string;
}

const DEFAULT_SERVER_URL = 'http://127.0.0.1:50021';
const audioCache = new Map<string, string>();

/**
 * 로컬 VOICEVOX 엔진 구동 여부 확인
 */
export async function checkVoicevoxStatus(serverUrl: string = DEFAULT_SERVER_URL): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    const res = await fetch(`${serverUrl}/version`, {
      method: 'GET',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * 기본 대표 화자 목록 (엔진 미연결 시에도 표시 가능한 프리셋)
 */
export const POPULAR_VOICEVOX_PRESETS = [
  { id: 3, name: 'ずんだもん (즈다몬)', style: 'ノーマル (표준)' },
  { id: 1, name: 'ずんだもん (즈다몬)', style: 'あまあま (달달)' },
  { id: 7, name: 'ずんだもん (즈다몬)', style: 'ツンツン (츤츤)' },
  { id: 2, name: '四国めたん (시코쿠 메탄)', style: 'ノーマル (표준)' },
  { id: 8, name: '春日部つむぎ (카스카베 츠무기)', style: 'ノーマル (표준)' },
  { id: 14, name: '冥鳴ひまり (메이메이 히마리)', style: 'ノーマル (표준)' },
  { id: 13, name: '青山龍星 (아오야마 류세이 - 남성)', style: 'ノーマル (표준)' },
  { id: 9, name: '波音リツ (나미네 리츠)', style: 'ノーマル (표준)' },
];

/**
 * VOICEVOX 서버에서 화자 목록 조회
 */
export async function getVoicevoxSpeakers(serverUrl: string = DEFAULT_SERVER_URL): Promise<VoicevoxSpeaker[]> {
  try {
    const res = await fetch(`${serverUrl}/speakers`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[VOICEVOX] Failed to fetch speakers:', err);
    return [];
  }
}

/**
 * VOICEVOX로 텍스트 음성 합성 후 재생 가능한 오디오 URL 반환
 */
export async function synthesizeVoicevoxAudio(
  text: string,
  speakerId: number = 3,
  speedScale: number = 1.0,
  pitchScale: number = 0.0,
  serverUrl: string = DEFAULT_SERVER_URL
): Promise<string> {
  const cacheKey = `${text}_${speakerId}_${speedScale}_${pitchScale}`;
  if (audioCache.has(cacheKey)) {
    return audioCache.get(cacheKey)!;
  }

  // 1단계: Audio Query 생성
  const queryUrl = `${serverUrl}/audio_query?text=${encodeURIComponent(text)}&speaker=${speakerId}`;
  const queryRes = await fetch(queryUrl, { method: 'POST' });
  if (!queryRes.ok) {
    throw new Error(`AudioQuery Failed: ${queryRes.statusText}`);
  }

  const audioQuery = await queryRes.json();
  audioQuery.speedScale = speedScale;
  audioQuery.pitchScale = pitchScale;

  // 2단계: 음성 합성 바이너리 획득
  const synthUrl = `${serverUrl}/synthesis?speaker=${speakerId}`;
  const synthRes = await fetch(synthUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(audioQuery),
  });

  if (!synthRes.ok) {
    throw new Error(`Synthesis Failed: ${synthRes.statusText}`);
  }

  const audioBlob = await synthRes.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  audioCache.set(cacheKey, audioUrl);
  return audioUrl;
}
