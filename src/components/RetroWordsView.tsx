import React, { useState } from 'react';
import type { JLPTLevel } from '../types';
import { RETRO_WORDS } from '../data/retroWords';
import { ArrowRight, Volume2 } from 'lucide-react';
import { playJapaneseAudio } from '../utils/speech';

interface RetroWordsViewProps {
  selectedLevel: JLPTLevel;
}

export const RetroWordsView: React.FC<RetroWordsViewProps> = ({ selectedLevel }) => {
  const [levelFilter, setLevelFilter] = useState<JLPTLevel>(selectedLevel);
  const [selectedEra, setSelectedEra] = useState<string>('ALL');

  React.useEffect(() => {
    setLevelFilter(selectedLevel);
  }, [selectedLevel]);

  const filteredWords = RETRO_WORDS.filter(item => {
    const matchesLevel = levelFilter === 'ALL' || item.jlptLevel === levelFilter;
    const matchesEra = selectedEra === 'ALL' || item.era === selectedEra;
    return matchesLevel && matchesEra;
  });

  const getReactionBadge = (reaction: string) => {
    switch (reaction) {
      case '폭소':
        return { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)', label: '🤣 폭소 유발 (개그용)' };
      case '아재 취급':
        return { color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.15)', label: '👴 아재/꼰대 취급 주의' };
      case '어리둥절':
        return { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)', label: '❓ 젊은 세대 어리둥절' };
      default:
        return { color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.15)', label: '✨ 레트로 감성' };
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: '24px auto', padding: '0 16px' }}>
      {/* Title Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f59e0b', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            RETRO & DEAD WORDS LAB
          </span>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: 4 }}>
            총 {RETRO_WORDS.length}개 사어 수록 ({filteredWords.length}개 표시)
          </span>
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
          쇼와·헤이세이 사어(死語) 연구소
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          한 시대를 풍미하고 지금은 사라진 유행어를 통해 일본의 현대 문화사와 시대 감성을 이해합니다.
        </p>
      </div>

      {/* Filter Toolbar: JLPT Levels + Eras */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, background: 'rgba(15, 23, 42, 0.5)', padding: 14, borderRadius: 12, border: '1px solid rgba(255, 255, 255, 0.05)' }}>
        {/* JLPT Level Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', minWidth: 65 }}>난이도:</span>
          {(['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'] as const).map(lvl => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              style={{
                padding: '4px 12px',
                borderRadius: 6,
                fontSize: '0.8rem',
                fontWeight: levelFilter === lvl ? 700 : 500,
                border: levelFilter === lvl ? '1px solid rgba(245, 158, 11, 0.6)' : '1px solid rgba(255, 255, 255, 0.1)',
                background: levelFilter === lvl ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                color: levelFilter === lvl ? '#fbbf24' : '#94a3b8',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {lvl === 'ALL' ? '전체 레벨' : lvl}
            </button>
          ))}
        </div>

        {/* Era Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', minWidth: 65 }}>시대 구분:</span>
          {[
            { id: 'ALL', label: '전체 시대' },
            { id: 'showa_70s', label: '1970~80년대 쇼와 시대 (昭和)' },
            { id: 'bubble_80s', label: '1980년대 후반 버블 경제기 (バブル)' },
            { id: 'heisei_90s', label: '1990년대 헤이세이 갸루기 (平成)' },
            { id: 'heisei_00s', label: '2000년대 헤이세이 IT기' },
          ].map(era => {
            const isActive = selectedEra === era.id;
            return (
              <button
                key={era.id}
                onClick={() => setSelectedEra(era.id)}
                style={{
                  padding: '4px 12px',
                  borderRadius: 6,
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 700 : 500,
                  border: isActive ? '1px solid rgba(244, 63, 94, 0.6)' : '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                  background: isActive ? 'rgba(244, 63, 94, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? '#fb7185' : '#94a3b8',
                  transition: 'all 0.15s ease',
                }}
              >
                {era.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards List */}
      <div className="nihon-card-grid">
        {filteredWords.length === 0 ? (
          <div className="glass-card" style={{ gridColumn: '1 / -1', padding: '48px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>
              해당 조건의 사어 데이터가 없습니다
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: 20 }}>
              선택한 난이도({levelFilter}) 또는 시대 구분에 해당하는 사어가 없습니다.
            </p>
            <button
              onClick={() => { setLevelFilter('ALL'); setSelectedEra('ALL'); }}
              style={{
                padding: '10px 24px',
                borderRadius: 8,
                background: 'linear-gradient(135deg, #f59e0b, #f43f5e)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
              }}
            >
              전체 사어 보기 (필터 초기화)
            </button>
          </div>
        ) : (
          filteredWords.map((item) => {
            const reaction = getReactionBadge(item.reactionLevel);

            return (
              <div
                key={item.id}
                className="glass-card"
                style={{
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 16,
                  borderLeft: '4px solid #f59e0b',
                }}
              >
                <div>
                  {/* Era & Reaction */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 700 }}>
                      ⏳ {item.eraLabel}
                    </span>
                    <span style={{
                      fontSize: '0.72rem',
                      padding: '2px 8px',
                      borderRadius: 6,
                      background: reaction.bg,
                      color: reaction.color,
                      fontWeight: 700,
                    }}>
                      {reaction.label}
                    </span>
                  </div>

                  {/* Term & Audio */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                        <span>{item.term}</span>
                        <span style={{ fontSize: '0.85rem', color: '#a5b4fc', fontWeight: 500 }}>
                          ({item.reading})
                        </span>
                      </h3>
                    </div>
                    <button
                      className="btn-speaker-circle"
                      onClick={() => playJapaneseAudio(item.term)}
                      style={{
                        background: 'rgba(245, 158, 11, 0.15)',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        color: '#fbbf24',
                      }}
                      title="발음 듣기"
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>

                  {/* Usage Meaning */}
                  <div style={{ fontSize: '0.92rem', color: '#e2e8f0', marginBottom: 14, lineHeight: 1.4 }}>
                    <span style={{ color: '#94a3b8' }}>당시 의미: </span>
                    <strong>{item.actualUsage}</strong>
                  </div>

                  {/* Comparison: Retro vs Modern */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: 10,
                    padding: 12,
                    marginBottom: 14,
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' }}>
                      요즘 일본어 대체 표현 (現代の言い換え)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.88rem', color: '#f43f5e', textDecoration: 'line-through' }}>
                        {item.term.split(' ')[0]}
                      </span>
                      <ArrowRight size={14} color="#94a3b8" />
                      {item.modernEquivalents.map((modern, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: '#34d399',
                            background: 'rgba(52, 211, 153, 0.1)',
                            padding: '2px 8px',
                            borderRadius: 6,
                          }}
                        >
                          {modern}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Background Story */}
                  <div style={{
                    fontSize: '0.82rem',
                    color: '#94a3b8',
                    lineHeight: 1.5,
                    background: 'rgba(255, 255, 255, 0.02)',
                    padding: 10,
                    borderRadius: 8,
                    marginBottom: 12,
                  }}>
                    <strong style={{ color: '#fbbf24' }}>시대 비하인드: </strong>
                    {item.backgroundStory}
                  </div>
                </div>

                {/* Example */}
                <div style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingTop: 10,
                  fontSize: '0.8rem',
                  color: '#cbd5e1',
                }}>
                  <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: 2 }}>
                    예: {item.example}
                  </div>
                  <div style={{ color: '#64748b' }}>
                    {item.exampleMeaning}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
