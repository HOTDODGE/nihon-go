// 다중 TTS 엔진 (Web Speech / 신경망 네이티브 음성 / VOICEVOX) 통합 관리 헬퍼
import { neuralJapaneseTts } from './openTtsEngine.ts';
import { synthesizeVoicevoxAudio, checkVoicevoxStatus } from './voicevox.ts';

export type TtsEngineType = 'open_tts' | 'voicevox' | 'web_speech';

export interface VoiceSettings {
  engine: TtsEngineType;
  voiceURI: string;
  rate: number;
  pitch: number;
  volume: number;
  voicevoxSpeakerId: number;
  voicevoxServerUrl: string;
  openVoiceType: 'natural_female' | 'natural_male' | 'zundamon';
}

const STORAGE_KEY = 'nihongo_tts_settings';

export const DEFAULT_SETTINGS: VoiceSettings = {
  engine: 'open_tts', // 기본값을 최고 음질의 신경망 네이티브 음성으로 지정
  voiceURI: '',
  rate: 1.0,
  pitch: 1.0,
  volume: 1.0,
  voicevoxSpeakerId: 3, // 즈다몬 노멀
  voicevoxServerUrl: 'http://127.0.0.1:50021',
  openVoiceType: 'natural_female',
};

// 현재 재생 중인 외부 오디오 인스턴스 (VOICEVOX 등)
let currentAudio: HTMLAudioElement | null = null;

export const getStoredVoiceSettings = (): VoiceSettings => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to load voice settings:', e);
  }
  return DEFAULT_SETTINGS;
};

export const saveVoiceSettings = (settings: VoiceSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save voice settings:', e);
  }
};

/**
 * 브라우저 및 시스템에서 사용 가능한 일본어 보이스 목록을 감지하고 품질순으로 정렬
 */
export const getJapaneseVoices = (): SpeechSynthesisVoice[] => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];

  const voices = window.speechSynthesis.getVoices();
  const jaVoices = voices.filter(
    (v) =>
      v.lang === 'ja-JP' ||
      v.lang.startsWith('ja') ||
      v.name.includes('Japanese') ||
      v.name.includes('Japan')
  );

  return jaVoices.sort((a, b) => {
    const score = (v: SpeechSynthesisVoice) => {
      let s = 0;
      if (v.name.includes('Natural') || v.name.includes('Online')) s += 50;
      if (v.name.includes('Google')) s += 40;
      if (v.name.includes('Microsoft')) s += 30;
      if (v.name.includes('Kyoko') || v.name.includes('Nanami') || v.name.includes('Ayumi')) s += 20;
      if (v.lang === 'ja-JP') s += 10;
      return s;
    };
    return score(b) - score(a);
  });
};

/**
 * 한자 오독을 원천 방지하고 100% 의도한 정확한 발음으로 음성 합성하기 위해
 * 한자(발음) 텍스트를 순수 발음(히라가나/가타가나)으로 변환합니다.
 */
export const extractPhoneticJapanese = (text: string): string => {
  // 1. 루비 태그 <ruby>한자<rt>발음</rt></ruby> -> 발음($1)으로 치환
  let result = text.replace(/<ruby>.*?<rt>(.*?)<\/rt><\/ruby>/g, '$1');

  // 2. HTML 기타 태그 제거
  result = result.replace(/<[^>]+>/g, '');

  // 3. 한자 바로 뒤의 괄호 발음: 한자(히라가나/가타가나) -> 발음($2)으로 치환
  result = result.replace(/([\u4E00-\u9FFF々〆〇]+)[\(（]([\u3040-\u309F\u30A0-\u30FFー]+)[\)）]/g, '$2');

  // 4. 발음 외의 부가 설명 괄호 제거
  result = result.replace(/[\(（][^\)）]*[\)）]/g, '');

  // 5. 공백 정리
  result = result.trim();

  if (!result) {
    result = text.replace(/[()（）]/g, '').trim();
  }

  return result;
};

/**
 * 모든 활성 오디오 일괄 정지
 */
export const stopAudio = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  neuralJapaneseTts.stop();

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
};

/**
 * 텍스트 음성 합성 재생 (설정된 엔진에 따라 자동 라우팅)
 */
export const playJapaneseAudio = async (
  text: string,
  customRate?: number,
  onEnd?: () => void,
  settingsOverride?: Partial<VoiceSettings>
) => {
  stopAudio();

  const cleanText = extractPhoneticJapanese(text);
  if (!cleanText) return;

  const settings = { ...getStoredVoiceSettings(), ...settingsOverride };
  const rate = customRate !== undefined ? customRate : settings.rate;

  // 1. VOICEVOX 오픈소스 엔진 모드
  if (settings.engine === 'voicevox') {
    try {
      const isAlive = await checkVoicevoxStatus(settings.voicevoxServerUrl);
      if (!isAlive) {
        console.warn('[VOICEVOX] Server not reachable, falling back to neural audio');
        playWithNeuralTts(cleanText, rate, settings, onEnd);
        return;
      }

      const audioUrl = await synthesizeVoicevoxAudio(
        cleanText,
        settings.voicevoxSpeakerId,
        rate,
        (settings.pitch - 1.0) * 0.5,
        settings.voicevoxServerUrl
      );

      const audio = new Audio(audioUrl);
      audio.volume = settings.volume;
      currentAudio = audio;

      audio.onended = () => {
        currentAudio = null;
        if (onEnd) onEnd();
      };
      audio.onerror = () => {
        currentAudio = null;
        playWithNeuralTts(cleanText, rate, settings, onEnd);
      };

      await audio.play();
      return;
    } catch (err) {
      console.warn('[VOICEVOX] Synthesis failed, falling back to neural audio:', err);
      playWithNeuralTts(cleanText, rate, settings, onEnd);
      return;
    }
  }

  // 2. 고품질 신경망 네이티브 일본어 엔진 모드 (open_tts)
  if (settings.engine === 'open_tts') {
    playWithNeuralTts(cleanText, rate, settings, onEnd);
    return;
  }

  // 3. 브라우저/시스템 내장 TTS 모드 (web_speech)
  playWithWebSpeech(cleanText, rate, settings, onEnd);
};

function playWithNeuralTts(
  cleanText: string,
  rate: number,
  settings: VoiceSettings,
  onEnd?: () => void
) {
  neuralJapaneseTts.speak(cleanText, {
    rate,
    volume: settings.volume,
    onEnd,
    onError: () => {
      // 온라인 페치 실패 시 시스템 내장 일본어 음성으로 부드럽게 폴백
      console.info('[TTS] Neural audio failed or offline, falling back to system TTS');
      playWithWebSpeech(cleanText, rate, settings, onEnd);
    },
  });
}

function playWithWebSpeech(
  cleanText: string,
  rate: number,
  settings: VoiceSettings,
  onEnd?: () => void
) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const jaVoices = getJapaneseVoices();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ja-JP';
    utterance.rate = rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;

    if (jaVoices.length > 0) {
      let targetVoice = jaVoices.find((v) => v.voiceURI === settings.voiceURI);
      if (!targetVoice) {
        targetVoice = jaVoices[0];
      }
      utterance.voice = targetVoice;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }
}
