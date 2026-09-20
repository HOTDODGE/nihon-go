import React, { useState, useEffect } from 'react';
import type { JLPTLevel, WordItem } from './types';
import { Header } from './components/Header';
import { ConversationView } from './components/ConversationView';
import { ReadingView } from './components/ReadingView';
import { MemeArchiveView } from './components/MemeArchiveView';
import { RetroWordsView } from './components/RetroWordsView';
import { QuizView } from './components/QuizView';
import { SavedWordsView } from './components/SavedWordsView';
import { WordInspectorModal } from './components/WordInspectorModal';
import { VoiceSettingsModal } from './components/VoiceSettingsModal';

const INITIAL_SAVED_WORDS: WordItem[] = [
  { id: 'w1', word: '温める', reading: 'あたためる', meaning: '데우다 (도시락 필수 표현)', jlpt: 'N5', partOfSpeech: '동사' },
  { id: 'w21', word: 'とりあえず', reading: 'とりあえず', meaning: '우선, 일단 (이자카야 생맥 주문 공식)', jlpt: 'N3' },
  { id: 'rw11', word: '草 (くさ)', reading: 'くさ', meaning: 'ㅋㅋㅋ (웃음의 w에서 유래한 넷 슬랭)', jlpt: 'N3' },
  { id: 'rw19', word: 'テンプレ', reading: 'てんぷれ', meaning: '템플릿, 클리셰 (서브컬처 유행어)', jlpt: 'N2' },
];

export const App: React.FC = () => {
  // JLPT Level state (persisted)
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel>(() => {
    const saved = localStorage.getItem('nihongo_jlpt_level');
    return (saved as JLPTLevel) || 'ALL';
  });

  // Current Active Tab
  const [currentTab, setCurrentTab] = useState<'conversation' | 'reading' | 'memes' | 'retro' | 'quiz' | 'saved'>('conversation');

  // Saved Words list (persisted)
  const [savedWords, setSavedWords] = useState<WordItem[]>(() => {
    const saved = localStorage.getItem('nihongo_saved_words');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_SAVED_WORDS;
      }
    }
    return INITIAL_SAVED_WORDS;
  });

  // Active word for Modal Inspector
  const [inspectingWord, setInspectingWord] = useState<WordItem | null>(null);

  // Voice Settings Modal state
  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('nihongo_jlpt_level', selectedLevel);
  }, [selectedLevel]);

  useEffect(() => {
    localStorage.setItem('nihongo_saved_words', JSON.stringify(savedWords));
  }, [savedWords]);

  const handleToggleSaveWord = (word: WordItem) => {
    setSavedWords((prev) => {
      const exists = prev.some((w) => w.id === word.id || w.word === word.word);
      if (exists) {
        return prev.filter((w) => w.id !== word.id && w.word !== word.word);
      } else {
        return [...prev, word];
      }
    });
  };

  const handleRemoveSavedWord = (id: string) => {
    setSavedWords((prev) => prev.filter((w) => w.id !== id));
  };

  const isInspectingWordSaved = inspectingWord
    ? savedWords.some((w) => w.id === inspectingWord.id || w.word === inspectingWord.word)
    : false;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Global Navigation Header with JLPT Level Selector & Voice Settings */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        savedWordsCount={savedWords.length}
        onOpenVoiceSettings={() => setIsVoiceSettingsOpen(true)}
      />

      {/* Main Tab Content */}
      <main style={{ flex: 1, paddingBottom: 60 }}>
        {currentTab === 'conversation' && (
          <ConversationView
            selectedLevel={selectedLevel}
            onSelectWord={(w) => setInspectingWord(w)}
          />
        )}
        {currentTab === 'reading' && (
          <ReadingView
            selectedLevel={selectedLevel}
            onSelectWord={(w) => setInspectingWord(w)}
          />
        )}
        {currentTab === 'memes' && (
          <MemeArchiveView selectedLevel={selectedLevel} />
        )}
        {currentTab === 'retro' && (
          <RetroWordsView selectedLevel={selectedLevel} />
        )}
        {currentTab === 'quiz' && (
          <QuizView selectedLevel={selectedLevel} />
        )}
        {currentTab === 'saved' && (
          <SavedWordsView
            savedWords={savedWords}
            onRemoveWord={handleRemoveSavedWord}
            selectedLevel={selectedLevel}
          />
        )}
      </main>

      {/* Word Inspector Modal */}
      <WordInspectorModal
        word={inspectingWord}
        onClose={() => setInspectingWord(null)}
        isSaved={isInspectingWordSaved}
        onToggleSave={handleToggleSaveWord}
      />

      {/* Japanese Voice/TTS Settings Modal */}
      <VoiceSettingsModal
        isOpen={isVoiceSettingsOpen}
        onClose={() => setIsVoiceSettingsOpen(false)}
      />

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '24px 16px',
        color: '#64748b',
        fontSize: '0.8rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        background: 'rgba(11, 15, 25, 0.95)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <strong>NihonGo! (日本語 リアル & レトロ)</strong> — 일본어 회화·독해 & 인터넷 밈·사어 학습 플랫폼
          </div>
          <div>
            JLPT N5~N1 난이도 필터링 및 Web Speech API 지원
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
