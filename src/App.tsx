import { useEffect, useState, useCallback, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { FlashcardMode } from "./features/vocabulary/vocabulary";
import { IVocabularyStorage } from "./features/vocabulary/IVocabularyStorage";
import { ApiVocabularyStorage, apiStorage } from "./features/vocabulary/ApiVocabularyStorage";
import { useVocabulary } from "./features/vocabulary/useVocabulary";
import { useFlashcardManager } from "./features/flashcards/useFlashcardManager";
import { getAvailableModes, calculateStatistics } from "./features/flashcards/flashcardHelpers";
import { Flashcard } from "./features/flashcards/Flashcard";
import { FlashcardControls } from "./features/flashcards/FlashcardControls";
import { ModeSelector } from "./features/flashcards/ModeSelector";
import { VocabularyTable } from "./features/vocabulary/VocabularyTable";
import { StatisticsPanel } from "./features/shared/StatisticsPanel";
import { Home } from "./features/shared/Home";
import { Navigation } from "./features/shared/Navigation";
import { Grammar } from "./features/grammar/Grammar";
import { Kanji } from "./features/kanji/Kanji";
import { UnitSelector } from "./features/vocabulary/UnitSelector";
import { CustomListModal } from "./features/vocabulary/CustomListModal";
import { FlashcardDeckModal } from "./features/flashcards/FlashcardDeckModal";
import { QuickAddWordModal } from "./features/vocabulary/QuickAddWordModal";

import { useFlashcards } from "./features/flashcards/useFlashcards";
import { ApiFlashcardStorage, apiFlashcardStorage } from "./features/flashcards/ApiFlashcardStorage";
import type { IFlashcardStorage } from "./features/flashcards/IFlashcardStorage";
import type { CreateFlashcardDto, FlashcardItem } from "./features/flashcards/flashcard";
import type { CustomList, ListItem, VocabularyUnitItem, VocabularyItem, VocabularyUnit } from "./features/vocabulary/vocabulary";
// Dynamic Vocabulary imports
import { CreateVocabularyItemModal } from "./features/vocabulary/DynamicVocabulary/CreateVocabularyItemModal";
import { EditVocabularyItemModal } from "./features/vocabulary/DynamicVocabulary/EditVocabularyItemModal";
import { dynamicVocabularyStorage } from "./features/vocabulary/DynamicVocabularyStorage";
import "./App.css";

// Convert dynamic vocabulary unit items to legacy VocabularyItem format
function convertToLegacyFormat(items: VocabularyUnitItem[]): VocabularyItem[] {
  return items.map((item) => ({
    id: item.id,
    hiragana: item.hiragana,
    kanji: item.kanji || null,
    vietnamese: item.vietnamese,
    unit: item.unitId, // Keep as string to match selected unit
    exampleSentenceHiragana: item.hiraganaSentence,
    category: undefined,
    tags: [],
    difficulty: undefined,
    romaji: undefined,
    audioUrl: undefined,
    isFavorite: false,
    note: undefined,
    isBuiltIn: false,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));
}

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
    else if (page === "dynamic-vocabulary" || page === "vocabulary/units") navigate("/vocabulary/units");
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
  const [flashcardStorage, setFlashcardStorage] = useState<IFlashcardStorage | null>(null);
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [isQuickAddWordOpen, setIsQuickAddWordOpen] = useState(false);
  const [isAddingWord, setIsAddingWord] = useState(false);
  const [isAddVocabularyOpen, setIsAddVocabularyOpen] = useState(false);
  const [customLists, setCustomLists] = useState<CustomList[]>([]);
  const [listVocabularyMap, setListVocabularyMap] = useState<Map<string, any[]>>(new Map());
  const [listItemsMap, setListItemsMap] = useState<Map<string, ListItem[]>>(new Map());
  const [dynamicVocabularyItems, setDynamicVocabularyItems] = useState<VocabularyItem[]>([]);
  const [vocabularyUnits, setVocabularyUnits] = useState<VocabularyUnit[]>([]);
  const [isEditVocabularyOpen, setIsEditVocabularyOpen] = useState(false);
  const [editingVocabularyItem, setEditingVocabularyItem] = useState<VocabularyUnitItem | null>(null);

  // Initialize storage on mount
  useEffect(() => {
    const initStorage = async () => {
      try {
        const isApiAvailable = await ApiVocabularyStorage.isSupported();
        const isFlashcardApiAvailable = await ApiFlashcardStorage.isSupported();
        if (isApiAvailable) {
          console.log("🔗 Using PostgreSQL");
          setStorage(apiStorage);
          if (isFlashcardApiAvailable) {
            setFlashcardStorage(apiFlashcardStorage);
          }
          return;
        }
      } catch {}
      console.error("❌ PostgreSQL API is not available. Please start the backend server.");
      setStorage(null);
    };
    initStorage();
  }, []);

  // Fetch vocabulary units
  useEffect(() => {
    const fetchUnits = async () => {
      if (!storage) {
        setVocabularyUnits([]);
        return;
      }
      try {
        const units = await dynamicVocabularyStorage.getAllUnits();
        setVocabularyUnits(units);
      } catch (error) {
        console.error("Failed to fetch vocabulary units:", error);
        setVocabularyUnits([]);
      }
    };
    fetchUnits();
  }, [storage]);

  // Fetch vocabulary items for the selected dynamic unit
  useEffect(() => {
    const fetchDynamicVocabulary = async () => {
      if (!storage) {
        setDynamicVocabularyItems([]);
        return;
      }
      
      try {
        // selectedVocabularyUnit can be a number (old system) or string (new system)
        const unitId = typeof selectedVocabularyUnit === "number" 
          ? selectedVocabularyUnit.toString() 
          : selectedVocabularyUnit;
        
        if (unitId === "all") {
          // Fetch all items from all units
          const allItems: VocabularyUnitItem[] = [];
          const units = await dynamicVocabularyStorage.getAllUnits();
          for (const unit of units) {
            const items = await dynamicVocabularyStorage.getItemsByUnit(unit.id);
            // Ensure each item has the correct unitId
            const itemsWithUnit = items.map(item => ({ ...item, unitId: unit.id }));
            allItems.push(...itemsWithUnit);
          }
          setDynamicVocabularyItems(convertToLegacyFormat(allItems));
        } else {
          // Fetch items for specific unit
          const items = await dynamicVocabularyStorage.getItemsByUnit(unitId);
          // Ensure each item has the correct unitId
          const itemsWithUnit = items.map(item => ({ ...item, unitId }));
          setDynamicVocabularyItems(convertToLegacyFormat(itemsWithUnit));
        }
      } catch (error) {
        console.error("Failed to fetch dynamic vocabulary:", error);
        setDynamicVocabularyItems([]);
      }
    };
    
    fetchDynamicVocabulary();
  }, [storage, selectedVocabularyUnit]);

  // Apply dark mode
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Vocabulary management
  const { vocabulary, loading, error, create, update, refresh } = useVocabulary(storage);

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
        .map((item) => {
          // Try to find the flashcard by ID first
          if (item.flashcardId) {
            const found = flashcards.find((f) => f.id === item.flashcardId);
            if (found) return found;
          }
          // If flashcard not found or no flashcardId, use denormalized data from deckItem
          if (item.front && item.back) {
            return {
              id: item.id,
              front: item.front,
              back: item.back,
              kana: item.furigana || item.kana,
              note: item.note,
              tags: [],
              createdAt: item.createdAt || Date.now(),
              updatedAt: item.updatedAt || Date.now(),
            };
          }
          return null;
        })
        .filter((f): f is FlashcardItem => f !== null);
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
    if (selectedFlashcardUnit === "all") return dynamicVocabularyItems;
    if (typeof selectedFlashcardUnit === "string" && selectedFlashcardUnit !== "all") {
      // Check if it's a custom list
      const listVocab = listVocabularyMap.get(selectedFlashcardUnit);
      if (listVocab) return listVocab;
      // Otherwise, filter dynamic vocabulary by unit
      return dynamicVocabularyItems.filter((v) => String(v.unit) === String(selectedFlashcardUnit));
    }
    return dynamicVocabularyItems.filter((v) => v.unit === selectedFlashcardUnit);
  }, [dynamicVocabularyItems, selectedFlashcardUnit, listVocabularyMap, storage, selectedDeckId, deckItems, flashcards]);

  // Flashcard manager
  const { state, flip, next, previous, changeMode, shuffle, reset } = useFlashcardManager({
    vocabulary: flashcardVocabulary,
    initialMode: FlashcardMode.VI_TO_HIRA,
  });

  const availableModes = useMemo(() => getAvailableModes(dynamicVocabularyItems), [dynamicVocabularyItems]);
  const statistics = useMemo(() => calculateStatistics(dynamicVocabularyItems), [dynamicVocabularyItems]);

  useEffect(() => { reset(); }, [selectedFlashcardUnit, reset]);

  // Helper function to get unit name from ID
  const getUnitName = (unitId: number | "all" | string): string => {
    if (unitId === "all") return "All Units";
    if (typeof unitId === "number") return `Unit ${unitId}`;
    
    // Look up the unit by ID in vocabularyUnits (already loaded)
    const unit = vocabularyUnits.find(u => u.id === unitId);
    if (unit) return unit.name;
    
    // If unit not found, check if it's a custom list
    const customList = customLists.find(l => l.id === unitId);
    if (customList) return customList.name;
    
    // Fallback to the ID itself
    return String(unitId);
  };

  // Practice handlers
  const handleStartPractice = (unit: number | "all" | string) => {
    setSelectedFlashcardUnit(unit);
    setSelectedVocabularyUnit(unit);
    handleNavigate("flashcards");
  };

  const handleSaveToDeck = async () => {
    if (flashcardVocabulary.length === 0) return;
    
    // Get unit name - ensure vocabulary units are loaded
    let unitName = getUnitName(selectedFlashcardUnit);
    
    // If the unit name looks like an ID (contains hyphens), try to fetch the actual name
    if (typeof selectedFlashcardUnit === "string" && selectedFlashcardUnit.includes("-") && 
        (vocabularyUnits.length === 0 || !vocabularyUnits.some(u => u.id === selectedFlashcardUnit))) {
      try {
        const units = await dynamicVocabularyStorage.getAllUnits();
        const unit = units.find(u => u.id === selectedFlashcardUnit);
        if (unit) {
          unitName = unit.name;
          // Update the state for future use
          setVocabularyUnits(units);
        }
      } catch (error) {
        console.error("Failed to fetch unit name:", error);
      }
    }
    
    const deckName = `${unitName} - ${new Date().toLocaleDateString()}`;
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

  // Dynamic vocabulary handlers
  const handleCreateVocabularyItem = async (data: { hiragana: string; kanji?: string; vietnamese: string }) => {
    if (!selectedVocabularyUnit || selectedVocabularyUnit === "all") {
      alert("Please select a unit first");
      return;
    }
    
    try {
      const unitId = typeof selectedVocabularyUnit === "number" 
        ? selectedVocabularyUnit.toString() 
        : selectedVocabularyUnit;
      
      await dynamicVocabularyStorage.createItem(unitId, {
        hiragana: data.hiragana,
        vietnamese: data.vietnamese,
        kanji: data.kanji,
      });
      
      // Refresh vocabulary for the selected unit
      if (selectedVocabularyUnit === "all") {
        const allItems: VocabularyUnitItem[] = [];
        const units = await dynamicVocabularyStorage.getAllUnits();
        for (const unit of units) {
          const items = await dynamicVocabularyStorage.getItemsByUnit(unit.id);
          const itemsWithUnit = items.map(item => ({ ...item, unitId: unit.id, unitName: unit.name }));
          allItems.push(...itemsWithUnit);
        }
        setDynamicVocabularyItems(convertToLegacyFormat(allItems));
      } else {
        const items = await dynamicVocabularyStorage.getItemsByUnit(unitId);
        const itemsWithUnit = items.map(item => ({ ...item, unitId }));
        setDynamicVocabularyItems(convertToLegacyFormat(itemsWithUnit));
      }
      setIsAddVocabularyOpen(false);
      
      alert(`✅ Vocabulary item created!`);
    } catch (error) {
      alert(`❌ Failed to create vocabulary item: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // Handle edit vocabulary item
  const handleEditVocabulary = (item: VocabularyItem) => {
    // Find the corresponding unit item
    const findUnitItem = async () => {
      try {
        // Since the item might be from any unit, we need to find it
        const allUnits = await dynamicVocabularyStorage.getAllUnits();
        for (const unit of allUnits) {
          const items = await dynamicVocabularyStorage.getItemsByUnit(unit.id);
          const foundItem = items.find(i => i.id === item.id);
          if (foundItem) {
            setEditingVocabularyItem(foundItem);
            setIsEditVocabularyOpen(true);
            return;
          }
        }
        alert("❌ Vocabulary item not found for editing");
      } catch (error) {
        alert(`❌ Failed to find vocabulary item: ${error instanceof Error ? error.message : String(error)}`);
      }
    };
    findUnitItem();
  };

  // Handle update vocabulary item
  const handleUpdateVocabulary = async (data: { hiragana: string; kanji?: string; vietnamese: string }) => {
    if (!editingVocabularyItem) return;
    
    try {
      await dynamicVocabularyStorage.updateItem(editingVocabularyItem.id, {
        hiragana: data.hiragana,
        kanji: data.kanji,
        vietnamese: data.vietnamese,
      });
      
      // Refresh vocabulary for the current view
      if (selectedVocabularyUnit === "all") {
        const allItems: VocabularyUnitItem[] = [];
        const units = await dynamicVocabularyStorage.getAllUnits();
        for (const unit of units) {
          const items = await dynamicVocabularyStorage.getItemsByUnit(unit.id);
          const itemsWithUnit = items.map(item => ({ ...item, unitId: unit.id }));
          allItems.push(...itemsWithUnit);
        }
        setDynamicVocabularyItems(convertToLegacyFormat(allItems));
      } else {
        const unitId = typeof selectedVocabularyUnit === "number" 
          ? selectedVocabularyUnit.toString() 
          : selectedVocabularyUnit;
        const items = await dynamicVocabularyStorage.getItemsByUnit(unitId);
        const itemsWithUnit = items.map(item => ({ ...item, unitId }));
        setDynamicVocabularyItems(convertToLegacyFormat(itemsWithUnit));
      }
      setIsEditVocabularyOpen(false);
      setEditingVocabularyItem(null);
      
      alert(`✅ Vocabulary item updated!`);
    } catch (error) {
      alert(`❌ Failed to update vocabulary item: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // Handle delete vocabulary item
  const handleDeleteVocabulary = async (id: string) => {
    try {
      await dynamicVocabularyStorage.deleteItem(id);
      
      // Refresh vocabulary for the current view
      if (selectedVocabularyUnit === "all") {
        const allItems: VocabularyUnitItem[] = [];
        const units = await dynamicVocabularyStorage.getAllUnits();
        for (const unit of units) {
          const items = await dynamicVocabularyStorage.getItemsByUnit(unit.id);
          const itemsWithUnit = items.map(item => ({ ...item, unitId: unit.id }));
          allItems.push(...itemsWithUnit);
        }
        setDynamicVocabularyItems(convertToLegacyFormat(allItems));
      } else {
        const unitId = typeof selectedVocabularyUnit === "number" 
          ? selectedVocabularyUnit.toString() 
          : selectedVocabularyUnit;
        const items = await dynamicVocabularyStorage.getItemsByUnit(unitId);
        const itemsWithUnit = items.map(item => ({ ...item, unitId }));
        setDynamicVocabularyItems(convertToLegacyFormat(itemsWithUnit));
      }
      
      alert(`✅ Vocabulary item deleted!`);
    } catch (error) {
      alert(`❌ Failed to delete vocabulary item: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // Get selected unit ID for modal
  const getSelectedUnitId = (): string | null => {
    if (!selectedVocabularyUnit || selectedVocabularyUnit === "all") return null;
    return typeof selectedVocabularyUnit === "number" 
      ? selectedVocabularyUnit.toString() 
      : selectedVocabularyUnit;
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
            <Home onNavigate={handleNavigate} vocabularyCount={dynamicVocabularyItems.length} />
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

        {/* Vocabulary */}
        <Route path="/vocabulary" element={
          <main className="app-main with-sidebar">
            <VocabularyTable
              vocabulary={dynamicVocabularyItems}
              onStartPractice={handleStartPractice}
              selectedUnit={selectedVocabularyUnit}
              onAddVocabulary={() => setIsAddVocabularyOpen(true)}
              onEditVocabulary={handleEditVocabulary}
              onDeleteVocabulary={handleDeleteVocabulary}
            />
          </main>
        } />

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

      {isAddVocabularyOpen && getSelectedUnitId() && (
        <CreateVocabularyItemModal
          unitId={getSelectedUnitId()!}
          onClose={() => setIsAddVocabularyOpen(false)}
          onCreate={handleCreateVocabularyItem}
        />
      )}

      {isEditVocabularyOpen && editingVocabularyItem && (
        <EditVocabularyItemModal
          item={editingVocabularyItem}
          onClose={() => {
            setIsEditVocabularyOpen(false);
            setEditingVocabularyItem(null);
          }}
          onUpdate={handleUpdateVocabulary}
        />
      )}

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
