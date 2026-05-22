import { useEffect, useState, useCallback, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { FlashcardMode } from "./types/vocabulary";
import { IVocabularyStorage } from "./services/IVocabularyStorage";
import { ApiVocabularyStorage, apiStorage } from "./services/ApiVocabularyStorage";
import { useVocabulary } from "./hooks/useVocabulary";
import { useFlashcardManager } from "./hooks/useFlashcardManager";
import { getAvailableModes, calculateStatistics } from "./utils/flashcardHelpers";
import { Flashcard } from "./components/Flashcard";
import { FlashcardControls } from "./components/FlashcardControls";
import { ModeSelector } from "./components/ModeSelector";
import { VocabularyTable } from "./components/VocabularyTable";
import { VocabularyManager } from "./components/VocabularyManager";
import { StatisticsPanel } from "./components/StatisticsPanel";
import { Home } from "./components/Home";
import { Navigation } from "./components/Navigation";
import { Grammar } from "./components/Grammar";
import { Kanji } from "./components/Kanji";
import { UnitSelector } from "./components/UnitSelector";
import { CustomListModal } from "./components/CustomListModal";
import { FlashcardDeckModal } from "./components/FlashcardDeckModal";
import { QuickAddWordModal } from "./components/QuickAddWordModal";
import { LocalStorageFlashcardStorage } from "./services/LocalStorageFlashcardStorage";
import { useFlashcards } from "./hooks/useFlashcards";
import type { CreateFlashcardDto, FlashcardItem } from "./types/flashcard";
import type { CustomList, ListItem } from "./types/vocabulary";
// Dynamic Vocabulary imports
import { UnitList } from "./components/DynamicVocabulary/UnitList";
import { UnitDetail } from "./components/DynamicVocabulary/UnitDetail";
import "./App.css";

// Helper component to sync route with page state
function usePageFromRoute() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<string>("home");
  const navigate = useNavigate();

  // Determine current page from route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setCurrentPage("home");
    } else if (path === "/flashcards") {
      setCurrentPage("flashcards");
    } else if (path === "/vocabulary") {
      setCurrentPage("vocabulary");
    } else if (path.startsWith("/vocabulary/units")) {
      setCurrentPage("dynamic-vocabulary");
    } else if (path === "/alphabet") {
      setCurrentPage("alphabet");
    } else if (path === "/grammar") {
      setCurrentPage("grammar");
    } else if (path === "/kanji") {
      setCurrentPage("kanji");
    }
  }, [location.pathname]);

  // Navigation handler
  const handleNavigate = (page: string) => {
    if (page === "home") navigate("/");
    else if (page === "flashcards") navigate("/flashcards");
    else if (page === "vocabulary") navigate("/vocabulary");
    else if (page === "alphabet") navigate("/alphabet");
    else if (page === "grammar") navigate("/grammar");
    else if (page === "kanji") navigate("/kanji");
    else if (page === "dynamic-vocabulary") navigate("/vocabulary/units");
  };

  return { currentPage, handleNavigate };
}

// Main App Component
function AppContent() {
  const location = useLocation();
  const { currentPage, handleNavigate } = usePageFromRoute();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoPlaySpeed] = useState(3000);
  const [showStats] = useState(false);
  const [selectedFlashcardUnit, setSelectedFlashcardUnit] = useState<number | "all" | string>("all");
  const [selectedVocabularyUnit, setSelectedVocabularyUnit] = useState<number | "all" | string>("all");
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [storage, setStorage] = useState<IVocabularyStorage | null>(null);
  const [flashcardStorage] = useState<LocalStorageFlashcardStorage>(new LocalStorageFlashcardStorage());
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [isQuickAddWordOpen, setIsQuickAddWordOpen] = useState(false);
  const [isAddingWord, setIsAddingWord] = useState(false);
  const [customLists, setCustomLists] = useState<CustomList[]>([]);
  const [listVocabularyMap, setListVocabularyMap] = useState<Map<string, any[]>>(new Map());
  const [listItemsMap, setListItemsMap] = useState<Map<string, ListItem[]>>(new Map());

  // Initialize storage on mount
  useEffect(() => {
    const initStorage = async () => {
      try {
        const isApiAvailable = await ApiVocabularyStorage.isSupported();
        if (isApiAvailable) {
          console.log("🔗 Using PostgreSQL");
          setStorage(apiStorage);
          return;
        }
      } catch {}
      console.error("❌ PostgreSQL API is not available. Please start the backend server.");
      setStorage(null);
    };
    initStorage();
  }, []);

  // Apply dark mode
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Vocabulary management
  const { vocabulary, loading, error, create, update, remove, refresh } = useVocabulary(storage);

  // Flashcard management
  const {
    flashcards,
    decks,
    deckItems,
    createFlashcard,
    updateFlashcard,
    deleteFlashcard,
    createDeck,
    updateDeck,
    deleteDeck,
    addToDeck,
    removeFromDeck,
    exportDeck,
    importDeck,
  } = useFlashcards(flashcardStorage);

  // Custom lists management
  const loadCustomLists = useCallback(async () => {
    if (!storage) return;
    try {
      const lists = await (storage as any).getAllCustomLists?.();
      if (lists) {
        setCustomLists(lists);
        const vocabMap = new Map<string, any[]>();
        const itemsMap = new Map<string, ListItem[]>();
        for (const list of lists) {
          const vocabInList = await (storage as any).getVocabularyInList?.(list.id);
          const listItems = await (storage as any).getListItems?.(list.id);
          if (vocabInList) vocabMap.set(list.id, vocabInList);
          if (listItems) itemsMap.set(list.id, listItems);
        }
        setListVocabularyMap(vocabMap);
        setListItemsMap(itemsMap);
      }
    } catch (error) {
      console.error("Failed to load custom lists:", error);
    }
  }, [storage]);

  useEffect(() => {
    if (storage) loadCustomLists();
  }, [storage, loadCustomLists]);

  // Filter vocabulary for flashcards
  const flashcardVocabulary = useMemo(() => {
    if (!storage) return [];
    if (selectedDeckId) {
      const deckFlashcards = deckItems.get(selectedDeckId) || [];
      const flashcardsInDeck = deckFlashcards
        .map((item) => flashcards.find((f) => f.id === item.flashcardId))
        .filter((f): f is FlashcardItem => f !== undefined);
      return flashcardsInDeck.map((flashcard) => ({
        id: flashcard.id,
        vietnamese: flashcard.back,
        hiragana: flashcard.kana || flashcard.front,
        kanji: flashcard.front.includes(flashcard.kana || "") ? null : flashcard.front,
        romaji: undefined,
        category: undefined,
        tags: flashcard.tags,
        unit: undefined,
        difficulty: flashcard.difficulty,
        isFavorite: flashcard.isFavorite || false,
        note: flashcard.note,
        createdAt: flashcard.createdAt,
        updatedAt: flashcard.updatedAt,
      }));
    }
    if (selectedFlashcardUnit === "all") return vocabulary;
    if (typeof selectedFlashcardUnit === "string" && selectedFlashcardUnit !== "all") {
      return listVocabularyMap.get(selectedFlashcardUnit) || [];
    }
    return vocabulary.filter((v) => v.unit === selectedFlashcardUnit);
  }, [vocabulary, selectedFlashcardUnit, listVocabularyMap, storage, selectedDeckId, deckItems, flashcards]);

  // Filter vocabulary for management
  const managedVocabulary = useMemo(() => {
    if (!storage) return [];
    if (selectedVocabularyUnit === "all") return vocabulary;
    if (typeof selectedVocabularyUnit === "string" && selectedVocabularyUnit !== "all") {
      return listVocabularyMap.get(selectedVocabularyUnit) || [];
    }
    return vocabulary.filter((v) => v.unit === selectedVocabularyUnit);
  }, [vocabulary, selectedVocabularyUnit, listVocabularyMap, storage]);

  // Flashcard manager
  const { state, flip, next, previous, changeMode, shuffle, reset } = useFlashcardManager({
    vocabulary: flashcardVocabulary,
    initialMode: FlashcardMode.VI_TO_HIRA,
  });

  const availableModes = useMemo(() => getAvailableModes(vocabulary), [vocabulary]);
  const statistics = useMemo(() => calculateStatistics(vocabulary), [vocabulary]);

  useEffect(() => { reset(); }, [selectedFlashcardUnit, reset]);

  // Practice handlers
  const handleStartPractice = (unit: number | "all" | string) => {
    setSelectedFlashcardUnit(unit);
    setSelectedVocabularyUnit(unit);
    handleNavigate("flashcards");
  };

  const handleSaveToDeck = async () => {
    if (flashcardVocabulary.length === 0) return;
    const deckName = `Unit ${selectedFlashcardUnit === "all" ? "All" : selectedFlashcardUnit} - ${new Date().toLocaleDateString()}`;
    try {
      const newDeck = await createDeck({ name: deckName });
      for (const vocab of flashcardVocabulary) {
        const flashcard = await createFlashcard({
          front: vocab.kanji || vocab.hiragana,
          back: vocab.vietnamese,
          kana: vocab.hiragana,
          note: vocab.note,
          tags: vocab.tags,
          difficulty: vocab.difficulty,
          isFavorite: vocab.isFavorite,
        });
        await addToDeck(newDeck.id, flashcard.id);
      }
      alert(`✅ Saved ${flashcardVocabulary.length} flashcards to deck: ${newDeck.name}`);
      setIsDeckModalOpen(true);
    } catch (error) {
      alert(`❌ Failed to save flashcards: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleSelectDeck = (deckId: string | null) => {
    setSelectedDeckId(deckId);
    if (deckId) setIsDeckModalOpen(false);
  };

  const handleClearDeckSelection = () => {
    setSelectedDeckId(null);
    setSelectedFlashcardUnit("all");
  };

  const handleAddWordToDeck = async (data: CreateFlashcardDto) => {
    if (!selectedDeckId) { alert("Please select a deck first"); return; }
    setIsAddingWord(true);
    try {
      const newFlashcard = await createFlashcard(data);
      await addToDeck(selectedDeckId, newFlashcard.id);
      setIsQuickAddWordOpen(false);
      alert(`✅ Word added: ${data.front} → ${data.back}`);
    } catch (error) {
      alert(`❌ Failed to add word: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsAddingWord(false);
    }
  };

  // Custom list handlers
  const handleCreateCustomList = async (name: string, description?: string) => {
    if (!storage) return;
    await (storage as any).createCustomList?.(name, description);
    await loadCustomLists();
  };
  const handleDeleteCustomList = async (id: string) => {
    if (!storage) return;
    await (storage as any).deleteCustomList?.(id);
    await loadCustomLists();
    if (selectedVocabularyUnit === id) setSelectedVocabularyUnit("all");
    if (selectedFlashcardUnit === id) setSelectedFlashcardUnit("all");
  };
  const handleUpdateCustomList = async (id: string, updates: Partial<CustomList>) => {
    if (!storage) return;
    await (storage as any).updateCustomList?.(id, updates);
    await loadCustomLists();
  };
  const handleAddToCustomList = async (listId: string, vocabularyId: string) => {
    if (!storage) return;
    await (storage as any).addToCustomList?.(listId, vocabularyId);
    await loadCustomLists();
  };
  const handleRemoveFromCustomList = async (itemId: string) => {
    if (!storage) return;
    await (storage as any).removeFromCustomList?.(itemId);
    await loadCustomLists();
  };

  // Auto-play
  useEffect(() => {
    if (!autoPlay || !state.content) return;
    const timer = setTimeout(() => {
      if (!state.isFlipped) flip();
      else if (state.currentIndex < state.totalCards - 1) next();
      else setAutoPlay(false);
    }, autoPlaySpeed);
    return () => clearTimeout(timer);
  }, [autoPlay, state.isFlipped, state.currentIndex, state.totalCards, autoPlaySpeed, flip, next, state.content]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.ctrlKey || e.metaKey) return;
      switch (e.key) {
        case " ": case "Enter": e.preventDefault(); flip(); break;
        case "ArrowLeft": e.preventDefault(); previous(); break;
        case "ArrowRight": e.preventDefault(); next(); break;
        case "s": case "S": e.preventDefault(); shuffle(); break;
        case "m": case "M": e.preventDefault(); {
          const currentModeIndex = availableModes.indexOf(state.mode);
          const nextModeIndex = (currentModeIndex + 1) % availableModes.length;
          changeMode(availableModes[nextModeIndex]);
          break;
        }
        case "Insert": e.preventDefault();
          if (selectedDeckId && currentPage === "flashcards") setIsQuickAddWordOpen(true);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [flip, next, previous, shuffle, changeMode, state.mode, availableModes, selectedDeckId, currentPage]);

  if (!storage) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Waiting for PostgreSQL API...</p>
          <p style={{ fontSize: '0.8em', color: '#666', marginTop: '10px' }}>
            Please start the backend server: <code>cd server && npm start</code>
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="app">
        {currentPage === "vocabulary" && (
          <UnitSelector
            selectedUnit={selectedVocabularyUnit}
            onUnitSelect={(unit) => { setSelectedVocabularyUnit(unit); setSelectedFlashcardUnit(unit); }}
            customLists={customLists}
            onCreateCustomList={() => setIsListModalOpen(true)}
            unitCounts={{}}
            customListCounts={{}}
          />
        )}
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} darkMode={darkMode} onThemeToggle={() => setDarkMode(!darkMode)} />
        <main className={`app-main ${currentPage === "vocabulary" ? "with-sidebar" : ""}`}>
          <div className="loading"><div className="spinner"></div><p>Loading vocabulary...</p></div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        {currentPage === "vocabulary" && (
          <UnitSelector
            selectedUnit={selectedVocabularyUnit}
            onUnitSelect={(unit) => { setSelectedVocabularyUnit(unit); setSelectedFlashcardUnit(unit); }}
            customLists={customLists}
            onCreateCustomList={() => setIsListModalOpen(true)}
            unitCounts={{}}
            customListCounts={{}}
          />
        )}
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} darkMode={darkMode} onThemeToggle={() => setDarkMode(!darkMode)} />
        <main className={`app-main ${currentPage === "vocabulary" ? "with-sidebar" : ""}`}>
          <div className="error-container"><div className="error"><h2>Error</h2><p>{error}</p><button onClick={refresh}>Retry</button></div></div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Left Sidebar - Old vocabulary system */}
      {currentPage === "vocabulary" && location.pathname === "/vocabulary" && (
        <UnitSelector
          selectedUnit={selectedVocabularyUnit}
          onUnitSelect={(unit) => { setSelectedVocabularyUnit(unit); setSelectedFlashcardUnit(unit); }}
          customLists={customLists}
          onCreateCustomList={() => setIsListModalOpen(true)}
          unitCounts={{}}
          customListCounts={{}}
        />
      )}

      <Navigation currentPage={currentPage} onNavigate={handleNavigate} darkMode={darkMode} onThemeToggle={() => setDarkMode(!darkMode)} />

      <Routes>
        {/* Home */}
        <Route path="/" element={
          <main className="app-main">
            <Home onNavigate={handleNavigate} vocabularyCount={vocabulary.length} />
          </main>
        } />

        {/* Flashcards */}
        <Route path="/flashcards" element={
          <main className="app-main">
            {showStats && vocabulary.length > 0 && <StatisticsPanel statistics={statistics} />}
            {flashcardVocabulary.length === 0 ? (
              <div className="empty-vocabulary">
                <div className="empty-icon">📚</div>
                <h2>No vocabulary!</h2>
                <p>Please select a unit or list</p>
                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                  <button onClick={() => handleNavigate("home")} className="back-to-home-btn">← Back to Home</button>
                  {selectedDeckId && <button onClick={() => setIsQuickAddWordOpen(true)} className="add-word-button" title="Add new word">➕ Add Word</button>}
                </div>
              </div>
            ) : (
              <>
                <div className="flashcard-unit-indicator">
                  <span className="unit-label">
                    {selectedDeckId ? (
                      <>
                        {decks.find((d) => d.id === selectedDeckId)?.icon || "🎴"} Practice: {decks.find((d) => d.id === selectedDeckId)?.name || "Selected Deck"}
                        <button onClick={handleClearDeckSelection} className="clear-deck-selection" title="Back to vocabulary">×</button>
                      </>
                    ) : selectedFlashcardUnit === "all" ? "📚 Practice: All Units" : typeof selectedFlashcardUnit === "number" ? `📖 Practice: Unit ${selectedFlashcardUnit}` : <>{customLists.find((l) => l.id === selectedFlashcardUnit)?.icon || "📝"} Practice: {customLists.find((l) => l.id === selectedFlashcardUnit)?.name || "Custom List"}</>}
                  </span>
                  <span className="unit-count">{flashcardVocabulary.length} words</span>
                </div>
                <ModeSelector currentMode={state.mode} availableModes={availableModes} onModeChange={changeMode} />
                {state.content && (
                  <>
                    <Flashcard front={state.content.front} back={state.content.back} isFlipped={state.isFlipped} onFlip={flip} />
                    <FlashcardControls currentIndex={state.currentIndex} totalCards={state.totalCards} onPrevious={previous} onNext={next} onShuffle={shuffle} canGoPrevious={state.currentIndex > 0} canGoNext={state.currentIndex < state.totalCards - 1} />
                    <div className="extra-controls">
                      {selectedDeckId && <button onClick={() => setIsQuickAddWordOpen(true)} className="add-word-button" title="Add new word">➕ Add Word</button>}
                      <button onClick={() => setAutoPlay(!autoPlay)} className={`auto-play-button ${autoPlay ? "active" : ""}`} title={autoPlay ? "Stop autoplay" : "Start autoplay"}>{autoPlay ? "⏸️ Stop" : "▶️ Autoplay"}</button>
                    </div>
                    <div className="keyboard-hints"><span>💡 Lối tắt bàn phím:</span><kbd>Space</kbd> Lật thẻ<kbd>←</kbd> Previous<kbd>→</kbd> Next<kbd>S</kbd> Shuffle<kbd>M</kbd> Change Mode<kbd>Insert</kbd> Add Word</div>
                  </>
                )}
              </>
            )}
            <div className="flashcard-deck-controls">
              <button onClick={() => setIsDeckModalOpen(true)} className="flashcard-list-btn" title="View all flashcard decks">📚 Flashcard List</button>
              <button onClick={handleSaveToDeck} className="save-to-deck-btn" title="Save current vocabulary as flashcards" disabled={flashcardVocabulary.length === 0}>💾 Save to Deck</button>
            </div>
          </main>
        } />

        {/* Old Vocabulary Table */}
        <Route path="/vocabulary" element={
          <main className="app-main with-sidebar">
            <div className="vocabulary-page">
              <div className="page-header">
                <h2>📚 Vocabulary</h2>
                <p>
                  {selectedVocabularyUnit === "all" ? `All Units - ${vocabulary.length} words` :
                   typeof selectedVocabularyUnit === "number" ? `Unit ${selectedVocabularyUnit} - ${managedVocabulary.length} words` :
                   `${customLists.find((l) => l.id === selectedVocabularyUnit)?.name || "Custom List"} - ${managedVocabulary.length} words`}
                </p>
              </div>
              {vocabulary.length === 0 ? (
                <div className="empty-vocabulary">
                  <div className="empty-icon">📚</div>
                  <h3>Welcome!</h3>
                  <p>Your vocabulary library is ready</p>
                  <button onClick={async () => { localStorage.removeItem("nihongo_vocabulary_initialized"); await refresh(); }} className="back-to-home-btn">Load Sample Vocabulary</button>
                </div>
              ) : (
                <>
                  <VocabularyTable vocabulary={vocabulary} onStartPractice={handleStartPractice} selectedUnit={selectedVocabularyUnit} onUnitChange={setSelectedVocabularyUnit} />
                  <div className="vocabulary-actions">
                    <details className="advanced-management">
                      <summary>⚙️ Advanced Management</summary>
                      <VocabularyManager vocabulary={managedVocabulary} onCreate={create} onUpdate={update} onDelete={remove} />
                    </details>
                  </div>
                </>
              )}
            </div>
          </main>
        } />

        {/* Dynamic Vocabulary - New System */}
        <Route path="/vocabulary/units" element={<main className="app-main"><UnitList /></main>} />
        <Route path="/vocabulary/units/:unitId" element={<main className="app-main"><UnitDetail /></main>} />

        {/* Alphabet */}
        <Route path="/alphabet" element={
          <main className="app-main">
            <div className="feature-placeholder">
              <div className="placeholder-icon">🔤</div>
              <h2>Hiragana & Katakana</h2>
              <p>Learn and practice Japanese alphabets</p>
              <p className="coming-soon">Coming soon...</p>
            </div>
          </main>
        } />

        {/* Grammar */}
        <Route path="/grammar" element={<main className="app-main"><Grammar onNavigate={handleNavigate} /></main>} />

        {/* Kanji */}
        <Route path="/kanji" element={<main className="app-main"><Kanji onNavigate={handleNavigate} /></main>} />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Modals - rendered at top level so they work across routes */}
      <CustomListModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        customLists={customLists}
        onCreateList={handleCreateCustomList}
        onDeleteList={handleDeleteCustomList}
        onUpdateList={handleUpdateCustomList}
        allVocabulary={vocabulary}
        onAddToList={handleAddToCustomList}
        onRemoveFromList={handleRemoveFromCustomList}
        onCreateVocabulary={create}
        onUpdateVocabulary={update}
        selectedListId={selectedListId}
        onSelectList={setSelectedListId}
        listVocabulary={listVocabularyMap}
        listItems={listItemsMap}
      />

      <FlashcardDeckModal
        isOpen={isDeckModalOpen}
        onClose={() => setIsDeckModalOpen(false)}
        decks={decks}
        allFlashcards={flashcards}
        deckItems={deckItems}
        onCreateDeck={createDeck}
        onUpdateDeck={updateDeck}
        onDeleteDeck={deleteDeck}
        onUpdateFlashcard={updateFlashcard}
        onDeleteFlashcard={deleteFlashcard}
        onAddToDeck={addToDeck}
        onRemoveFromDeck={removeFromDeck}
        selectedDeckId={selectedDeckId}
        onSelectDeck={handleSelectDeck}
        onImportDeck={importDeck}
        onExportDeck={exportDeck}
      />

      <QuickAddWordModal
        isOpen={isQuickAddWordOpen}
        onClose={() => setIsQuickAddWordOpen(false)}
        onSubmit={handleAddWordToDeck}
        currentMode={state.mode}
        isLoading={isAddingWord}
      />

      <footer className="app-footer">
        <p>Built with React + TypeScript | Data persisted in PostgreSQL</p>
      </footer>
    </div>
  );
}

// Wrap with Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
