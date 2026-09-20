import React, { useState } from 'react';
import type { JLPTLevel } from '../types';
import { MEMES } from '../data/memes';
import { AlertTriangle, ShieldCheck, ShieldAlert, Volume2, Search } from 'lucide-react';
import { playJapaneseAudio } from '../utils/speech';

interface MemeArchiveViewProps {
  selectedLevel: JLPTLevel;
}

export const MemeArchiveView: React.FC<MemeArchiveViewProps> = ({ selectedLevel }) => {
  const [levelFilter, setLevelFilter] = useState<JLPTLevel>(selectedLevel);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Sync with header level when header changes
  React.useEffect(() => {
    setLevelFilter(selectedLevel);
  }, [selectedLevel]);

  // Filter by JLPT level, Category, and Search Query
  const filteredMemes = MEMES.filter(meme => {
    const matchesLevel = levelFilter === 'ALL' || meme.jlptLevel === levelFilter;
    const matchesCategory = selectedCategory === 'ALL' || meme.category === selectedCategory;
    const matchesSearch = searchTerm.trim() === '' ||
      meme.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meme.reading.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meme.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meme.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesLevel && matchesCategory && matchesSearch;
  });

  const getDangerBadge = (level: 'safe' | 'caution' | 'danger') => {
    switch (level) {
      case 'safe':
        return {
          icon: ShieldCheck,
          text: '온라인 안전 / SNS 표준',
          color: '#10b981',
          bg: 'rgba(16, 185, 129, 0.12)',
          border: 'rgba(16, 185, 129, 0.3)',
        };
      case 'caution':
        return {
          icon: AlertTriangle,
          text: '주의 / 친한 사이 전용',
          color: '#f59e0b',
          bg: 'rgba(245, 158, 11, 0.12)',
          border: 'rgba(245, 158, 11, 0.3)',
        };
      case 'danger':
        return {
          icon: ShieldAlert,
          text: '오프라인 사용 금지 / 비하 위험',
          color: '#f43f5e',
          bg: 'rgba(244, 63, 94, 0.15)',
          border: 'rgba(244, 63, 94, 0.4)',
        };
    }
  };

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
      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f43f5e', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              INTERNET CULTURE & SLANG
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: 4 }}>
              총 {MEMES.length}개 밈 수록 ({filteredMemes.length}개 표시)
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
            넷 밈 & 신조어 아카이브 (ネット用語)
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            교재에서는 안 가르쳐주는 5ch, X, 틱톡 생생 유행어와 TPO 위험도 가이드
          </p>
        </div>

        {/* Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(21, 29, 48, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 10,
          padding: '8px 14px',
          width: '100%',
          maxWidth: 320,
        }}>
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="밈 검색 (예: 草, ぴえん, 沼る...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '0.88rem',
              width: '100%',
            }}
          />
        </div>
      </div>

      {/* Filter Toolbar: JLPT Levels + Categories */}
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
                border: levelFilter === lvl ? '1px solid rgba(244, 63, 94, 0.6)' : '1px solid rgba(255, 255, 255, 0.1)',
                background: levelFilter === lvl ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                color: levelFilter === lvl ? '#ff4d6d' : '#94a3b8',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {lvl === 'ALL' ? '전체 레벨' : lvl}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', minWidth: 65 }}>카테고리:</span>
          {[
            { id: 'ALL', label: '전체 분야' },
            { id: 'net_slang', label: '인터넷 게시판 (5ch/2ch)' },
            { id: 'sns', label: 'SNS / X(트위터)' },
            { id: 'otaku', label: '서브컬처 & 오타쿠' },
            { id: 'buzzword', label: '대중 유행어' },
          ].map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '4px 12px',
                  borderRadius: 6,
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 700 : 500,
                  border: isActive ? '1px solid rgba(139, 92, 246, 0.6)' : '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                  background: isActive ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? '#c084fc' : '#94a3b8',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Memes Grid */}
      <div className="nihon-card-grid">
        {filteredMemes.length === 0 ? (
          <div className="glass-card" style={{ gridColumn: '1 / -1', padding: '48px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>
              해당 조건의 밈을 찾을 수 없습니다
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: 20 }}>
              선택한 난이도({levelFilter}) 또는 검색어에 해당하는 밈이 없습니다.
            </p>
            <button
              onClick={() => { setLevelFilter('ALL'); setSelectedCategory('ALL'); setSearchTerm(''); }}
              style={{
                padding: '10px 24px',
                borderRadius: 8,
                background: 'linear-gradient(135deg, #f43f5e, #8b5cf6)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(244, 63, 94, 0.3)'
              }}
            >
              전체 밈 보기 (필터 초기화)
            </button>
          </div>
        ) : (
          filteredMemes.map((meme) => {
            const danger = getDangerBadge(meme.dangerLevel);
            const DangerIcon = danger.icon;

            return (
              <div
                key={meme.id}
                className="glass-card"
                style={{
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 16,
                }}
              >
                {/* Card Top */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className={`badge-jlpt ${getJlptClass(meme.jlptLevel)}`} style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                        JLPT {meme.jlptLevel} 권장
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                        #{meme.category}
                      </span>
                    </div>

                    {/* Danger Meter Badge */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '3px 8px',
                      borderRadius: 6,
                      background: danger.bg,
                      border: `1px solid ${danger.border}`,
                      color: danger.color,
                      fontSize: '0.72rem',
                      fontWeight: 700,
                    }}>
                      <DangerIcon size={12} />
                      <span>{danger.text}</span>
                    </div>
                  </div>

                  {/* Term & Audio */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: 2 }}>
                        로마자: {meme.romaji}
                      </div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                        <span>{meme.term}</span>
                        <span style={{ fontSize: '0.85rem', color: '#a5b4fc', fontWeight: 500 }}>
                          ({meme.reading})
                        </span>
                      </h3>
                    </div>
                    <button
                      className="btn-speaker-circle"
                      onClick={() => playJapaneseAudio(meme.term)}
                      style={{
                        background: 'rgba(244, 63, 94, 0.15)',
                        border: '1px solid rgba(244, 63, 94, 0.3)',
                        color: '#fb7185',
                      }}
                      title="발음 듣기"
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>

                  {/* Meaning */}
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#38bdf8',
                    marginBottom: 12,
                    lineHeight: 1.4,
                  }}>
                    {meme.meaning}
                  </div>

                  {/* Origin */}
                  <div style={{
                    fontSize: '0.82rem',
                    color: '#94a3b8',
                    lineHeight: 1.5,
                    marginBottom: 14,
                    background: 'rgba(0, 0, 0, 0.25)',
                    padding: 10,
                    borderRadius: 8,
                  }}>
                    <strong style={{ color: '#e2e8f0' }}>유래: </strong>
                    {meme.origin}
                  </div>

                  {/* Danger Explanation */}
                  <div style={{
                    fontSize: '0.8rem',
                    color: danger.color,
                    marginBottom: 14,
                    lineHeight: 1.4,
                    borderLeft: `2px solid ${danger.color}`,
                    paddingLeft: 8,
                  }}>
                    {meme.dangerExplanation}
                  </div>
                </div>

                {/* Example Box */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: 10,
                  padding: 12,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                      실전 예문
                    </span>
                    <button
                      onClick={() => playJapaneseAudio(meme.example)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        fontSize: '0.72rem',
                      }}
                    >
                      <Volume2 size={12} /> 예문 듣기
                    </button>
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f8fafc', marginBottom: 4 }}>
                    {meme.example}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    {meme.exampleMeaning}
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
