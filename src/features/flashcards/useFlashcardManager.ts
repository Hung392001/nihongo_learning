import { useState, useCallback, useMemo } from 'react';
import { VocabularyItem, FlashcardMode, FlashcardState } from '../vocabulary/vocabulary';
import { createFlashcardContent, shuffleArray } from './flashcardHelpers';

interface UseFlashcardManagerOptions {
  vocabulary: VocabularyItem[];
  initialMode?: FlashcardMode;
  shuffled?: boolean;
}

interface UseFlashcardManagerReturn {
  state: FlashcardState;
  flip: () => void;
  next: () => void;
  previous: () => void;
  goToCard: (index: number) => void;
  changeMode: (mode: FlashcardMode) => void;
  shuffle: () => void;
  reset: () => void;
}

/**
 * Custom hook for managing flashcard state and operations
 * Handles flipping, navigation, mode switching, and shuffling
 */
export function useFlashcardManager({
  vocabulary,
  initialMode = FlashcardMode.VI_TO_HIRA,
  shuffled = false,
}: UseFlashcardManagerOptions): UseFlashcardManagerReturn {
  
  // Current mode
  const [mode, setMode] = useState<FlashcardMode>(initialMode);
  
  // Current card index
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Is card flipped?
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Shuffled vocabulary deck
  const [deck, setDeck] = useState<VocabularyItem[]>(() => 
    shuffled ? shuffleArray(vocabulary) : vocabulary
  );

  // Update deck when vocabulary changes
  useMemo(() => {
    setDeck(shuffled ? shuffleArray(vocabulary) : vocabulary);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [vocabulary, shuffled]);

  // Current flashcard content
  const currentContent = useMemo(() => {
    if (deck.length === 0) return null;
    const item = deck[currentIndex];
    return createFlashcardContent(item, mode);
  }, [deck, currentIndex, mode]);

  // Flashcard state
  const state: FlashcardState = useMemo(() => ({
    content: currentContent,
    isFlipped,
    mode,
    currentIndex,
    totalCards: deck.length,
  }), [currentContent, isFlipped, mode, currentIndex, deck.length]);

  /**
   * Flip the current card
   */
  const flip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  /**
   * Move to next card (resets flip state)
   */
  const next = useCallback(() => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  }, [currentIndex, deck.length]);

  /**
   * Move to previous card (resets flip state)
   */
  const previous = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  }, [currentIndex]);

  /**
   * Jump to specific card by index
   */
  const goToCard = useCallback((index: number) => {
    if (index >= 0 && index < deck.length) {
      setCurrentIndex(index);
      setIsFlipped(false);
    }
  }, [deck.length]);

  /**
   * Change learning mode (resets flip state)
   */
  const changeMode = useCallback((newMode: FlashcardMode) => {
    setMode(newMode);
    setIsFlipped(false);
  }, []);

  /**
   * Shuffle the deck
   */
  const shuffle = useCallback(() => {
    setDeck(shuffleArray(deck));
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [deck]);

  /**
   * Reset to initial state
   */
  const reset = useCallback(() => {
    setDeck(vocabulary);
    setCurrentIndex(0);
    setIsFlipped(false);
    setMode(initialMode);
  }, [vocabulary, initialMode]);

  return {
    state,
    flip,
    next,
    previous,
    goToCard,
    changeMode,
    shuffle,
    reset,
  };
}
