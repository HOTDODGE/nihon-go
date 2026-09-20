import React, { useState, useEffect, useRef } from 'react';
import type { JLPTLevel, WordItem } from '../types';
import { READINGS } from '../data/readings';
import { Volume2, Play, Square, Languages, ChevronRight, Search, ChevronLeft } from 'lucide-react';
import { playJapaneseAudio, stopAudio } from '../utils/speech';

interface ReadingViewProps {
  selectedLevel: JLPTLevel;
  onSelectWord: (word: WordItem) => void;
}

const ITEMS_PER_PAGE = 10;

export const ReadingView: React.FC<ReadingViewProps> = ({
  selectedLevel,
  onSelectWord,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter readings by JLPT level, Format, and Search Query
  const filteredReadings = READINGS.filter((r) => {
    const matchesLevel = selectedLevel === 'ALL' || r.jlpt === selectedLevel;
    const matchesFormat = selectedFormat === 'ALL' || r.format === selectedFormat;
    const matchesSearch =
      searchTerm.trim() === '' ||
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.topicTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.sentences.some((s) => s.original.includes(searchTerm) || s.translation.includes(searchTerm));

    return matchesLevel && matchesFormat && matchesSearch;
  });

  const totalPages = Math.ceil(filteredReadings.length / ITEMS_PER_PAGE) || 1;
  const safePage = Math.min(currentPage, totalPages);
  const paginatedReadings = filteredReadings.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const [activeReadingId, setActiveReadingId] = useState<string>(
    filteredReadings[0]?.id || READINGS[0].id
  );
  const [pronunciationMode, setPronunciationMode] = useState<'bracket' | 'ruby' | 'none'>('bracket');
  const [showTranslations, setShowTranslations] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const detailRef = useRef<HTMLDivElement>(null);

  // Reset page and selection when level, format, or search changes
  useEffect(() => {
    setCurrentPage(1);
    if (filteredReadings.length > 0 && !filteredReadings.some((r) => r.id === activeReadingId)) {
      setActiveReadingId(filteredReadings[0].id);
    }
  }, [selectedLevel, selectedFormat, searchTerm]);

  const currentReading =
    READINGS.find((r) => r.id === activeReadingId) || filteredReadings[0] || READINGS[0];

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

  const handlePlayFullText = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
      return;
    }

    const fullJapanese = currentReading.sentences.map((s) => s.ruby).join(' ');
    setIsPlaying(true);
    playJapaneseAudio(fullJapanese, 1.0, () => {
      setIsPlaying(false);
    });
  };

  const currentReadingIndex = filteredReadings.findIndex(r => r.id === currentReading.id);
  const hasPrevReading = currentReadingIndex > 0;
  const hasNextReading = currentReadingIndex !== -1 && currentReadingIndex < filteredReadings.length - 1;

  const handlePrevReading = () => {
    if (hasPrevReading) {
      const prevReading = filteredReadings[currentReadingIndex - 1];
      stopAudio();
      setIsPlaying(false);
      setActiveReadingId(prevReading.id);

      const targetPage = Math.floor((currentReadingIndex - 1) / ITEMS_PER_PAGE) + 1;
      if (targetPage !== currentPage) {
        setCurrentPage(targetPage);
      }

      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNextReading = () => {
    if (hasNextReading) {
      const nextReading = filteredReadings[currentReadingIndex + 1];
      stopAudio();
      setIsPlaying(false);
      setActiveReadingId(nextReading.id);

      const targetPage = Math.floor((currentReadingIndex + 1) / ITEMS_PER_PAGE) + 1;
      if (targetPage !== currentPage) {
        setCurrentPage(targetPage);
      }

      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getFormatBadge = (format: string) => {
    switch (format) {
      case 'tweet': return { label: 'X(트위터) 밈', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' };
      case 'lightnovel': return { label: '라이트노벨', color: '#c084fc', bg: 'rgba(192, 132, 252, 0.15)' };
      case 'column': return { label: '문화 비평/칼럼', color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.15)' };
      default: return { label: '블로그 에세이', color: '#34d399', bg: 'rgba(52, 211, 153, 0.15)' };
    }
  };

  const formatInfo = getFormatBadge(currentReading.format);

  // Helper to render sentence according to pronunciation mode
  const renderSentenceText = (rubyText: string, originalText: string) => {
    if (pronunciationMode === 'none') {
      return <span>{originalText}</span>;
    }

    if (pronunciationMode === 'ruby') {
      return <span dangerouslySetInnerHTML={{ __html: rubyText }} />;
    }

    // Bracket mode: convert <ruby>漢字<rt>かんじ</rt></ruby> to 漢字(かんじ)
    const bracketFormatted = rubyText.replace(/<ruby>(.*?)<rt>(.*?)<\/rt><\/ruby>/g, '$1($2)');
    return <span>{bracketFormatted}</span>;
  };

  return (
    <div style={{ maxWidth: 1240, margin: '24px auto', padding: '0 16px' }}>
      {/* Title Header */}
      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              READING & COMPREHENSION
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: 4 }}>
              총 {READINGS.length}개 지문 수록 ({filteredReadings.length}개 필터링)
            </span>
            {selectedLevel !== 'ALL' && (
              <span className={`badge-jlpt ${getJlptClass(selectedLevel)}`}>
                필터: {selectedLevel}
              </span>
            )}
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
            인터랙티브 독해 라운지
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            후리가나 토글과 단어 즉시 조회로 SNS 밈 피드부터 라이트노벨까지 자유롭게 독해하세요.
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {/* Pronunciation Mode Switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(21, 29, 48, 0.8)',
            padding: '3px 6px',
            borderRadius: 10,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            gap: 4,
          }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', paddingLeft: 4 }}>발음:</span>
            <button
              onClick={() => setPronunciationMode('bracket')}
              style={{
                padding: '4px 10px',
                fontSize: '0.78rem',
                fontWeight: pronunciationMode === 'bracket' ? 700 : 500,
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                background: pronunciationMode === 'bracket' ? 'rgba(56, 189, 248, 0.25)' : 'transparent',
                color: pronunciationMode === 'bracket' ? '#38bdf8' : '#94a3b8',
              }}
            >
              괄호 (기본)
            </button>
            <button
              onClick={() => setPronunciationMode('ruby')}
              style={{
                padding: '4px 10px',
                fontSize: '0.78rem',
                fontWeight: pronunciationMode === 'ruby' ? 700 : 500,
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                background: pronunciationMode === 'ruby' ? 'rgba(56, 189, 248, 0.25)' : 'transparent',
                color: pronunciationMode === 'ruby' ? '#38bdf8' : '#94a3b8',
              }}
            >
              후리가나
            </button>
            <button
              onClick={() => setPronunciationMode('none')}
              style={{
                padding: '4px 10px',
                fontSize: '0.78rem',
                fontWeight: pronunciationMode === 'none' ? 700 : 500,
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                background: pronunciationMode === 'none' ? 'rgba(56, 189, 248, 0.25)' : 'transparent',
                color: pronunciationMode === 'none' ? '#38bdf8' : '#94a3b8',
              }}
            >
              숨김
            </button>
          </div>

          <button
            onClick={() => setShowTranslations(!showTranslations)}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            <Languages size={15} />
            번역 {showTranslations ? '숨기기' : '보기'}
          </button>
          <button
            onClick={handlePlayFullText}
            className="btn-primary"
            style={{ fontSize: '0.8rem', padding: '6px 14px' }}
          >
            {isPlaying ? <Square size={14} fill="#ffffff" /> : <Play size={14} fill="#ffffff" />}
            {isPlaying ? '낭독 정지' : '지문 전체 낭독'}
          </button>
        </div>
      </div>

      <div className="nihon-split-layout">
        {/* Passages Sidebar (Search, Filter, List, Pagination) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Search Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(21, 29, 48, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 10,
            padding: '8px 12px',
          }}>
            <Search size={15} color="#94a3b8" />
            <input
              type="text"
              placeholder="지문 검색 (제목, 태그, 키워드)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontSize: '0.85rem',
                width: '100%',
              }}
            />
          </div>

          {/* Format Chips */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[
              { id: 'ALL', label: '전체' },
              { id: 'tweet', label: 'X(트윗)' },
              { id: 'blog', label: '블로그' },
              { id: 'lightnovel', label: '라노벨' },
              { id: 'column', label: '칼럼/비평' },
            ].map((fmt) => {
              const isActive = selectedFormat === fmt.id;
              return (
                <button
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id)}
                  style={{
                    padding: '3px 10px',
                    borderRadius: 6,
                    fontSize: '0.75rem',
                    fontWeight: isActive ? 700 : 500,
                    border: isActive ? '1px solid rgba(56, 189, 248, 0.6)' : '1px solid rgba(255, 255, 255, 0.08)',
                    background: isActive ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                    color: isActive ? '#38bdf8' : '#94a3b8',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {fmt.label}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#94a3b8', margin: '4px 0' }}>
            <span>지문 목록 ({filteredReadings.length}개)</span>
            <span>페이지 {safePage} / {totalPages}</span>
          </div>

          {/* Passages List */}
          {filteredReadings.length === 0 ? (
            <div className="glass-card" style={{ padding: 28, textAlign: 'center', color: '#94a3b8' }}>
              <div style={{ marginBottom: 8, fontWeight: 700 }}>검색 결과가 없습니다</div>
              <button
                onClick={() => { setSearchTerm(''); setSelectedFormat('ALL'); }}
                style={{
                  padding: '6px 14px',
                  borderRadius: 6,
                  background: 'rgba(56, 189, 248, 0.2)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  color: '#38bdf8',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                검색/필터 초기화
              </button>
            </div>
          ) : (
            paginatedReadings.map((reading) => {
              const isSelected = reading.id === currentReading.id;
              const fInfo = getFormatBadge(reading.format);
              return (
                <div
                  key={reading.id}
                  onClick={() => {
                    stopAudio();
                    setIsPlaying(false);
                    setActiveReadingId(reading.id);
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
                    borderColor: isSelected ? 'rgba(56, 189, 248, 0.6)' : 'var(--border-card)',
                    background: isSelected ? 'rgba(56, 189, 248, 0.12)' : 'var(--bg-card)',
                    boxShadow: isSelected ? '0 4px 16px rgba(56, 189, 248, 0.15)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span className={`badge-jlpt ${getJlptClass(reading.jlpt)}`}>
                        {reading.jlpt}
                      </span>
                      <span style={{
                        fontSize: '0.68rem',
                        padding: '1px 6px',
                        borderRadius: 4,
                        background: fInfo.bg,
                        color: fInfo.color,
                        fontWeight: 600,
                      }}>
                        {fInfo.label}
                      </span>
                    </div>
                    <ChevronRight size={15} color={isSelected ? '#38bdf8' : '#64748b'} />
                  </div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: isSelected ? '#ffffff' : '#e2e8f0', marginBottom: 4 }}>
                    {reading.title}
                  </h4>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                    #{reading.topicTag}
                  </div>
                </div>
              );
            })
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 10 }}>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                style={{
                  padding: '6px 10px',
                  borderRadius: 6,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: safePage === 1 ? '#475569' : '#e2e8f0',
                  cursor: safePage === 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: '0.78rem'
                }}
              >
                <ChevronLeft size={14} /> 이전
              </button>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                {safePage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                style={{
                  padding: '6px 10px',
                  borderRadius: 6,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: safePage === totalPages ? '#475569' : '#e2e8f0',
                  cursor: safePage === totalPages ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: '0.78rem'
                }}
              >
                다음 <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Main Reading Content */}
        <div ref={detailRef} className="glass-card mobile-compact-p" style={{ padding: 28 }}>
          {/* Passage Header */}
          <div style={{
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingBottom: 18,
            marginBottom: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span className={`badge-jlpt ${getJlptClass(currentReading.jlpt)}`}>
                JLPT {currentReading.jlpt}
              </span>
              <span style={{
                fontSize: '0.75rem',
                padding: '2px 8px',
                borderRadius: 999,
                background: formatInfo.bg,
                color: formatInfo.color,
                fontWeight: 600,
              }}>
                {formatInfo.label}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                #{currentReading.topicTag}
              </span>
            </div>

            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#f8fafc', marginBottom: 8 }}>
              {currentReading.title}
            </h3>

            <div style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'flex', gap: 12 }}>
              {currentReading.author && <span>작성자: {currentReading.author}</span>}
              {currentReading.authorHandle && <span style={{ color: '#38bdf8' }}>{currentReading.authorHandle}</span>}
              {currentReading.timestamp && <span>· {currentReading.timestamp}</span>}
            </div>
          </div>

          {/* Passage Body: Sentences */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
            {currentReading.sentences.map((sent, sIdx) => {
              return (
                <div
                  key={sIdx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: 12,
                    padding: '14px 18px',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)')}
                >
                  {/* Japanese Sentence Header with Audio Button */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{
                      fontSize: '1.08rem',
                      lineHeight: '1.9',
                      fontWeight: 500,
                      color: '#f8fafc',
                      flex: 1,
                    }}>
                      {renderSentenceText(sent.ruby, sent.original)}
                    </div>
                    <button
                      onClick={() => playJapaneseAudio(sent.ruby)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: '0.75rem',
                        padding: 0,
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#38bdf8')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                      title="이 문장 듣기"
                    >
                      <Volume2 size={15} /> 듣기
                    </button>
                  </div>

                  {/* Korean Translation */}
                  {showTranslations && (
                    <div style={{
                      marginTop: 8,
                      paddingTop: 8,
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                      fontSize: '0.88rem',
                      color: '#94a3b8',
                      lineHeight: 1.5,
                    }}>
                      {sent.translation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cultural Insight Box */}
          {currentReading.culturalInsight && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(56, 189, 248, 0.08) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              borderRadius: 14,
              padding: 16,
              marginBottom: 24,
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#c084fc', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                💡 문화 & 독해 팁 (Cultural Insight)
              </div>
              <div style={{ fontSize: '0.86rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                {currentReading.culturalInsight}
              </div>
            </div>
          )}

          {/* Key Vocabulary Box */}
          {currentReading.vocabulary && currentReading.vocabulary.length > 0 && (
            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 12 }}>
                핵심 어휘 단어장 ({currentReading.vocabulary.length}개)
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
                {currentReading.vocabulary.map((vocab) => (
                  <div
                    key={vocab.id}
                    onClick={() => onSelectWord(vocab)}
                    style={{
                      background: 'rgba(0, 0, 0, 0.25)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: 10,
                      padding: '10px 12px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.5)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)')}
                    title="클릭하여 단어장에 저장 / 상세 확인"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                        {vocab.word}
                      </span>
                      <span className={`badge-jlpt ${getJlptClass(vocab.jlpt)}`} style={{ fontSize: '0.65rem' }}>
                        {vocab.jlpt}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#38bdf8', marginBottom: 2 }}>
                      {vocab.reading}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                      {vocab.meaning}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Passage Navigation Bar */}
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
              onClick={handlePrevReading}
              disabled={!hasPrevReading}
              className="btn-secondary"
              style={{
                padding: '9px 18px',
                fontSize: '0.85rem',
                opacity: hasPrevReading ? 1 : 0.4,
                cursor: hasPrevReading ? 'pointer' : 'not-allowed',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                borderRadius: 10,
              }}
              title={hasPrevReading ? '이전 독해 지문으로 이동' : '첫 번째 지문입니다'}
            >
              <ChevronLeft size={16} />
              <span>이전 지문</span>
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
              <span>독해 지문</span>
              <span style={{ color: '#38bdf8', fontWeight: 700 }}>
                {currentReadingIndex !== -1 ? currentReadingIndex + 1 : 1}
              </span>
              <span>/</span>
              <span>{filteredReadings.length}</span>
            </div>

            <button
              onClick={handleNextReading}
              disabled={!hasNextReading}
              className="btn-primary"
              style={{
                padding: '9px 20px',
                fontSize: '0.85rem',
                opacity: hasNextReading ? 1 : 0.4,
                cursor: hasNextReading ? 'pointer' : 'not-allowed',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                borderRadius: 10,
              }}
              title={hasNextReading ? '다음 독해 지문으로 이동' : '마지막 지문입니다'}
            >
              <span>다음 지문</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
