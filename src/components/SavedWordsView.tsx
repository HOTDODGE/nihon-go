import React, { useState } from 'react';
import type { WordItem, JLPTLevel } from '../types';
import { Bookmark, Volume2, Trash2, Eye, EyeOff } from 'lucide-react';
import { playJapaneseAudio } from '../utils/speech';

interface SavedWordsViewProps {
  savedWords: WordItem[];
  onRemoveWord: (id: string) => void;
  selectedLevel: JLPTLevel;
}

export const SavedWordsView: React.FC<SavedWordsViewProps> = ({
  savedWords,
  onRemoveWord,
  selectedLevel,
}) => {
  const [hideMeanings, setHideMeanings] = useState(false);

  const filteredWords = selectedLevel === 'ALL'
    ? savedWords
    : savedWords.filter(w => w.jlpt === selectedLevel);

  const getJlptClass = (level: string) => {
    switch (level) {
      case 'N1': return 'badge-n1';
      case 'N2': return 'badge-n2';
      case 'N3': return 'badge-n3';
      case 'N4': return 'badge-n4';
      case 'N5': return 'badge-n5';
      default: return 'badge-all';
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: '24px auto', padding: '0 16px' }}>
      {/* Title Header */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#8b5cf6', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              PERSONAL VOCABULARY
            </span>
            {selectedLevel !== 'ALL' && (
              <span className={`badge-jlpt ${getJlptClass(selectedLevel)}`}>
                필터: {selectedLevel}
              </span>
            )}
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
            내 학습 단어장 ({filteredWords.length}개)
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            회화와 독해 지문에서 북마크한 단어들을 모아보고 암기 테스트를 진행하세요.
          </p>
        </div>

        {savedWords.length > 0 && (
          <button
            onClick={() => setHideMeanings(!hideMeanings)}
            className="btn-secondary"
            style={{ fontSize: '0.82rem', padding: '8px 14px' }}
          >
            {hideMeanings ? <Eye size={16} /> : <EyeOff size={16} />}
            {hideMeanings ? '의미 표시하기' : '의미 가리기 (암기 모드)'}
          </button>
        )}
      </div>

      {filteredWords.length === 0 ? (
        <div className="glass-card" style={{ padding: 60, textAlign: 'center' }}>
          <Bookmark size={48} color="#64748b" style={{ marginBottom: 16 }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 8 }}>
            저장된 단어가 없습니다
          </h3>
          <p style={{ color: '#94a3b8', maxWidth: 460, margin: '0 auto' }}>
            회화 시뮬레이션의 어휘 팁이나 독해 라운지의 핵심 단어를 클릭하여 북마크에 추가해보세요!
          </p>
        </div>
      ) : (
        <div className="nihon-card-grid">
          {filteredWords.map((word) => (
            <div
              key={word.id}
              className="glass-card"
              style={{
                padding: 18,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span className={`badge-jlpt ${getJlptClass(word.jlpt)}`}>
                    JLPT {word.jlpt}
                  </span>
                  <button
                    onClick={() => onRemoveWord(word.id)}
                    title="단어장에서 삭제"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#64748b',
                      cursor: 'pointer',
                      padding: 4,
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#f43f5e')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#a5b4fc', marginBottom: 2 }}>
                  {word.reading}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <h4 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff' }}>
                    {word.word.includes('(') || word.word === word.reading
                      ? word.word
                      : `${word.word} (${word.reading})`}
                  </h4>
                  <button
                    className="btn-speaker-circle"
                    onClick={() => playJapaneseAudio(word.word)}
                    style={{
                      width: 32,
                      height: 32,
                      minWidth: 32,
                      minHeight: 32,
                      background: 'rgba(139, 92, 246, 0.15)',
                      border: 'none',
                      color: '#c084fc',
                    }}
                    title="발음 듣기"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>

                <div style={{
                  background: hideMeanings ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.3)',
                  padding: 10,
                  borderRadius: 8,
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: hideMeanings ? '#64748b' : '#38bdf8',
                  minHeight: 40,
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  {hideMeanings ? '클릭하여 의미 확인' : word.meaning}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
