import React, { useState, useRef } from 'react';
import type { DialogueTurn, JLPTLevel, WordItem } from '../types';
import { CONVERSATIONS } from '../data/conversations';
import { Play, Square, Lightbulb, ChevronRight, ChevronLeft, SpellCheck, Search } from 'lucide-react';
import { playJapaneseAudio, stopAudio } from '../utils/speech';
import { renderFuriganaText } from '../utils/furigana';

interface ConversationViewProps {
  selectedLevel: JLPTLevel;
  onSelectWord: (word: WordItem) => void;
}

const CATEGORY_FILTERS = [
  { id: 'ALL', label: '전체' },
  { id: 'travel', label: '✈️ 여행/교통' },
  { id: 'dining', label: '🍜 식당/술집' },
  { id: 'shopping', label: '🛍️ 쇼핑/드럭' },
  { id: 'lifestyle', label: '☕ 카페/생활' },
  { id: 'business', label: '💼 비즈니스/면접' },
  { id: 'subculture', label: '👾 서브컬처' },
];

const ITEMS_PER_PAGE = 10;

export const ConversationView: React.FC<ConversationViewProps> = ({
  selectedLevel,
  onSelectWord,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter scenarios by JLPT level, Category, and Search Query
  const filteredScenarios = CONVERSATIONS.filter(s => {
    // Level match
    if (selectedLevel !== 'ALL' && s.jlpt !== selectedLevel) return false;

    // Category match
    if (selectedCategory !== 'ALL') {
      if (selectedCategory === 'dining' && !(s.category === 'izakaya' || s.category === 'convenience')) return false;
      else if (selectedCategory === 'shopping' && s.category !== 'shopping') return false;
      else if (selectedCategory === 'travel' && s.category !== 'travel') return false;
      else if (selectedCategory === 'lifestyle' && !(s.category === 'lifestyle' || s.category === 'daily' || s.category === 'hospital')) return false;
      else if (selectedCategory === 'business' && !(s.category === 'business' || s.category === 'work')) return false;
      else if (selectedCategory === 'subculture' && s.category !== 'subculture') return false;
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = s.title.toLowerCase().includes(q);
      const matchSub = s.subtitle.toLowerCase().includes(q);
      const matchDesc = s.description.toLowerCase().includes(q);
      if (!matchTitle && !matchSub && !matchDesc) return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredScenarios.length / ITEMS_PER_PAGE) || 1;
  const safePage = Math.min(currentPage, totalPages);
  const paginatedScenarios = filteredScenarios.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const [activeScenarioId, setActiveScenarioId] = useState<string>(
    CONVERSATIONS[0].id
  );
  const [playingTurnId, setPlayingTurnId] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [showTranslations, setShowTranslations] = useState<boolean>(true);
  const [showBrackets, setShowBrackets] = useState<boolean>(true);
  const detailRef = useRef<HTMLDivElement>(null);

  const currentScenario = CONVERSATIONS.find(s => s.id === activeScenarioId) || paginatedScenarios[0] || CONVERSATIONS[0];

  const handlePlayTurn = (turn: DialogueTurn) => {
    setPlayingTurnId(turn.id);
    const audioText = turn.reading || turn.text;
    playJapaneseAudio(audioText, speechRate, () => {
      setPlayingTurnId(null);
    });
  };

  const handleStop = () => {
    stopAudio();
    setPlayingTurnId(null);
  };

  const currentScenarioIndex = filteredScenarios.findIndex(s => s.id === currentScenario.id);
  const hasPrevScenario = currentScenarioIndex > 0;
  const hasNextScenario = currentScenarioIndex !== -1 && currentScenarioIndex < filteredScenarios.length - 1;

  const handlePrevScenario = () => {
    if (hasPrevScenario) {
      const prevScenario = filteredScenarios[currentScenarioIndex - 1];
      stopAudio();
      setPlayingTurnId(null);
      setActiveScenarioId(prevScenario.id);

      const targetPage = Math.floor((currentScenarioIndex - 1) / ITEMS_PER_PAGE) + 1;
      if (targetPage !== currentPage) {
        setCurrentPage(targetPage);
      }

      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNextScenario = () => {
    if (hasNextScenario) {
      const nextScenario = filteredScenarios[currentScenarioIndex + 1];
      stopAudio();
      setPlayingTurnId(null);
      setActiveScenarioId(nextScenario.id);

      const targetPage = Math.floor((currentScenarioIndex + 1) / ITEMS_PER_PAGE) + 1;
      if (targetPage !== currentPage) {
        setCurrentPage(targetPage);
      }

      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      {/* Title Bar */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f43f5e', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              PRACTICAL DIALOGUE
            </span>
            {selectedLevel !== 'ALL' && (
              <span className={`badge-jlpt ${getJlptClass(selectedLevel)}`}>
                필터: {selectedLevel}
              </span>
            )}
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
            실전 회화 시뮬레이션
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            원어민 음성으로 직접 듣고, 문장 속 주요 어휘와 문화적 뉘앙스를 함께 학습하세요.
          </p>
        </div>

        {/* Global Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.06)', padding: '4px 8px', borderRadius: 8 }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>속도:</span>
            {[0.8, 1.0, 1.2, 1.5, 1.75].map(rate => (
              <button
                key={rate}
                onClick={() => setSpeechRate(rate)}
                style={{
                  padding: '2px 6px',
                  borderRadius: 4,
                  fontSize: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  background: speechRate === rate ? 'rgba(139, 92, 246, 0.4)' : 'transparent',
                  color: speechRate === rate ? '#ffffff' : '#94a3b8',
                  fontWeight: speechRate === rate ? 700 : 400,
                }}
              >
                {rate}x
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowBrackets(!showBrackets)}
            className="btn-secondary"
            style={{
              fontSize: '0.8rem',
              padding: '6px 12px',
              background: showBrackets ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.06)',
              borderColor: showBrackets ? 'rgba(139, 92, 246, 0.5)' : 'var(--border-card)',
              color: showBrackets ? '#c084fc' : 'var(--text-primary)',
            }}
          >
            <SpellCheck size={15} />
            한자 발음( ) {showBrackets ? '켜짐' : '꺼짐'}
          </button>
          <button
            onClick={() => setShowTranslations(!showTranslations)}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            번역 {showTranslations ? '숨기기' : '보기'}
          </button>
        </div>
      </div>

      {/* Category Filter Chips Bar */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, marginBottom: 16 }}>
        {CATEGORY_FILTERS.map(cat => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentPage(1);
              }}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: '0.82rem',
                fontWeight: isActive ? 700 : 500,
                whiteSpace: 'nowrap',
                border: '1px solid',
                borderColor: isActive ? 'rgba(244, 63, 94, 0.6)' : 'rgba(255, 255, 255, 0.08)',
                background: isActive ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                color: isActive ? '#f43f5e' : '#cbd5e1',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className="nihon-split-layout">
        {/* Scenario Selection List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="시나리오 검색 (예: 택시, 면세, 면접)..."
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#f8fafc',
                fontSize: '0.85rem',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8' }}>
              회화 시나리오 ({filteredScenarios.length}개)
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              페이지 {safePage} / {totalPages} (총 {CONVERSATIONS.length}개)
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 'calc(100vh - 320px)', overflowY: 'auto', paddingRight: 4 }}>
          {paginatedScenarios.length === 0 ? (
            <div className="glass-card" style={{ padding: 24, textAlign: 'center', color: '#94a3b8' }}>
              조건에 맞는 회화 시나리오가 없습니다. 필터나 검색어를 변경해 보세요.
            </div>
          ) : (
            paginatedScenarios.map((scenario) => {
              const isSelected = scenario.id === currentScenario.id;
              return (
                <div
                  key={scenario.id}
                  onClick={() => {
                    stopAudio();
                    setPlayingTurnId(null);
                    setActiveScenarioId(scenario.id);
                    if (window.innerWidth <= 768) {
                      setTimeout(() => {
                        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 50);
                    }
                  }}
                  className="glass-card"
                  style={{
                    padding: 14,
                    cursor: 'pointer',
                    borderColor: isSelected ? 'rgba(139, 92, 246, 0.6)' : 'var(--border-card)',
                    background: isSelected ? 'rgba(139, 92, 246, 0.12)' : 'var(--bg-card)',
                    boxShadow: isSelected ? '0 4px 20px rgba(139, 92, 246, 0.15)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span className={`badge-jlpt ${getJlptClass(scenario.jlpt)}`}>
                      JLPT {scenario.jlpt}
                    </span>
                    <ChevronRight size={16} color={isSelected ? '#c084fc' : '#64748b'} />
                  </div>
                  <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: isSelected ? '#ffffff' : '#e2e8f0', marginBottom: 4 }}>
                    {scenario.title}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4 }}>
                    {scenario.subtitle}
                  </p>
                </div>
              );
            })
          )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 2px' }}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={safePage <= 1}
                className="btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4, opacity: safePage <= 1 ? 0.4 : 1 }}
              >
                <ChevronLeft size={14} /> 이전
              </button>
              <span style={{ fontSize: '0.78rem', color: '#cbd5e1', fontWeight: 600 }}>
                {safePage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={safePage >= totalPages}
                className="btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4, opacity: safePage >= totalPages ? 0.4 : 1 }}
              >
                다음 <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Active Scenario Dialogue Panel */}
        <div ref={detailRef} className="glass-card mobile-compact-p" style={{ padding: 24 }}>
          {/* Header Info */}
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 16, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span className={`badge-jlpt ${getJlptClass(currentScenario.jlpt)}`}>
                JLPT {currentScenario.jlpt}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                총 {currentScenario.turns.length}개 대화 턴
              </span>
            </div>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#f8fafc', marginBottom: 6 }}>
              {currentScenario.title}
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
              {currentScenario.description}
            </p>
          </div>

          {/* Dialogue Turns */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {currentScenario.turns.map((turn) => {
              const isPlaying = playingTurnId === turn.id;
              const isUser = turn.role === 'user';

              return (
                <div
                  key={turn.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isUser ? 'flex-end' : 'flex-start',
                    maxWidth: '100%',
                  }}
                >
                  {/* Speaker Label */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginBottom: 6,
                    fontSize: '0.8rem',
                    color: isUser ? '#f43f5e' : '#38bdf8',
                    fontWeight: 600,
                  }}>
                    <span>{turn.avatar}</span>
                    <span>{turn.speaker}</span>
                  </div>

                  {/* Bubble Container */}
                  <div
                    style={{
                      maxWidth: '85%',
                      background: isUser
                        ? 'linear-gradient(135deg, rgba(244, 63, 94, 0.18) 0%, rgba(139, 92, 246, 0.22) 100%)'
                        : 'rgba(21, 29, 48, 0.9)',
                      border: isPlaying
                        ? '1px solid #f43f5e'
                        : isUser ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      padding: '16px 20px',
                      boxShadow: isPlaying ? '0 0 20px rgba(244, 63, 94, 0.3)' : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {/* Yomi Reading */}
                    {turn.reading && (
                      <div style={{ fontSize: '0.78rem', color: '#a5b4fc', marginBottom: 2 }}>
                        {turn.reading}
                      </div>
                    )}

                    {/* Japanese Text with optional brackets */}
                    <div style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: '#ffffff',
                      marginBottom: showTranslations ? 6 : 0,
                      lineHeight: 1.6,
                    }}>
                      {showBrackets
                        ? renderFuriganaText(turn.text)
                        : turn.text.replace(/[\(（][\u3040-\u309F\u30A0-\u30FFー]+[\)）]/g, '')}
                    </div>

                    {/* Korean Translation */}
                    {showTranslations && (
                      <div style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                        {turn.translation}
                      </div>
                    )}

                    {/* Vocabulary Chips */}
                    {turn.words && turn.words.length > 0 && (
                      <div style={{
                        marginTop: 12,
                        paddingTop: 10,
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: 6
                      }}>
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>어휘 팁:</span>
                        {turn.words.map(w => (
                          <button
                            key={w.id}
                            onClick={() => onSelectWord(w)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              background: 'rgba(255,255,255,0.08)',
                              border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: 6,
                              padding: '2px 8px',
                              fontSize: '0.75rem',
                              color: '#e2e8f0',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#c084fc')}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                          >
                            <span style={{ fontWeight: 600 }}>{w.word}</span>
                            <span style={{ fontSize: '0.65rem', color: '#a5b4fc' }}>({w.reading})</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Turn Controls & Cultural Tip */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginTop: 6,
                    padding: '0 4px',
                  }}>
                    <button
                      onClick={() => isPlaying ? handleStop() : handlePlayTurn(turn)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        background: isPlaying ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255,255,255,0.06)',
                        border: 'none',
                        color: isPlaying ? '#fb7185' : '#94a3b8',
                        padding: '4px 8px',
                        borderRadius: 6,
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                      }}
                    >
                      {isPlaying ? <Square size={12} fill="#fb7185" /> : <Play size={12} fill="#94a3b8" />}
                      <span>{isPlaying ? '정지' : '발음 듣기'}</span>
                    </button>

                    {turn.culturalTip && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: '0.75rem',
                        color: '#fbbf24',
                      }}>
                        <Lightbulb size={13} />
                        <span>{turn.culturalTip}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Scenario Navigation Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 28,
            paddingTop: 20,
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            gap: 12,
            flexWrap: 'wrap',
          }}>
            <button
              onClick={handlePrevScenario}
              disabled={!hasPrevScenario}
              className="btn-secondary"
              style={{
                padding: '9px 18px',
                fontSize: '0.85rem',
                opacity: hasPrevScenario ? 1 : 0.4,
                cursor: hasPrevScenario ? 'pointer' : 'not-allowed',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                borderRadius: 10,
              }}
              title={hasPrevScenario ? '이전 시나리오로 이동' : '첫 번째 시나리오입니다'}
            >
              <ChevronLeft size={16} />
              <span>이전 회화</span>
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.82rem',
              color: '#94a3b8',
              fontWeight: 600,
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '6px 14px',
              borderRadius: 20,
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}>
              <span>시나리오</span>
              <span style={{ color: '#f43f5e', fontWeight: 700 }}>
                {currentScenarioIndex !== -1 ? currentScenarioIndex + 1 : 1}
              </span>
              <span>/</span>
              <span>{filteredScenarios.length}</span>
            </div>

            <button
              onClick={handleNextScenario}
              disabled={!hasNextScenario}
              className="btn-primary"
              style={{
                padding: '9px 20px',
                fontSize: '0.85rem',
                opacity: hasNextScenario ? 1 : 0.4,
                cursor: hasNextScenario ? 'pointer' : 'not-allowed',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                borderRadius: 10,
              }}
              title={hasNextScenario ? '다음 시나리오로 이동' : '마지막 시나리오입니다'}
            >
              <span>다음 회화</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
