import { useEffect, useMemo, useState, useCallback } from "react";
import { FlashcardMode } from "./types/vocabulary";
import type { FlashcardItem } from "./types/flashcard";
import { IVocabularyStorage } from "./services/IVocabularyStorage";
import {
  ApiVocabularyStorage,
  apiStorage,
} from "./services/ApiVocabularyStorage";
import type { CustomList, ListItem } from "./types/vocabulary";
import { useVocabulary } from "./hooks/useVocabulary";
import { useFlashcardManager } from "./hooks/useFlashcardManager";
import {
  getAvailableModes,
  calculateStatistics,
} from "./utils/flashcardHelpers";
import { Flashcard } from "./components/Flashcard";
import { FlashcardControls } from "./components/FlashcardControls";
import { ModeSelector } from "./components/ModeSelector";
import { VocabularyManager } from "./components/VocabularyManager";
import { VocabularyTable } from "./components/VocabularyTable";
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
import type { CreateFlashcardDto } from "./types/flashcard";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "flashcards" | "vocabulary" | "alphabet" | "grammar" | "kanji"
  >("home");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  const [autoPlay, setAutoPlay] = useState(false);
  const [autoPlaySpeed] = useState(3000); // 3 seconds
  const [showStats] = useState(false);
  const [selectedFlashcardUnit, setSelectedFlashcardUnit] = useState<
    number | "all" | string
  >("all");
  const [selectedVocabularyUnit, setSelectedVocabularyUnit] = useState<
    number | "all" | string
  >("all");
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [storage, setStorage] = useState<IVocabularyStorage | null>(null);
  const [flashcardStorage] = useState<LocalStorageFlashcardStorage>(
    new LocalStorageFlashcardStorage(),
  );
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [isQuickAddWordOpen, setIsQuickAddWordOpen] = useState(false);
  const [isAddingWord, setIsAddingWord] = useState(false);

  // Custom lists state
  const [customLists, setCustomLists] = useState<CustomList[]>([]);
  const [listVocabularyMap, setListVocabularyMap] = useState<
    Map<string, any[]>
  >(new Map());
  const [listItemsMap, setListItemsMap] = useState<Map<string, ListItem[]>>(
    new Map(),
  );

  // Initialize storage on mount - Use only PostgreSQL
  useEffect(() => {
    const initStorage = async () => {
      try {
        const isApiAvailable = await ApiVocabularyStorage.isSupported();
        if (isApiAvailable) {
          console.log("🔗 Using PostgreSQL");
          setStorage(apiStorage);
          return;
        }
      } catch {
        // API not available
      }

      // PostgreSQL is not available - show error
      console.error("❌ PostgreSQL API is not available. Please start the backend server.");
      setStorage(null);
    };

    initStorage();
  }, []);

  // Navigation handler
  const handleNavigate = (page: string) => {
    setCurrentPage(
      page as
        | "home"
        | "flashcards"
        | "vocabulary"
        | "alphabet"
        | "grammar"
        | "kanji",
    );
  };

  // Handle flashcard practice start with unit selection
  const handleStartPractice = (unit: number | "all" | string) => {
    setSelectedFlashcardUnit(unit);
    setSelectedVocabularyUnit(unit);
    setCurrentPage("flashcards");
  };

  // Handle saving current vocabulary as flashcards to a deck
  const handleSaveToDeck = async () => {
    if (flashcardVocabulary.length === 0) return;

    // Create a new deck for this vocabulary
    const deckName = `Unit ${selectedFlashcardUnit === "all" ? "All" : selectedFlashcardUnit} - ${new Date().toLocaleDateString()}`;

    try {
      // Create the deck first
      const newDeck = await createDeck({ name: deckName });

      // Convert vocabulary items to flashcards and add to the deck
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

        // Add to the new deck
        await addToDeck(newDeck.id, flashcard.id);
      }

      // Show success message
      alert(
        `✅ Saved ${flashcardVocabulary.length} flashcards to deck: ${newDeck.name}`,
      );

      // Optionally open the deck manager
      setIsDeckModalOpen(true);
    } catch (error) {
      alert(
        `❌ Failed to save flashcards: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  };

  // Handle selecting a deck for practice
  const handleSelectDeck = (deckId: string | null) => {
    setSelectedDeckId(deckId);
    if (deckId) {
      // Close the modal when a deck is selected
      setIsDeckModalOpen(false);
    }
  };

  // Handle clearing deck selection to go back to vocabulary-based practice
  const handleClearDeckSelection = () => {
    setSelectedDeckId(null);
    setSelectedFlashcardUnit("all");
  };

  // Handle adding a new word to the current deck
  const handleAddWordToDeck = async (data: CreateFlashcardDto) => {
    if (!selectedDeckId) {
      alert("Please select a deck first");
      return;
    }

    setIsAddingWord(true);
    try {
      // Create the flashcard
      const newFlashcard = await createFlashcard(data);

      // Add it to the selected deck
      await addToDeck(selectedDeckId, newFlashcard.id);

      // Close the modal
      setIsQuickAddWordOpen(false);

      // Show success
      alert(`✅ Word added: ${data.front} → ${data.back}`);
    } catch (error) {
      alert(
        `❌ Failed to add word: ${error instanceof Error ? error.message : String(error)}`,
      );
    } finally {
      setIsAddingWord(false);
    }
  };

  // Apply dark mode
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light",
    );
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Vocabulary management
  const { vocabulary, loading, error, create, update, remove, refresh } =
    useVocabulary(storage);

  // Flashcard management (independent system for custom flashcards)
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
      // @ts-ignore - storage might be ApiVocabularyStorage
      const lists = await storage.getAllCustomLists?.();
      if (lists) {
        setCustomLists(lists);

        // Load vocabulary for each list
        const vocabMap = new Map<string, any[]>();
        const itemsMap = new Map<string, ListItem[]>();

        for (const list of lists) {
          // @ts-ignore
          const vocabInList = await storage.getVocabularyInList?.(list.id);
          // @ts-ignore
          const listItems = await storage.getListItems?.(list.id);
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

  // Load custom lists when storage is ready
  useEffect(() => {
    if (storage) {
      loadCustomLists();
    }
  }, [storage, loadCustomLists]);

  // Filter vocabulary for flashcards based on selected unit or deck
  const flashcardVocabulary = useMemo(() => {
    if (!storage) return [];

    // If a deck is selected, get flashcards from that deck and convert to vocabulary format
    if (selectedDeckId) {
      const deckFlashcards = deckItems.get(selectedDeckId) || [];
      const flashcardsInDeck = deckFlashcards
        .map((item) => flashcards.find((f) => f.id === item.flashcardId))
        .filter((f): f is FlashcardItem => f !== undefined);

      return flashcardsInDeck.map((flashcard) => ({
        // Convert FlashcardItem to VocabularyItem format
        id: flashcard.id,
        vietnamese: flashcard.back,
        hiragana: flashcard.kana || flashcard.front,
        kanji: flashcard.front.includes(flashcard.kana || "")
          ? null
          : flashcard.front,
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

    // Otherwise use vocabulary filtered by unit
    if (selectedFlashcardUnit === "all") {
      return vocabulary;
    }
    if (
      typeof selectedFlashcardUnit === "string" &&
      selectedFlashcardUnit !== "all"
    ) {
      // Custom list - get vocabulary from the list
      return listVocabularyMap.get(selectedFlashcardUnit) || [];
    }
    return vocabulary.filter((v) => v.unit === selectedFlashcardUnit);
  }, [
    vocabulary,
    selectedFlashcardUnit,
    listVocabularyMap,
    storage,
    selectedDeckId,
    deckItems,
    flashcards,
  ]);

  // Filter vocabulary for management based on selected unit
  const managedVocabulary = useMemo(() => {
    if (!storage) return [];

    if (selectedVocabularyUnit === "all") {
      return vocabulary;
    }
    if (
      typeof selectedVocabularyUnit === "string" &&
      selectedVocabularyUnit !== "all"
    ) {
      // Custom list
      return listVocabularyMap.get(selectedVocabularyUnit) || [];
    }
    return vocabulary.filter((v) => v.unit === selectedVocabularyUnit);
  }, [vocabulary, selectedVocabularyUnit, listVocabularyMap, storage]);

  // Flashcard management
  const { state, flip, next, previous, changeMode, shuffle, reset } =
    useFlashcardManager({
      vocabulary: flashcardVocabulary,
      initialMode: FlashcardMode.VI_TO_HIRA,
    });

  // Available modes based on vocabulary
  const availableModes = useMemo(
    () => getAvailableModes(vocabulary),
    [vocabulary],
  );

  // Calculate statistics
  const statistics = useMemo(
    () => calculateStatistics(vocabulary),
    [vocabulary],
  );

  // Cleanup flashcard state when unit changes
  useEffect(() => {
    reset();
  }, [selectedFlashcardUnit, reset]);

  // Custom list handlers
  const handleCreateCustomList = async (name: string, description?: string) => {
    if (!storage) return;
    // @ts-ignore
    await storage.createCustomList?.(name, description);
    await loadCustomLists();
  };

  const handleDeleteCustomList = async (id: string) => {
    if (!storage) return;
    // @ts-ignore
    await storage.deleteCustomList?.(id);
    await loadCustomLists();
    if (selectedVocabularyUnit === id) {
      setSelectedVocabularyUnit("all");
    }
    if (selectedFlashcardUnit === id) {
      setSelectedFlashcardUnit("all");
    }
  };

  const handleUpdateCustomList = async (
    id: string,
    updates: Partial<CustomList>,
  ) => {
    if (!storage) return;
    // @ts-ignore
    await storage.updateCustomList?.(id, updates);
    await loadCustomLists();
  };

  const handleAddToCustomList = async (
    listId: string,
    vocabularyId: string,
  ) => {
    if (!storage) return;
    // @ts-ignore
    await storage.addToCustomList?.(listId, vocabularyId);
    await loadCustomLists();
  };

  const handleRemoveFromCustomList = async (itemId: string) => {
    if (!storage) return;
    // @ts-ignore
    await storage.removeFromCustomList?.(itemId);
    await loadCustomLists();
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || !state.content) return;

    const timer = setTimeout(() => {
      if (!state.isFlipped) {
        flip();
      } else {
        if (state.currentIndex < state.totalCards - 1) {
          next();
        } else {
          setAutoPlay(false); // Stop at end
        }
      }
    }, autoPlaySpeed);

    return () => clearTimeout(timer);
  }, [
    autoPlay,
    state.isFlipped,
    state.currentIndex,
    state.totalCards,
    autoPlaySpeed,
    flip,
    next,
    state.content,
  ]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Don't interfere with other modifiers
      if (e.ctrlKey || e.metaKey) {
        return;
      }

      switch (e.key) {
        case " ":
        case "Enter":
          e.preventDefault();
          flip();
          break;
        case "ArrowLeft":
          e.preventDefault();
          previous();
          break;
        case "ArrowRight":
          e.preventDefault();
          next();
          break;
        case "s":
        case "S":
          e.preventDefault();
          shuffle();
          break;
        case "m":
        case "M":
          e.preventDefault();
          // Cycle to next available mode
          const currentModeIndex = availableModes.indexOf(state.mode);
          const nextModeIndex = (currentModeIndex + 1) % availableModes.length;
          changeMode(availableModes[nextModeIndex]);
          break;
        case "Insert":
          e.preventDefault();
          // Add word (only if deck is selected)
          if (selectedDeckId && currentPage === "flashcards") {
            setIsQuickAddWordOpen(true);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    flip,
    next,
    previous,
    shuffle,
    changeMode,
    state.mode,
    availableModes,
    selectedDeckId,
    currentPage,
  ]);

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
            onUnitSelect={(unit) => {
              setSelectedVocabularyUnit(unit);
              setSelectedFlashcardUnit(unit);
            }}
            customLists={customLists}
            onCreateCustomList={() => setIsListModalOpen(true)}
            unitCounts={{}}
            customListCounts={{}}
          />
        )}
        <Navigation
          currentPage={currentPage}
          onNavigate={handleNavigate}
          darkMode={darkMode}
          onThemeToggle={() => setDarkMode(!darkMode)}
        />
        <main
          className={`app-main ${currentPage === "vocabulary" ? "with-sidebar" : ""}`}
        >
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading vocabulary...</p>
          </div>
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
            onUnitSelect={(unit) => {
              setSelectedVocabularyUnit(unit);
              setSelectedFlashcardUnit(unit);
            }}
            customLists={customLists}
            onCreateCustomList={() => setIsListModalOpen(true)}
            unitCounts={{}}
            customListCounts={{}}
          />
        )}
        <Navigation
          currentPage={currentPage}
          onNavigate={handleNavigate}
          darkMode={darkMode}
          onThemeToggle={() => setDarkMode(!darkMode)}
        />
        <main
          className={`app-main ${currentPage === "vocabulary" ? "with-sidebar" : ""}`}
        >
          <div className="error-container">
            <div className="error">
              <h2>Error</h2>
              <p>{error}</p>
              <button onClick={refresh}>Retry</button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Left Sidebar - Unit Selector (only show on Vocabulary page) */}
      {currentPage === "vocabulary" && (
        <UnitSelector
          selectedUnit={selectedVocabularyUnit}
          onUnitSelect={(unit) => {
            setSelectedVocabularyUnit(unit);
            setSelectedFlashcardUnit(unit);
          }}
          customLists={customLists}
          onCreateCustomList={() => setIsListModalOpen(true)}
          unitCounts={{}}
          customListCounts={{}}
        />
      )}

      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        onThemeToggle={() => setDarkMode(!darkMode)}
      />

      {currentPage === "home" ? (
        <main className="app-main">
          <Home
            onNavigate={handleNavigate}
            vocabularyCount={vocabulary.length}
          />
        </main>
      ) : currentPage === "flashcards" ? (
        <main className="app-main">
          {showStats && vocabulary.length > 0 && (
            <StatisticsPanel statistics={statistics} />
          )}

          {flashcardVocabulary.length === 0 ? (
            <div className="empty-vocabulary">
              <div className="empty-icon">📚</div>
              <h2>No vocabulary!</h2>
              <p>Please select a unit or list</p>
              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                <button
                  onClick={() => setCurrentPage("home")}
                  className="back-to-home-btn"
                >
                  ← Back to Home
                </button>

                {selectedDeckId && (
                  <button
                    onClick={() => setIsQuickAddWordOpen(true)}
                    className="add-word-button"
                    title="Add new word to this deck (Insert)"
                  >
                    ➕ Add Word
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="flashcard-unit-indicator">
                <span className="unit-label">
                  {selectedDeckId ? (
                    <>
                      {decks.find((d) => d.id === selectedDeckId)?.icon || "🎴"}
                      Practice:{" "}
                      {decks.find((d) => d.id === selectedDeckId)?.name ||
                        "Selected Deck"}
                      <button
                        onClick={handleClearDeckSelection}
                        className="clear-deck-selection"
                        title="Back to vocabulary"
                      >
                        ×
                      </button>
                    </>
                  ) : selectedFlashcardUnit === "all" ? (
                    <>📚 Practice: All Units</>
                  ) : typeof selectedFlashcardUnit === "number" ? (
                    <>📖 Practice: Unit {selectedFlashcardUnit}</>
                  ) : (
                    <>
                      {customLists.find((l) => l.id === selectedFlashcardUnit)
                        ?.icon || "📝"}
                      Practice:{" "}
                      {customLists.find((l) => l.id === selectedFlashcardUnit)
                        ?.name || "Custom List"}
                    </>
                  )}
                </span>
                <span className="unit-count">
                  {flashcardVocabulary.length} words
                </span>
              </div>

              <ModeSelector
                currentMode={state.mode}
                availableModes={availableModes}
                onModeChange={changeMode}
              />

              {state.content && (
                <>
                  <Flashcard
                    front={state.content.front}
                    back={state.content.back}
                    isFlipped={state.isFlipped}
                    onFlip={flip}
                  />

                  <FlashcardControls
                    currentIndex={state.currentIndex}
                    totalCards={state.totalCards}
                    onPrevious={previous}
                    onNext={next}
                    onShuffle={shuffle}
                    canGoPrevious={state.currentIndex > 0}
                    canGoNext={state.currentIndex < state.totalCards - 1}
                  />

                  <div className="extra-controls">
                    {selectedDeckId && (
                      <button
                        onClick={() => setIsQuickAddWordOpen(true)}
                        className="add-word-button"
                        title="Add new word to this deck (Insert)"
                      >
                        ➕ Add Word
                      </button>
                    )}
                    <button
                      onClick={() => setAutoPlay(!autoPlay)}
                      className={`auto-play-button ${autoPlay ? "active" : ""}`}
                      title={autoPlay ? "Stop autoplay" : "Start autoplay"}
                    >
                      {autoPlay ? "⏸️ Stop" : "▶️ Autoplay"}
                    </button>
                  </div>

                  <div className="keyboard-hints">
                    <span>💡 Lối tắt bàn phím:</span>
                    <kbd>Space</kbd> Lật thẻ
                    <kbd>←</kbd> Previous
                    <kbd>→</kbd> Next
                    <kbd>S</kbd> Shuffle
                    <kbd>M</kbd> Change Mode
                    <kbd>Insert</kbd> Add Word
                  </div>
                </>
              )}
            </>
          )}

          {/* Flashcard Deck Controls */}
          <div className="flashcard-deck-controls">
            <button
              onClick={() => setIsDeckModalOpen(true)}
              className="flashcard-list-btn"
              title="View all flashcard decks"
            >
              📚 Flashcard List
            </button>
            <button
              onClick={handleSaveToDeck}
              className="save-to-deck-btn"
              title="Save current vocabulary as flashcards"
              disabled={flashcardVocabulary.length === 0}
            >
              💾 Save to Deck
            </button>
          </div>
        </main>
      ) : currentPage === "vocabulary" ? (
        <main className={`app-main with-sidebar`}>
          <div className="vocabulary-page">
            <div className="page-header">
              <h2>📚 Vocabulary</h2>
              <p>
                {selectedVocabularyUnit === "all" ? (
                  <>All Units - {vocabulary.length} words</>
                ) : typeof selectedVocabularyUnit === "number" ? (
                  <>
                    Unit {selectedVocabularyUnit} - {managedVocabulary.length}{" "}
                    words
                  </>
                ) : (
                  <>
                    {customLists.find((l) => l.id === selectedVocabularyUnit)
                      ?.name || "Custom List"}{" "}
                    - {managedVocabulary.length} words
                  </>
                )}
              </p>

            </div>

            {vocabulary.length === 0 ? (
              <div className="empty-vocabulary">
                <div className="empty-icon">📚</div>
                <h3>Welcome!</h3>
                <p>Your vocabulary library is ready</p>
                <button
                  onClick={async () => {
                    // Force clear and reload
                    localStorage.removeItem("nihongo_vocabulary_initialized");
                    await refresh();
                  }}
                  className="back-to-home-btn"
                >
                  Load Sample Vocabulary
                </button>
              </div>
            ) : (
              <>
                <VocabularyTable
                  vocabulary={vocabulary}
                  onStartPractice={handleStartPractice}
                  selectedUnit={selectedVocabularyUnit}
                  onUnitChange={setSelectedVocabularyUnit}
                />

                <div className="vocabulary-actions">
                  <details className="advanced-management">
                    <summary>⚙️ Advanced Management</summary>
                    <VocabularyManager
                      vocabulary={managedVocabulary}
                      onCreate={create}
                      onUpdate={update}
                      onDelete={remove}
                    />
                  </details>
                </div>
              </>
            )}
          </div>
        </main>
      ) : currentPage === "alphabet" ? (
        <main className="app-main">
          <div className="feature-placeholder">
            <div className="placeholder-icon">🔤</div>
            <h2>Hiragana & Katakana</h2>
            <p>Learn and practice Japanese alphabets</p>
            <p className="coming-soon">Coming soon...</p>
          </div>
        </main>
      ) : currentPage === "kanji" ? (
        <Kanji onNavigate={handleNavigate} />
      ) : (
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Grammar onNavigate={handleNavigate} />
        </div>
      )}

      {/* Custom List Modal */}
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

      {/* Flashcard Deck Modal */}
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

      {/* Quick Add Word Modal */}
      <QuickAddWordModal
        isOpen={isQuickAddWordOpen}
        onClose={() => setIsQuickAddWordOpen(false)}
        onSubmit={handleAddWordToDeck}
        currentMode={state.mode}
        isLoading={isAddingWord}
      />

      <footer className="app-footer">
        <p>
          Built with React + TypeScript | Data persisted in PostgreSQL
        </p>
      </footer>
    </div>
  );
}

export default App;
