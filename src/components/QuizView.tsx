import React, { useState, useEffect, useMemo } from 'react';
import type { JLPTLevel, QuizQuestion } from '../types';
import { QUIZZES } from '../data/quizzes';
import { Award, CheckCircle2, XCircle, RotateCcw, ChevronRight, HelpCircle, Shuffle, Volume2, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playJapaneseAudio } from '../utils/speech';

interface QuizViewProps {
  selectedLevel: JLPTLevel;
}

interface AnswerHistory {
  question: QuizQuestion;
  selectedOption: number;
  isCorrect: boolean;
}

const SESSION_SIZE = 10; // 1회 세션당 10문제

export const QuizView: React.FC<QuizViewProps> = ({ selectedLevel }) => {
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'meme' | 'retro' | 'dialogue' | 'reading'>('ALL');
  const [sessionCount, setSessionCount] = useState(1);

  // 전체 풀 필터링
  const availablePool = useMemo(() => {
    return QUIZZES.filter(q => {
      const matchesLevel = selectedLevel === 'ALL' || !q.jlpt || q.jlpt === selectedLevel;
      const matchesCategory = categoryFilter === 'ALL' || q.category === categoryFilter;
      return matchesLevel && matchesCategory;
    });
  }, [selectedLevel, categoryFilter]);

  // 10문제 무작위 세션 샘플링
  const [sessionQuestions, setSessionQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [history, setHistory] = useState<AnswerHistory[]>([]);
  const [showReview, setShowReview] = useState(false);

  // 새 세션 문제 추출 함수
  const generateNewSession = () => {
    if (availablePool.length === 0) {
      setSessionQuestions([]);
      return;
    }
    // Fisher-Yates 무작위 셔플 후 최대 10개 선택
    const shuffled = [...availablePool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(SESSION_SIZE, shuffled.length));

    setSessionQuestions(selected);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowSummary(false);
    setHistory([]);
    setShowReview(false);
  };

  // 레벨이나 카테고리가 변경되거나 컴포넌트 마운트 시 새 세션 생성
  useEffect(() => {
    generateNewSession();
  }, [availablePool]);

  const currentQuiz = sessionQuestions[currentIndex] || sessionQuestions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered || !currentQuiz) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQuiz.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    setHistory(prev => [
      ...prev,
      {
        question: currentQuiz,
        selectedOption: idx,
        isCorrect,
      }
    ]);
  };

  const handleNext = () => {
    if (currentIndex + 1 < sessionQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowSummary(true);
    }
  };

  const handleRestartSameSession = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowSummary(false);
    setHistory([]);
    setShowReview(false);
  };

  const handleNew10Session = () => {
    setSessionCount(prev => prev + 1);
    generateNewSession();
  };

  const getJlptClass = (level?: string) => {
    switch (level) {
      case 'N1': return 'badge-n1';
      case 'N2': return 'badge-n2';
      case 'N3': return 'badge-n3';
      case 'N4': return 'badge-n4';
      case 'N5': return 'badge-n5';
      default: return 'badge-all';
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'meme': return '넷 밈 & 슬랭';
      case 'retro': return '사어(死語) 연구소';
      case 'dialogue': return '실전 회화';
      case 'reading': return '독해 & 관용구';
      default: return '전체';
    }
  };

  const incorrectAnswers = history.filter(h => !h.isCorrect);

  if (availablePool.length === 0) {
    return (
      <div style={{ maxWidth: 840, margin: '40px auto', padding: '0 16px' }}>
        <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
          <HelpCircle size={48} color="#94a3b8" style={{ marginBottom: 16 }} />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 8 }}>
            선택한 조건의 퀴즈가 없습니다
          </h3>
          <p style={{ color: '#94a3b8', marginBottom: 20 }}>
            헤더의 JLPT 난이도를 '전체(ALL)'로 변경하거나 다른 카테고리를 선택해보세요!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 840, margin: '24px auto', padding: '0 16px' }}>
      {/* Title Header */}
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <span style={{
            fontSize: '0.82rem',
            fontWeight: 700,
            background: 'linear-gradient(90deg, #c084fc, #38bdf8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}>
            10-QUESTION DAILY CHALLENGE
          </span>
          {selectedLevel !== 'ALL' && (
            <span className={`badge-jlpt ${getJlptClass(selectedLevel)}`}>
              필터: {selectedLevel}
            </span>
          )}
        </div>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#f8fafc' }}>
          실전 10문제 모의고사 (세션 #{sessionCount})
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          전체 <strong>{availablePool.length}문제</strong> 풀에서 매회 새로운 <strong>10문제</strong>를 무작위로 엄선하여 출제합니다.
        </p>
      </div>

      {/* Category Pills & Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 20
      }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[
            { id: 'ALL', label: `전체 (${QUIZZES.length})` },
            { id: 'dialogue', label: '실전 회화' },
            { id: 'meme', label: '넷 밈' },
            { id: 'retro', label: '사어(死語)' },
            { id: 'reading', label: '독해·관용어' },
          ].map(cat => {
            const isActive = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id as any)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 999,
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 700 : 500,
                  border: 'none',
                  cursor: 'pointer',
                  background: isActive ? 'linear-gradient(135deg, #a855f7, #6366f1)' : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNew10Session}
          className="btn-secondary"
          style={{ fontSize: '0.8rem', padding: '6px 14px', background: 'rgba(56, 189, 248, 0.12)', borderColor: 'rgba(56, 189, 248, 0.3)', color: '#38bdf8' }}
          title="새로운 10문제 무작위로 다시 뽑기"
        >
          <Shuffle size={14} />
          새로운 10문제 뽑기
        </button>
      </div>

      {!showSummary && currentQuiz ? (
        <div className="glass-card" style={{ padding: 32 }}>
          {/* Progress Bar and Indicator */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {currentQuiz.jlpt && (
                  <span className={`badge-jlpt ${getJlptClass(currentQuiz.jlpt)}`}>
                    JLPT {currentQuiz.jlpt}
                  </span>
                )}
                <span style={{
                  fontSize: '0.75rem',
                  padding: '2px 8px',
                  borderRadius: 999,
                  background: 'rgba(139, 92, 246, 0.2)',
                  color: '#c084fc',
                  fontWeight: 600,
                }}>
                  {getCategoryLabel(currentQuiz.category)}
                </span>
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#38bdf8' }}>
                Question {currentIndex + 1} / {sessionQuestions.length}
              </div>
            </div>

            {/* Visual Step Progress Bar */}
            <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${((currentIndex + 1) / sessionQuestions.length) * 100}%`,
                background: 'linear-gradient(90deg, #a855f7 0%, #38bdf8 100%)',
                transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }} />
            </div>
          </div>

          {/* Context Snippet */}
          {currentQuiz.contextSnippet && (
            <div style={{
              background: 'rgba(0, 0, 0, 0.35)',
              padding: '12px 16px',
              borderRadius: 10,
              border: '1px solid rgba(255, 255, 255, 0.06)',
              marginBottom: 16,
              fontSize: '0.95rem',
              color: '#38bdf8',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span>{currentQuiz.contextSnippet}</span>
              {currentQuiz.contextSnippet.includes('「') && (
                <button
                  onClick={() => playJapaneseAudio(currentQuiz.contextSnippet || '')}
                  title="예문 발음 듣기"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#38bdf8',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: '0.75rem',
                    padding: '2px 6px',
                    borderRadius: 4,
                  }}
                >
                  <Volume2 size={15} /> 듣기
                </button>
              )}
            </div>
          )}

          {/* Question Text */}
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: 24, lineHeight: 1.5 }}>
            {currentQuiz.question}
          </h3>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {currentQuiz.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuiz.correctIndex;

              let optionBg = 'rgba(255, 255, 255, 0.04)';
              let borderColor = 'rgba(255, 255, 255, 0.08)';
              let textColor = '#e2e8f0';

              if (isAnswered) {
                if (isCorrect) {
                  optionBg = 'rgba(16, 185, 129, 0.15)';
                  borderColor = 'rgba(16, 185, 129, 0.5)';
                  textColor = '#34d399';
                } else if (isSelected && !isCorrect) {
                  optionBg = 'rgba(244, 63, 94, 0.15)';
                  borderColor = 'rgba(244, 63, 94, 0.5)';
                  textColor = '#fb7185';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 20px',
                    borderRadius: 12,
                    background: optionBg,
                    border: `1px solid ${borderColor}`,
                    color: textColor,
                    fontSize: '0.95rem',
                    fontWeight: isSelected || (isAnswered && isCorrect) ? 700 : 500,
                    cursor: isAnswered ? 'default' : 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{idx + 1}. {option}</span>
                  {isAnswered && (
                    <span>
                      {isCorrect && <CheckCircle2 size={20} color="#10b981" />}
                      {isSelected && !isCorrect && <XCircle size={20} color="#f43f5e" />}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="animate-fade-in" style={{
              background: selectedOption === currentQuiz.correctIndex ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
              border: `1px solid ${selectedOption === currentQuiz.correctIndex ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
              borderRadius: 12,
              padding: 16,
              marginBottom: 20,
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontWeight: 700,
                fontSize: '0.9rem',
                color: selectedOption === currentQuiz.correctIndex ? '#34d399' : '#fb7185',
                marginBottom: 6,
              }}>
                {selectedOption === currentQuiz.correctIndex ? (
                  <>
                    <CheckCircle2 size={16} /> 정답입니다! 멋져요!
                  </>
                ) : (
                  <>
                    <XCircle size={16} /> 아쉽네요! 오답입니다.
                  </>
                )}
              </div>
              <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                {currentQuiz.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={handleNext}
                className="btn-primary"
                style={{ padding: '10px 24px', fontSize: '0.95rem' }}
              >
                <span>{currentIndex + 1 < sessionQuestions.length ? '다음 문제 (Next)' : '결과 보기 (Result)'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Summary Card */
        <div className="glass-card animate-fade-in" style={{ padding: 40, textAlign: 'center' }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
          }}>
            <Award size={36} color="#ffffff" />
          </div>

          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginBottom: 8 }}>
            10문제 모의고사 완주!
          </h3>
          <p style={{ color: '#94a3b8', marginBottom: 20 }}>
            총 {sessionQuestions.length}문제 중 <strong style={{ color: '#34d399' }}>{score}문제</strong>를 맞히셨습니다.
          </p>

          <div style={{
            fontSize: '2.8rem',
            fontWeight: 800,
            color: score >= 8 ? '#34d399' : score >= 6 ? '#38bdf8' : '#f59e0b',
            marginBottom: 24,
          }}>
            {Math.round((score / sessionQuestions.length) * 100)}점
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <button
              onClick={handleNew10Session}
              className="btn-primary"
              style={{ padding: '12px 28px', fontSize: '1rem' }}
            >
              <Shuffle size={18} />
              새로운 10문제 풀기
            </button>
            <button
              onClick={handleRestartSameSession}
              className="btn-secondary"
              style={{ padding: '12px 24px', fontSize: '0.95rem' }}
            >
              <RotateCcw size={16} />
              현재 10문제 다시 풀기
            </button>
            {incorrectAnswers.length > 0 && (
              <button
                onClick={() => setShowReview(!showReview)}
                className="btn-secondary"
                style={{ padding: '12px 24px', fontSize: '0.95rem', borderColor: 'rgba(244, 63, 94, 0.4)', color: '#fb7185' }}
              >
                <BookOpen size={16} />
                오답 노트 ({incorrectAnswers.length}개) {showReview ? '닫기' : '보기'}
              </button>
            )}
          </div>

          {/* Incorrect Answers Review Section */}
          {showReview && incorrectAnswers.length > 0 && (
            <div className="animate-fade-in" style={{
              textAlign: 'left',
              marginTop: 24,
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: 24,
            }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fb7185', marginBottom: 16 }}>
                📝 틀린 문제 오답 노트 ({incorrectAnswers.length}개)
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {incorrectAnswers.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(244, 63, 94, 0.08)',
                      border: '1px solid rgba(244, 63, 94, 0.25)',
                      borderRadius: 12,
                      padding: 18,
                    }}
                  >
                    <div style={{ fontSize: '0.78rem', color: '#f43f5e', fontWeight: 700, marginBottom: 4 }}>
                      문제 {idx + 1}
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>
                      {item.question.question}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#fb7185', marginBottom: 4 }}>
                      ❌ 내가 고른 답: {item.question.options[item.selectedOption]}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#34d399', fontWeight: 700, marginBottom: 8 }}>
                      ⭕ 정답: {item.question.options[item.question.correctIndex]}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.4, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 6 }}>
                      💡 {item.question.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
