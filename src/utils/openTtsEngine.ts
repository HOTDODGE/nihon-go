// 고품질 원어민 일본어 신경망 AI 음성 엔진 (Neural Japanese TTS Engine)
// GitHub Pages / 웹 호스팅 환경에서 403 차단 없이 100% 동작하는 클라우드 신경망 모델을 탑재합니다.
// 모바일 및 PC 브라우저의 CacheStorage를 활용하여 한 번 재생된 발음은 로컬에 영구 보관됩니다.

const AUDIO_CACHE_NAME = 'nihongo_neural_voice_cache_v2';

// VOICEVOX 공식 표준 스피커 매핑
export const NEURAL_SPEAKERS = {
  natural_female: 2, // 四国めたん (자연스러운 여성 원어민 표준어)
  natural_male: 13,  // 青山龍星 (차분하고 신뢰감 있는 남성 원어민)
  zundamon: 3,       // ずんだもん (발랄한 캐릭터 보이스)
} as const;

export type NeuralVoiceType = keyof typeof NEURAL_SPEAKERS;

function splitIntoSentences(text: string): string[] {
  const parts = text.split(/([。！？!?\n]+)/);
  const sentences: string[] = [];
  for (let i = 0; i < parts.length; i += 2) {
    const s = (parts[i] + (parts[i + 1] || '')).trim();
    if (s) sentences.push(s);
  }
  return sentences.length > 0 ? sentences : [text];
}

export interface NeuralTtsOptions {
  rate?: number;
  volume?: number;
  voiceType?: NeuralVoiceType;
  onEnd?: () => void;
  onError?: (err?: any) => void;
}

class NeuralJapaneseTtsEngine {
  private isStopped = false;
  private audioInstance: HTMLAudioElement | null = null;
  private currentBlobUrl: string | null = null;

  private getAudio(): HTMLAudioElement {
    if (!this.audioInstance) {
      this.audioInstance = new Audio();
      this.audioInstance.preload = 'auto';
    }
    return this.audioInstance;
  }

  public stop() {
    this.isStopped = true;
    if (this.audioInstance) {
      this.audioInstance.pause();
      this.audioInstance.currentTime = 0;
      this.audioInstance.onended = null;
      this.audioInstance.onerror = null;
    }
    if (this.currentBlobUrl) {
      URL.revokeObjectURL(this.currentBlobUrl);
      this.currentBlobUrl = null;
    }
  }

  /**
   * 고품질 원어민 일본어 AI 음성 재생
   */
  public async speak(text: string, options: NeuralTtsOptions = {}): Promise<void> {
    this.stop();
    this.isStopped = false;

    const rate = options.rate ?? 1.0;
    const volume = options.volume ?? 1.0;
    const voiceType = options.voiceType ?? 'natural_female';
    const speakerId = NEURAL_SPEAKERS[voiceType] || 2;
    const sentences = splitIntoSentences(text);

    let currentIndex = 0;
    const audio = this.getAudio();
    audio.volume = Math.max(0, Math.min(1, volume));
    audio.playbackRate = Math.max(0.5, Math.min(2.0, rate));

    const playNext = async () => {
      if (this.isStopped || currentIndex >= sentences.length) {
        if (!this.isStopped && options.onEnd) {
          options.onEnd();
        }
        return;
      }

      const currentText = sentences[currentIndex];
      currentIndex++;

      try {
        const audioUrl = await this.getAudioUrl(currentText, speakerId);
        if (this.isStopped) return;

        audio.src = audioUrl;
        audio.onended = () => {
          playNext();
        };
        audio.onerror = () => {
          console.warn('[NeuralTTS] Audio error, skipping to next sentence');
          playNext();
        };

        // 모바일 브라우저의 프로미스 거절(NotAllowedError) 방어
        await audio.play().catch((err) => {
          console.warn('[NeuralTTS] Play interrupted or blocked:', err);
          if (options.onError) options.onError(err);
        });
      } catch (err) {
        console.warn('[NeuralTTS] Failed to resolve neural audio URL:', err);
        if (options.onError) options.onError(err);
      }
    };

    playNext();
  }

  /**
   * 텍스트에 대한 고품질 원어민 음성 URL 획득 (CacheStorage 활용 오프라인 캐싱)
   */
  private async getAudioUrl(text: string, speakerId: number): Promise<string> {
    const cleanText = text.trim();
    if (!cleanText) throw new Error('Empty text');

    // 캐시 키 생성
    const cacheKey = `https://nihongo.audio/tts?speaker=${speakerId}&q=${encodeURIComponent(cleanText)}`;

    // 1. 브라우저 로컬 CacheStorage 확인
    if (typeof window !== 'undefined' && 'caches' in window) {
      try {
        const cache = await caches.open(AUDIO_CACHE_NAME);
        const cachedRes = await cache.match(cacheKey);
        if (cachedRes) {
          const blob = await cachedRes.blob();
          this.currentBlobUrl = URL.createObjectURL(blob);
          return this.currentBlobUrl;
        }
      } catch {
        // 캐시 조회 실패 시 네트워크 시도로 진행
      }
    }

    // 2. 클라우드 신경망 음성 API 호출 (GitHub Pages 등 모든 호스팅 환경 지원)
    const apiUrl = `https://api.tts.quest/v3/voicevox/synthesis?text=${encodeURIComponent(cleanText)}&speaker=${speakerId}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8초 타임아웃

    try {
      const response = await fetch(apiUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const downloadUrl = data.mp3DownloadUrl || data.mp3StreamingUrl || data.wavDownloadUrl;

      if (!downloadUrl) {
        throw new Error('No audio URL found in response');
      }

      // 오디오 바이너리 다운로드 및 브라우저 로컬 캐시에 저장
      const audioFetch = await fetch(downloadUrl);
      const audioBlob = await audioFetch.blob();

      if (typeof window !== 'undefined' && 'caches' in window) {
        try {
          const cache = await caches.open(AUDIO_CACHE_NAME);
          cache.put(
            cacheKey,
            new Response(audioBlob, {
              headers: { 'Content-Type': 'audio/mp3', 'Cache-Control': 'max-age=31536000' },
            })
          );
        } catch {
          // 캐시 저장 실패해도 재생은 진행
        }
      }

      this.currentBlobUrl = URL.createObjectURL(audioBlob);
      return this.currentBlobUrl;
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  }
}

export const neuralJapaneseTts = new NeuralJapaneseTtsEngine();
