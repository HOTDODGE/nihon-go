import React from 'react';
import type { WordItem } from '../types';
import { Volume2, Bookmark, BookmarkCheck, X, BookA } from 'lucide-react';
import { playJapaneseAudio } from '../utils/speech';

interface WordInspectorModalProps {
  word: WordItem | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (word: WordItem) => void;
}

export const WordInspectorModal: React.FC<WordInspectorModalProps> = ({
  word,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  if (!word) return null;

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
    <div
      onClick={onClose}
      className="nihon-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-card nihon-modal-card animate-fade-in"
        style={{
          width: '100%',
          maxWidth: 440,
          padding: 24,
          background: '#131b2e',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className={`badge-jlpt ${getJlptClass(word.jlpt)}`}>
              JLPT {word.jlpt}
            </span>
            {word.partOfSpeech && (
              <span style={{
                fontSize: '0.75rem',
                padding: '2px 8px',
                borderRadius: 6,
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#94a3b8',
              }}>
                {word.partOfSpeech}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: 4,
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Word Display */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: '0.85rem', color: '#a5b4fc', marginBottom: 4, fontWeight: 600 }}>
            요미가나 발음: {word.reading}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '0.02em' }}>
              {word.word.includes('(') || word.word === word.reading
                ? word.word
                : `${word.word} (${word.reading})`}
            </h2>
            <button
              className="btn-speaker-circle"
              onClick={() => playJapaneseAudio(word.word)}
              title="원어민 발음 듣기"
              style={{
                background: 'rgba(139, 92, 246, 0.2)',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                color: '#c084fc',
              }}
            >
              <Volume2 size={18} />
            </button>
          </div>
        </div>

        {/* Meaning */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          padding: 14,
          borderRadius: 12,
          border: '1px solid rgba(255, 255, 255, 0.06)',
          marginBottom: 16,
        }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
            <BookA size={14} /> 한국어 의미
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#e2e8f0' }}>
            {word.meaning}
          </div>
          {word.note && (
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: 6, lineHeight: 1.4 }}>
              💡 {word.note}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => onToggleSave(word)}
            className="btn-secondary"
            style={{
              flex: 1,
              justifyContent: 'center',
              background: isSaved ? 'rgba(244, 63, 94, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              borderColor: isSaved ? 'rgba(244, 63, 94, 0.4)' : 'var(--border-card)',
              color: isSaved ? '#fb7185' : 'var(--text-primary)',
            }}
          >
            {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            {isSaved ? '단어장에서 제거' : '내 단어장에 저장'}
          </button>
          <button
            onClick={onClose}
            className="btn-primary"
            style={{ padding: '8px 20px' }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
