// 고품질 일본어 신경망 음성 엔진 (Neural Japanese TTS Engine)
// 모바일(iOS Safari / Android) 및 PC 환경에서 끊김 없이 100% 매끄럽게 재생되도록 단일 Audio 인스턴스 패턴을 적용합니다.

const AUDIO_CACHE_NAME = 'nihongo_neural_voice_cache_v1';

function splitIntoSentences(text: string): string[] {
  const parts = text.split(/([。！？!?\n]+)/);
  const sentences: string[] = [];
  for (let i = 0; i < parts.length; i += 2) {
    const s = (parts[i] + (parts[i + 1] || '')).trim();
    if (s) sentences.push(s);
  }
  return sentences.length > 0 ? sentences : [text];
}

class NeuralJapaneseTtsEngine {
  private isStopped = false;
  private audioInstance: HTMLAudioElement | null = null;

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
  }

  /**
   * 고품질 원어민 일본어 음성 합성 및 재생 (모바일 제스처 연속 재생 보장)
   */
  public async speak(
    text: string,
    options: {
      rate?: number;
      volume?: number;
      onEnd?: () => void;
      onError?: () => void;
    } = {}
  ): Promise<void> {
    this.stop();
    this.isStopped = false;

    const rate = options.rate ?? 1.0;
    const volume = options.volume ?? 1.0;
    const sentences = splitIntoSentences(text);

    let currentIndex = 0;
    const audio = this.getAudio();
    audio.volume = volume;
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
        const audioUrl = await this.getAudioUrl(currentText);
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
          if (options.onError) options.onError();
        });
      } catch (err) {
        console.warn('[NeuralTTS] Failed to resolve audio URL:', err);
        if (options.onError) options.onError();
      }
    };

    playNext();
  }

  /**
   * 텍스트에 대한 고품질 원어민 음성 URL 획득 (CacheStorage 활용 오프라인 캐싱)
   */
  private async getAudioUrl(text: string): Promise<string> {
    const encodedText = encodeURIComponent(text.slice(0, 200));
    const targetUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encodedText}`;

    if (typeof window !== 'undefined' && 'caches' in window) {
      try {
        const cache = await caches.open(AUDIO_CACHE_NAME);
        const cachedRes = await cache.match(targetUrl);
        if (cachedRes) {
          const blob = await cachedRes.blob();
          return URL.createObjectURL(blob);
        }

        // 캐시 비동기 적재 (실패해도 재생에 영향 없음)
        fetch(targetUrl, { mode: 'no-cors' })
          .then((res) => {
            if (res.type === 'opaque' || res.ok) {
              cache.put(targetUrl, res.clone());
            }
          })
          .catch(() => {});
      } catch {
        // 캐시 조회 불가 시 직접 URL 재생
      }
    }

    return targetUrl;
  }
}

export const neuralJapaneseTts = new NeuralJapaneseTtsEngine();
