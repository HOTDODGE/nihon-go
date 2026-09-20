import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Smartphone, X, Copy, Check, Wifi, Edit3, CheckCheck } from 'lucide-react';

interface MobileAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_IP_KEY = 'nihongo_local_network_ip';

export const MobileAccessModal: React.FC<MobileAccessModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isEditingIp, setIsEditingIp] = useState(false);

  // 로컬 IP 주소 상태 (사용자 수정 가능 & 영구 저장)
  const [localIp, setLocalIp] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_IP_KEY);
      if (saved && saved !== '192.168.219.104') return saved;
      if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        return window.location.hostname;
      }
    } catch {
      // Fallback
    }
    return '192.168.219.103';
  });

  const [inputIp, setInputIp] = useState(localIp);

  if (!isOpen) return null;

  const mobileUrl = `http://${localIp}:5173/`;
  // 에러 복원율 M, 240x240 해상도로 카메라 인식률 극대화
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(mobileUrl)}&margin=10&ecc=M`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(mobileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };

  const handleSaveIp = () => {
    const cleaned = inputIp.trim().replace(/^https?:\/\//, '').replace(/:5173\/?$/, '').replace(/\/$/, '');
    if (cleaned) {
      setLocalIp(cleaned);
      localStorage.setItem(STORAGE_IP_KEY, cleaned);
    }
    setIsEditingIp(false);
  };

  const modalContent = (
    <div
      onClick={onClose}
      className="nihon-modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        background: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        overflowY: 'auto',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-card nihon-modal-card animate-fade-in"
        style={{
          background: '#12192c',
          border: '1px solid rgba(168, 85, 247, 0.35)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(168, 85, 247, 0.15)',
          padding: '22px 24px',
          width: '100%',
          maxWidth: 430,
          margin: 'auto',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: 20,
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Smartphone size={20} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                핸드폰으로 접속하기
              </h3>
              <p style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                스마트폰 카메라로 QR 코드를 비추면 즉시 열립니다
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
            <X size={18} />
          </button>
        </div>

        {/* QR Code Container */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 16,
          padding: '16px 12px',
          textAlign: 'center',
          marginBottom: 14,
        }}>
          <div style={{
            display: 'inline-block',
            padding: 12,
            background: '#ffffff',
            borderRadius: 14,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            marginBottom: 10,
          }}>
            <img
              src={qrCodeUrl}
              alt="QR Code"
              style={{ width: 160, height: 160, display: 'block', borderRadius: 4 }}
            />
          </div>
          <div style={{ fontSize: '0.8rem', color: '#e2e8f0', fontWeight: 600 }}>
            카메라 앱을 열어 위 QR 코드를 비춰주세요
          </div>
        </div>

        {/* Direct URL Box with Edit Button */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: 12,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '12px 14px',
          marginBottom: 12,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>
              스마트폰 직접 접속 주소:
            </span>
            <button
              onClick={() => {
                if (isEditingIp) {
                  handleSaveIp();
                } else {
                  setInputIp(localIp);
                  setIsEditingIp(true);
                }
              }}
              style={{
                background: 'none',
                border: 'none',
                color: isEditingIp ? '#10b981' : '#38bdf8',
                fontSize: '0.72rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: 0,
              }}
            >
              {isEditingIp ? <CheckCheck size={13} /> : <Edit3 size={13} />}
              {isEditingIp ? '저장' : '내 IP 수정'}
            </button>
          </div>

          {isEditingIp ? (
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              <input
                type="text"
                value={inputIp}
                onChange={(e) => setInputIp(e.target.value)}
                placeholder="예: 192.168.0.15"
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid #38bdf8',
                  borderRadius: 6,
                  padding: '6px 10px',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  fontFamily: 'monospace',
                }}
                autoFocus
              />
              <button
                onClick={handleSaveIp}
                className="btn-primary"
                style={{ padding: '6px 12px', fontSize: '0.78rem' }}
              >
                적용
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <div style={{
                fontSize: '0.96rem',
                fontWeight: 700,
                color: '#38bdf8',
                fontFamily: 'monospace',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {mobileUrl}
              </div>
              <button
                onClick={handleCopy}
                className="btn-secondary"
                style={{
                  padding: '5px 10px',
                  fontSize: '0.76rem',
                  gap: 4,
                  flexShrink: 0,
                  background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                  borderColor: copied ? '#10b981' : 'rgba(255, 255, 255, 0.15)',
                  color: copied ? '#34d399' : '#f8fafc',
                }}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? '복사됨' : '복사'}
              </button>
            </div>
          )}
        </div>

        {/* Requirements Warning Box */}
        <div style={{
          background: 'rgba(245, 158, 11, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          borderRadius: 10,
          padding: '10px 12px',
          fontSize: '0.74rem',
          color: '#fbbf24',
          lineHeight: 1.45,
          marginBottom: 10,
        }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <Wifi size={16} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <strong>접속 체크:</strong> 스마트폰과 PC가 <strong>동일한 Wi-Fi(공유기)</strong>에 연결되어 있어야 열립니다.
            </div>
          </div>
        </div>

        {/* Smartphone App Installation Guide Box */}
        <div style={{
          background: 'rgba(99, 102, 241, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.35)',
          borderRadius: 10,
          padding: '10px 12px',
          fontSize: '0.74rem',
          color: '#c7d2fe',
          lineHeight: 1.5,
          marginBottom: 14,
        }}>
          <div style={{ fontWeight: 700, color: '#a5b4fc', marginBottom: 4 }}>
            📱 스마트폰에 전체화면 앱으로 설치하는 법:
          </div>
          <div>
            • <strong>크롬(Chrome)</strong>: 우측 상단 <strong>⋮</strong> ➡️ <strong>[홈 화면에 추가]</strong><br/>
            • <strong>삼성 인터넷</strong>: 우측 하단 <strong>≡</strong> ➡️ <strong>[현재 페이지 추가]</strong> ➡️ <strong>[홈 화면]</strong><br/>
            • <strong>아이폰(Safari)</strong>: 하단 공유(네모+화살표) ➡️ <strong>[홈 화면에 추가]</strong>
          </div>
          <div style={{ marginTop: 4, color: '#94a3b8', fontSize: '0.68rem' }}>
            * '홈 화면에 추가'를 누르면 주소창 없는 깔끔한 전체화면 앱으로 설치됩니다.
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
        >
          닫기
        </button>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};
