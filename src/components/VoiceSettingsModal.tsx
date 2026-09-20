import React, { useState, useEffect } from 'react';
import { Volume2, X, Play, RotateCcw, Check, Sparkles, Cpu, Radio, ExternalLink, CheckCircle2 } from 'lucide-react';
import {
  getJapaneseVoices,
  getStoredVoiceSettings,
  saveVoiceSettings,
  playJapaneseAudio,
  stopAudio,
  DEFAULT_SETTINGS,
} from '../utils/speech.ts';
import type { VoiceSettings, TtsEngineType } from '../utils/speech.ts';
import { checkVoicevoxStatus, POPULAR_VOICEVOX_PRESETS } from '../utils/voicevox.ts';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({ isOpen, onClose }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [settings, setSettings] = useState<VoiceSettings>(getStoredVoiceSettings);
  const [isPlayingTest, setIsPlayingTest] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [isVoicevoxOnline, setIsVoicevoxOnline] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // 브라우저 보이스 목록 업데이트
    const updateVoices = () => {
      const vList = getJapaneseVoices();
      setVoices(vList);
      if (vList.length > 0 && !settings.voiceURI) {
        setSettings((prev) => ({ ...prev, voiceURI: vList[0].voiceURI }));
      }
    };

    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    // VOICEVOX 엔진 상태 비동기 확인
    checkVoicevoxStatus(settings.voicevoxServerUrl).then((online) => {
      setIsVoicevoxOnline(online);
    });
  }, [isOpen, settings.voicevoxServerUrl]);

  if (!isOpen) return null;

  const handleTestPlay = () => {
    if (isPlayingTest) {
      stopAudio();
      setIsPlayingTest(false);
      return;
    }

    setIsPlayingTest(true);
    const testPhrase = 'こんにちは！NihonGoで楽しく日本語の会話と読解をマスターしましょう！';
    playJapaneseAudio(
      testPhrase,
      settings.rate,
      () => setIsPlayingTest(false),
      settings
    );
  };

  const handleSave = () => {
    saveVoiceSettings(settings);
    setSavedFeedback(true);
    setTimeout(() => {
      setSavedFeedback(false);
      onClose();
    }, 600);
  };

  const handleReset = () => {
    const defaultVal = {
      ...DEFAULT_SETTINGS,
      voiceURI: voices[0]?.voiceURI || '',
    };
    setSettings(defaultVal);
    saveVoiceSettings(defaultVal);
  };

  return (
    <div
      className="nihon-modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        className="glass-card nihon-modal-card"
        style={{
          width: '100%',
          maxWidth: 550,
          background: 'rgba(15, 23, 42, 0.98)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          borderRadius: 18,
          padding: 24,
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.15)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #38bdf8, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}
            >
              <Volume2 size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc' }}>
                일본어 TTS 음성 랩 (Voice Lab)
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                AI 신경망 경량 모델 및 오픈소스 음성 엔진 관리
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: 6,
              borderRadius: 6,
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Engine Selection Tabs */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 8 }}>
            🎙️ 음성 합성 엔진 선택
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { id: 'open_tts' as TtsEngineType, label: '원어민 AI 음성', icon: <Sparkles size={14} />, desc: '자연스러운 사람 목소리' },
              { id: 'voicevox' as TtsEngineType, label: 'VOICEVOX', icon: <Cpu size={14} />, desc: '즈다몬 캐릭터 음성' },
              { id: 'web_speech' as TtsEngineType, label: '시스템 내장', icon: <Radio size={14} />, desc: 'OS 언어팩 보이스' },
            ].map((tab) => {
              const active = settings.engine === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSettings((s) => ({ ...s, engine: tab.id }))}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px 8px',
                    borderRadius: 10,
                    border: active ? '1.5px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                    background: active ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    color: active ? '#ffffff' : '#94a3b8',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700, fontSize: '0.82rem' }}>
                    {tab.icon} {tab.label}
                  </div>
                  <span style={{ fontSize: '0.68rem', color: active ? '#7dd3fc' : '#64748b', marginTop: 2 }}>
                    {tab.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. 원어민 AI 신경망 음성 탭 */}
        {settings.engine === 'open_tts' && (
          <div style={{ marginBottom: 20, background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: 16, borderRadius: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>
                  ✨ 원어민 네이티브 표준 신경망 음성
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '3px 8px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 700 }}>
                <CheckCircle2 size={13} />
                <span>기계음 없는 자연어 음성</span>
              </div>
            </div>

            <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: 12 }}>
              컴퓨터 기계음이 아닌 <strong>실제 원어민 발음의 선명한 사람 목소리</strong>로 일본어 회화 및 독해 지문을 읽어줍니다. 재생된 음성은 브라우저 로컬 캐시(CacheStorage)에 영구 보관되어 오프라인에서도 재사용됩니다.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(0, 0, 0, 0.25)', padding: '8px 12px', borderRadius: 8, fontSize: '0.72rem', color: '#7dd3fc' }}>
              <span>✓ 추가 파일 다운로드 없이 지금 즉시 선명한 원어민 발음으로 재생됩니다.</span>
            </div>
          </div>
        )}

        {/* 2. VOICEVOX Mode */}
        {settings.engine === 'voicevox' && (
          <div style={{ marginBottom: 20, background: 'rgba(56, 189, 248, 0.06)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: 14, borderRadius: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: isVoicevoxOnline ? '#10b981' : '#f59e0b',
                    boxShadow: isVoicevoxOnline ? '0 0 8px #10b981' : 'none',
                  }}
                />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: isVoicevoxOnline ? '#34d399' : '#fbbf24' }}>
                  {isVoicevoxOnline ? '로컬 VOICEVOX 엔진 연결됨' : 'VOICEVOX 엔진 미감지 (폴백 작동)'}
                </span>
              </div>
              <button
                onClick={() => {
                  checkVoicevoxStatus(settings.voicevoxServerUrl).then(setIsVoicevoxOnline);
                }}
                style={{
                  background: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#cbd5e1',
                  borderRadius: 6,
                  padding: '2px 8px',
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                }}
              >
                연결 새로고침
              </button>
            </div>

            <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: 6, fontWeight: 600 }}>
              캐릭터 음성 선택
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, maxHeight: 130, overflowY: 'auto' }}>
              {POPULAR_VOICEVOX_PRESETS.map((p) => {
                const isSelected = settings.voicevoxSpeakerId === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSettings((s) => ({ ...s, voicevoxSpeakerId: p.id }))}
                    style={{
                      padding: '6px 10px',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontSize: '0.76rem',
                      background: isSelected ? 'rgba(56, 189, 248, 0.2)' : 'rgba(0, 0, 0, 0.25)',
                      border: isSelected ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.05)',
                      color: isSelected ? '#ffffff' : '#94a3b8',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: isSelected ? 700 : 500 }}>{p.name}</div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{p.style}</div>
                    </div>
                    {isSelected && <Check size={14} color="#38bdf8" />}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 10, fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span>※ PC에 VOICEVOX 소프트웨어가 켜져 있으면 압도적인 고음질 억양으로 발음합니다.</span>
              <a
                href="https://voicevox.hiroshiba.jp/"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#38bdf8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 2 }}
              >
                다운로드 <ExternalLink size={10} />
              </a>
            </div>
          </div>
        )}

        {/* 3. Native Web Speech Mode */}
        {settings.engine === 'web_speech' && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 8 }}>
              🎙️ 감지된 OS 일본어 보이스 ({voices.length}개)
            </label>
            {voices.length === 0 ? (
              <div style={{ fontSize: '0.8rem', color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)', padding: 10, borderRadius: 8 }}>
                ⚠️ 시스템에 일본어 음성이 없습니다. 상단의 <strong>[AI 경량 모델]</strong> 탭을 선택하여 24MB 경량 모델을 로드하시면 고품질 발음을 바로 들으실 수 있습니다.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 130, overflowY: 'auto', paddingRight: 4 }}>
                {voices.map((v, idx) => {
                  const isSelected = settings.voiceURI === v.voiceURI;
                  return (
                    <div
                      key={v.voiceURI || idx}
                      onClick={() => setSettings((s) => ({ ...s, voiceURI: v.voiceURI }))}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        background: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        border: isSelected ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.06)',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: isSelected ? 700 : 500, color: isSelected ? '#ffffff' : '#cbd5e1' }}>
                          {v.name}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                          {v.lang} {v.localService ? '· 로컬' : '· 온라인'}
                        </div>
                      </div>
                      {isSelected && <Check size={16} color="#38bdf8" />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Playback Rate Slider */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#e2e8f0' }}>
              ⚡ 재생 속도 ({settings.rate}x)
            </label>
            <div style={{ display: 'flex', gap: 4 }}>
              {[0.8, 1.0, 1.2, 1.5, 1.75].map((r) => (
                <button
                  key={r}
                  onClick={() => setSettings((s) => ({ ...s, rate: r }))}
                  style={{
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontSize: '0.72rem',
                    border: 'none',
                    background: settings.rate === r ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)',
                    color: settings.rate === r ? '#0b0f19' : '#94a3b8',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                >
                  {r}x
                </button>
              ))}
            </div>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.05"
            value={settings.rate}
            onChange={(e) => setSettings((s) => ({ ...s, rate: parseFloat(e.target.value) }))}
            style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
          />
        </div>

        {/* Pitch Slider */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#e2e8f0' }}>
              🎵 음정 피치 ({settings.pitch}x)
            </label>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
              {settings.pitch > 1.0 ? '밝은 하이톤' : settings.pitch < 1.0 ? '차분한 로우톤' : '표준'}
            </span>
          </div>
          <input
            type="range"
            min="0.8"
            max="1.3"
            step="0.05"
            value={settings.pitch}
            onChange={(e) => setSettings((s) => ({ ...s, pitch: parseFloat(e.target.value) }))}
            style={{ width: '100%', accentColor: '#8b5cf6', cursor: 'pointer' }}
          />
        </div>

        {/* Test Phrase Button */}
        <div style={{ marginBottom: 20, background: 'rgba(0, 0, 0, 0.3)', padding: 12, borderRadius: 12, border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: 4 }}>
            현재 엔진 발음 미리듣기:
          </div>
          <div style={{ fontSize: '0.82rem', color: '#e2e8f0', marginBottom: 8, fontWeight: 500 }}>
            「こんにちは！NihonGoで楽しく日本語の会話と読解をマスターしましょう！」
          </div>
          <button
            onClick={handleTestPlay}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              width: '100%',
              padding: '8px 14px',
              borderRadius: 8,
              background: isPlayingTest ? '#ef4444' : 'rgba(56, 189, 248, 0.2)',
              border: isPlayingTest ? 'none' : '1px solid rgba(56, 189, 248, 0.4)',
              color: isPlayingTest ? '#ffffff' : '#38bdf8',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {isPlayingTest ? <X size={14} /> : <Play size={14} />}
            {isPlayingTest ? '재생 중지' : '선택한 엔진으로 테스트 듣기'}
          </button>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={handleReset}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              background: 'none',
              border: 'none',
              color: '#64748b',
              fontSize: '0.78rem',
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={13} /> 초기화
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={onClose}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#cbd5e1',
                fontSize: '0.82rem',
                cursor: 'pointer',
              }}
            >
              취소
            </button>
            <button
              onClick={handleSave}
              style={{
                padding: '8px 20px',
                borderRadius: 8,
                background: savedFeedback
                  ? '#10b981'
                  : 'linear-gradient(135deg, #38bdf8, #8b5cf6)',
                border: 'none',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)',
              }}
            >
              {savedFeedback ? <Check size={16} /> : <Sparkles size={16} />}
              {savedFeedback ? '저장 완료!' : '설정 저장'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
