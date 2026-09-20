import React, { useState, useEffect } from 'react';
import type { JLPTLevel } from '../types';
import { Sparkles, MessageSquare, BookOpen, Flame, History, Bookmark, Award, Smartphone, Maximize2, Minimize2 } from 'lucide-react';
import { MobileAccessModal } from './MobileAccessModal';

interface HeaderProps {
  currentTab: 'conversation' | 'reading' | 'memes' | 'retro' | 'quiz' | 'saved';
  setCurrentTab: (tab: 'conversation' | 'reading' | 'memes' | 'retro' | 'quiz' | 'saved') => void;
  selectedLevel: JLPTLevel;
  setSelectedLevel: (level: JLPTLevel) => void;
  savedWordsCount: number;
  onOpenVoiceSettings: () => void;
}

const JLPT_LEVELS: { level: JLPTLevel; label: string; desc: string }[] = [
  { level: 'ALL', label: '전체 (ALL)', desc: '모든 난이도 노출' },
  { level: 'N5', label: 'N5 (입문)', desc: '기초 회화·쉬운 한자' },
  { level: 'N4', label: 'N4 (초급)', desc: '일상 표현·기본 여행' },
  { level: 'N3', label: 'N3 (중급)', desc: '이자카야·SNS 트렌드' },
  { level: 'N2', label: 'N2 (상급)', desc: '비즈니스·심층 서브컬처' },
  { level: 'N1', label: 'N1 (고급)', desc: '원어민급 토론·문화비평' },
];

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  selectedLevel,
  setSelectedLevel,
  savedWordsCount,
  onOpenVoiceSettings,
}) => {
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn('전체화면 모드 전환 실패:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => {
          console.warn('전체화면 종료 실패:', err);
        });
      }
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(11, 15, 25, 0.88)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-card)',
      padding: '12px 16px',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12
      }}>
        {/* Logo and Tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #f43f5e 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(244, 63, 94, 0.4)',
            flexShrink: 0
          }}>
            <Sparkles size={20} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <h1 style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(90deg, #ffffff 0%, #cbd5e1 50%, #f43f5e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                NihonGo!
              </h1>
              <span style={{
                fontSize: '0.65rem',
                padding: '2px 6px',
                borderRadius: 6,
                background: 'rgba(139, 92, 246, 0.2)',
                color: '#c084fc',
                fontWeight: 700,
                border: '1px solid rgba(139, 92, 246, 0.3)'
              }}>
                リアル & レトロ
              </span>
            </div>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
              실전 회화·독해 & 인터넷 밈·사어(死語) 마스터
            </p>
          </div>
        </div>

        {/* Right Controls: JLPT Filter + Mobile Connect + Voice Settings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {/* Mobile Connect Button */}
          <button
            onClick={() => setIsMobileModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 10px',
              borderRadius: 10,
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              color: '#34d399',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            title="스마트폰 카메라로 비춰서 바로 열기 (QR코드 및 모바일 주소)"
          >
            <Smartphone size={15} />
            <span>핸드폰 접속</span>
          </button>

          {/* Voice Settings Button */}
          <button
            onClick={onOpenVoiceSettings}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 10px',
              borderRadius: 10,
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38bdf8',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            title="TTS 음성 설정 및 목소리 선택"
          >
            <span style={{ fontSize: '0.85rem' }}>🔊</span>
            <span>음성</span>
          </button>

          {/* Fullscreen Toggle Button (창 모드 / 상단 바 없는 전체화면 전환) */}
          <button
            onClick={toggleFullscreen}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 10px',
              borderRadius: 10,
              background: isFullscreen ? 'rgba(168, 85, 247, 0.22)' : 'rgba(255, 255, 255, 0.08)',
              border: isFullscreen ? '1px solid rgba(168, 85, 247, 0.5)' : '1px solid rgba(255, 255, 255, 0.15)',
              color: isFullscreen ? '#c084fc' : '#e2e8f0',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            title={isFullscreen ? "창 모드로 복귀 (단축키: ESC 또는 F11)" : "상단 창 틀 없애기 (전체화면 모드 / 단축키: F11)"}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            <span>{isFullscreen ? '창모드' : '전체화면'}</span>
          </button>

          {/* Global JLPT Filter Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: 'rgba(21, 29, 48, 0.8)',
            padding: '3px 6px',
            borderRadius: 10,
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}>
            <div style={{ display: 'flex', gap: 3 }}>
              {JLPT_LEVELS.map(({ level, label }) => {
                const isSelected = selectedLevel === level;
                return (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    style={{
                      padding: '3px 8px',
                      fontSize: '0.74rem',
                      fontWeight: isSelected ? 700 : 500,
                      borderRadius: 6,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      background: isSelected
                        ? level === 'ALL'
                          ? 'rgba(255, 255, 255, 0.2)'
                          : level === 'N5' ? '#0284c7'
                          : level === 'N4' ? '#d97706'
                          : level === 'N3' ? '#059669'
                          : level === 'N2' ? '#2563eb'
                          : '#7c3aed'
                        : 'transparent',
                      color: isSelected ? '#ffffff' : '#94a3b8',
                      boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
                    }}
                    title={label}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div
        className="no-scrollbar"
        style={{
          maxWidth: 1200,
          margin: '10px auto 0',
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
          paddingBottom: 4,
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {[
          { id: 'conversation', label: '실전 회화', icon: MessageSquare, badge: null },
          { id: 'reading', label: '독해 라운지', icon: BookOpen, badge: null },
          { id: 'memes', label: '넷 밈 & 슬랭', icon: Flame, badge: 'HOT' },
          { id: 'retro', label: '사어(死語) 연구소', icon: History, badge: '레트로' },
          { id: 'quiz', label: '실전 퀴즈', icon: Award, badge: null },
          { id: 'saved', label: '내 단어장', icon: Bookmark, count: savedWordsCount },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id as any)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: 10,
                fontSize: '0.88rem',
                fontWeight: isActive ? 700 : 500,
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.18s ease',
                background: isActive
                  ? 'rgba(139, 92, 246, 0.2)'
                  : 'transparent',
                color: isActive ? '#c084fc' : '#94a3b8',
                borderBottom: isActive ? '2px solid #a855f7' : '2px solid transparent',
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span style={{
                  fontSize: '0.65rem',
                  padding: '1px 6px',
                  borderRadius: 4,
                  fontWeight: 700,
                  background: tab.badge === 'HOT' ? 'rgba(244, 63, 94, 0.25)' : 'rgba(245, 158, 11, 0.25)',
                  color: tab.badge === 'HOT' ? '#fb7185' : '#fbbf24',
                }}>
                  {tab.badge}
                </span>
              )}
              {typeof tab.count === 'number' && tab.count > 0 && (
                <span style={{
                  fontSize: '0.7rem',
                  padding: '1px 6px',
                  borderRadius: 999,
                  fontWeight: 700,
                  background: 'rgba(99, 102, 241, 0.3)',
                  color: '#a5b4fc',
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile Connection Modal */}
      <MobileAccessModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
      />
    </header>
  );
};

