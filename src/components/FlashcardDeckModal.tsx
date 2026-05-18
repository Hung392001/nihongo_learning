import React, { useState, useEffect } from 'react';
import type { FlashcardDeck, FlashcardItem, CreateFlashcardDto, UpdateFlashcardDto, DeckItem } from '../types/flashcard';
import type { CreateDeckDto, UpdateDeckDto, FlashcardExport } from '../types/flashcard';
import { FlashcardForm } from './FlashcardForm';
import './FlashcardDeckModal.css';

interface FlashcardDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  decks: FlashcardDeck[];
  allFlashcards: FlashcardItem[];
  deckItems: Map<string, DeckItem[]>;
  onCreateDeck: (data: CreateDeckDto) => Promise<FlashcardDeck>;
  onUpdateDeck: (id: string, data: UpdateDeckDto) => Promise<FlashcardDeck>;
  onDeleteDeck: (id: string, deleteCards?: boolean) => Promise<void>;
  onCreateFlashcard: (data: CreateFlashcardDto) => Promise<FlashcardItem>;
  onUpdateFlashcard: (id: string, data: UpdateFlashcardDto) => Promise<FlashcardItem>;
  onAddToDeck: (deckId: string, flashcardId: string, note?: string) => Promise<DeckItem>;
  onRemoveFromDeck: (deckItemId: string) => Promise<void>;
  selectedDeckId: string | null;
  onSelectDeck: (id: string | null) => void;
  onImportDeck: (data: FlashcardExport) => Promise<string>;
  onExportDeck: (deckId: string) => Promise<FlashcardExport>;
}

type ActiveTab = 'manage' | 'add' | 'create' | 'practice';

export const FlashcardDeckModal: React.FC<FlashcardDeckModalProps> = ({
  isOpen,
  onClose,
  decks,
  allFlashcards,
  deckItems,
  onCreateDeck,
  onUpdateDeck,
  onDeleteDeck,
  onCreateFlashcard,
  onUpdateFlashcard,
  onAddToDeck,
  onRemoveFromDeck,
  selectedDeckId,
  onSelectDeck,
  onImportDeck,
  onExportDeck,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('manage');
  const [newDeckName, setNewDeckName] = useState('');
  const [newDeckDescription, setNewDeckDescription] = useState('');
  const [editingDeckId, setEditingDeckId] = useState<string | null>(null);
  const [editingDeckName, setEditingDeckName] = useState('');
  const [editingDeckDescription, setEditingDeckDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importData, setImportData] = useState('');

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setActiveTab('manage');
      setNewDeckName('');
      setNewDeckDescription('');
      setEditingDeckId(null);
      setSearchQuery('');
      setIsCreatingCard(false);
      setEditingCardId(null);
      setShowImportModal(false);
      setImportData('');
    }
  }, [isOpen]);

  // Reset editing state when editingDeckId changes
  useEffect(() => {
    if (editingDeckId) {
      const deck = decks.find(d => d.id === editingDeckId);
      if (deck) {
        setEditingDeckName(deck.name);
        setEditingDeckDescription(deck.description || '');
      }
    }
  }, [editingDeckId, decks]);

  if (!isOpen) return null;

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeckName.trim()) {
      alert('Please enter a deck name');
      return;
    }

    try {
      await onCreateDeck({
        name: newDeckName.trim(),
        description: newDeckDescription.trim(),
      });
      setNewDeckName('');
      setNewDeckDescription('');
    } catch (error) {
      alert('Cannot create deck: ' + (error as Error).message);
    }
  };

  const handleUpdateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDeckId || !editingDeckName.trim()) {
      return;
    }

    try {
      await onUpdateDeck(editingDeckId, {
        name: editingDeckName.trim(),
        description: editingDeckDescription.trim(),
      });
      setEditingDeckId(null);
    } catch (error) {
      alert('Cannot update deck: ' + (error as Error).message);
    }
  };

  const handleDeleteDeck = async (id: string) => {
    if (!confirm('Are you sure you want to delete this deck? All cards in the deck will be removed from the deck but kept.')) {
      return;
    }

    try {
      await onDeleteDeck(id, false);
      if (selectedDeckId === id) {
        onSelectDeck(null);
      }
    } catch (error) {
      alert('Cannot delete deck: ' + (error as Error).message);
    }
  };

  const handleDeleteDeckWithCards = async (id: string) => {
    if (!confirm('Are you sure you want to delete this deck AND all cards inside? This action cannot be undone.')) {
      return;
    }

    try {
      await onDeleteDeck(id, true);
      if (selectedDeckId === id) {
        onSelectDeck(null);
      }
    } catch (error) {
      alert('Cannot delete deck: ' + (error as Error).message);
    }
  };

  const handleAddToDeck = async (flashcardId: string) => {
    if (!selectedDeckId) {
      alert('Please select a deck first');
      return;
    }

    try {
      await onAddToDeck(selectedDeckId, flashcardId);
    } catch (error) {
      alert('Cannot add card: ' + (error as Error).message);
    }
  };

  const handleRemoveFromDeck = async (deckItemId: string) => {
    try {
      await onRemoveFromDeck(deckItemId);
    } catch (error) {
      alert('Cannot remove card: ' + (error as Error).message);
    }
  };

  // Filter flashcards based on search
  const filteredFlashcards = allFlashcards.filter(
    (card) =>
      card.front.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.back.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (card.kana?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (card.note?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (card.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ?? false)
  );

  // Get flashcards for selected deck
  const selectedDeckFlashcards = selectedDeckId ? (
    (deckItems.get(selectedDeckId) || [])
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map(item => allFlashcards.find(f => f.id === item.flashcardId))
      .filter((f): f is FlashcardItem => f !== undefined)
  ) : [];

  const selectedDeckItems = selectedDeckId ? deckItems.get(selectedDeckId) || [] : [];
  const flashcardInDeck = new Set(selectedDeckFlashcards.map(v => v.id));

  // Handle import
  const handleImport = async () => {
    try {
      const data: FlashcardExport = JSON.parse(importData);
      if (!data.version || !data.decks) {
        throw new Error('Invalid import format');
      }
      await onImportDeck(data);
      setShowImportModal(false);
      setImportData('');
    } catch (error) {
      alert('Cannot import: ' + (error as Error).message);
    }
  };

  // Handle export
  const handleExport = async () => {
    if (!selectedDeckId) {
      alert('Please select a deck to export');
      return;
    }
    try {
      const data = await onExportDeck(selectedDeckId);
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${decks.find(d => d.id === selectedDeckId)?.name || 'deck'}-flashcards.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Cannot export: ' + (error as Error).message);
    }
  };

  return (
    <div className="deck-modal-overlay" onClick={onClose}>
      <div className="deck-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="deck-modal-header">
          <h2>🎴 Flashcard Deck Management</h2>
          <button className="deck-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="deck-modal-tabs">
          <button
            className={`deck-tab-button ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            Manage Decks
          </button>
          <button
            className={`deck-tab-button ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            Add Existing Cards
          </button>
          <button
            className={`deck-tab-button ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            Create New Card
          </button>
        </div>

        {activeTab === 'manage' && (
          <div className="deck-manage-tab">
            {/* Create new deck form */}
            <div className="create-deck-form">
              <h3>Create New Deck</h3>
              <form onSubmit={handleCreateDeck}>
                <div className="form-group">
                  <label htmlFor="deckName">Deck name *</label>
                  <input
                    id="deckName"
                    type="text"
                    value={newDeckName}
                    onChange={(e) => setNewDeckName(e.target.value)}
                    placeholder="Enter deck name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="deckDescription">Description (optional)</label>
                  <input
                    id="deckDescription"
                    type="text"
                    value={newDeckDescription}
                    onChange={(e) => setNewDeckDescription(e.target.value)}
                    placeholder="Brief description"
                  />
                </div>
                <button type="submit" className="btn-primary">
                  Create Deck
                </button>
              </form>
            </div>

            {/* Existing decks */}
            <div className="existing-decks">
              <h3>Created Decks ({decks.length})</h3>
              {decks.length === 0 ? (
                <p className="empty-message">No decks yet. Create your first deck!</p>
              ) : (
                <div className="decks-grid">
                  {decks.map((deck) => (
                    <div key={deck.id} className="deck-card">
                      <div className="deck-header">
                        <span className="deck-icon" style={{ fontSize: '1.5rem' }}>
                          {deck.icon || '🎴'}
                        </span>
                        {editingDeckId === deck.id ? (
                          <form onSubmit={handleUpdateDeck} className="edit-form">
                            <input
                              type="text"
                              value={editingDeckName}
                              onChange={(e) => setEditingDeckName(e.target.value)}
                              autoFocus
                            />
                            <button type="submit" className="btn-save" title="Save">
                              ✓
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingDeckId(null)}
                              className="btn-cancel"
                              title="Cancel"
                            >
                              ×
                            </button>
                          </form>
                        ) : (
                          <>
                            <span className="deck-name">{deck.name}</span>
                            <div className="deck-actions">
                              <button
                                onClick={() => setEditingDeckId(deck.id)}
                                className="btn-edit"
                                title="Edit"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteDeck(deck.id)}
                                className="btn-delete"
                                title="Remove from deck (keep card)"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteDeckWithCards(deck.id)}
                                className="btn-delete-all"
                                title="Delete deck + all cards"
                              >
                                🗑️
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="deck-info">
                        <span className="deck-count">
                          {(deckItems.get(deck.id) || []).length} cards
                        </span>
                        <span className="deck-date">
                          Created: {new Date(deck.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="deck-description">
                        {deck.description || 'No description'}
                      </div>
                      <div className="deck-action-buttons">
                        <button
                          className={`btn-select-deck ${selectedDeckId === deck.id ? 'selected' : ''}`}
                          onClick={() => onSelectDeck(selectedDeckId === deck.id ? null : deck.id)}
                        >
                          {selectedDeckId === deck.id ? 'Selected' : 'Select'}
                        </button>
                        <button
                          className="btn-export"
                          onClick={async () => {
                            await handleExport();
                          }}
                        >
                          📥 Export
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'add' && selectedDeckId && (
          <div className="deck-add-tab">
            <div className="selected-deck-info">
              <h3>
                Add Cards to "{decks.find(d => d.id === selectedDeckId)?.name}"
              </h3>
              <p>
                Already {selectedDeckFlashcards.length} cards in deck
              </p>
            </div>

            <div className="deck-search-section">
              <div className="deck-search-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Search flashcards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="clear-search">
                    ×
                  </button>
                )}
              </div>
            </div>

            <div className="deck-flashcard-grid">
              {filteredFlashcards.length === 0 ? (
                <p className="empty-message">No cards found</p>
              ) : (
                filteredFlashcards.slice(0, 50).map((card) => {
                  const isInDeck = flashcardInDeck.has(card.id);
                  const item = selectedDeckItems.find(i => i.flashcardId === card.id);

                  return (
                    <div
                      key={card.id}
                      className={`deck-flashcard-card ${isInDeck ? 'in-deck' : ''}`}
                    >
                      <div className="deck-flashcard-content">
                        <div className="deck-flashcard-front">{card.front}</div>
                        {card.kana && <div className="deck-flashcard-kana">{card.kana}</div>}
                        <div className="deck-flashcard-back">{card.back}</div>
                      </div>
                      <div className="deck-flashcard-actions">
                        {isInDeck && item && (
                          <button
                            className="btn-edit-flashcard"
                            onClick={() => setEditingCardId(card.id)}
                            title="Edit"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                        )}
                        <button
                          className={`btn-deck-add-remove ${isInDeck ? 'remove' : 'add'}`}
                          onClick={() => {
                            if (isInDeck && item) {
                              handleRemoveFromDeck(item.id);
                            } else {
                              handleAddToDeck(card.id);
                            }
                          }}
                          disabled={isInDeck && !item}
                        >
                          {isInDeck ? '✓ Added' : '+ Add'}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {filteredFlashcards.length > 50 && (
              <p className="more-results">
                Showing first 50 results. Please search more specifically.
              </p>
            )}
          </div>
        )}

        {activeTab === 'add' && !selectedDeckId && (
          <div className="no-deck-selected">
            <p>Please select a deck before adding cards</p>
            <button onClick={() => setActiveTab('manage')} className="btn-primary">
              Select Deck
            </button>
          </div>
        )}

        {/* Create New Flashcard Tab */}
        {activeTab === 'create' && (
          <div className="deck-create-tab">
            {selectedDeckId ? (
              <div className="deck-create-content">
                <div className="selected-deck-info">
                  <h3>
                    Create New Card for "{decks.find(d => d.id === selectedDeckId)?.name}"
                  </h3>
                  <p>
                    The new card will be added directly to this deck.
                  </p>
                </div>

                <FlashcardForm
                  onSubmit={async (data: CreateFlashcardDto | UpdateFlashcardDto) => {
                    setIsCreatingCard(true);
                    try {
                      // Create the flashcard
                      const newCard = await onCreateFlashcard(data as CreateFlashcardDto);

                      // After creating, add it to the selected deck
                      if (selectedDeckId && newCard?.id) {
                        await onAddToDeck(selectedDeckId, newCard.id);
                      }

                      // Reset and go back to add tab
                      setIsCreatingCard(false);
                      setActiveTab('add');
                    } catch (error) {
                      setIsCreatingCard(false);
                      alert('Cannot create card: ' + (error as Error).message);
                    }
                  }}
                  onCancel={() => setActiveTab('add')}
                  isLoading={isCreatingCard}
                  allFlashcards={allFlashcards}
                />
              </div>
            ) : (
              <div className="no-deck-selected">
                <p>Please select a deck before creating a new card</p>
                <button onClick={() => setActiveTab('manage')} className="btn-primary">
                  Select Deck
                </button>
              </div>
            )}
          </div>
        )}

        {/* Edit Flashcard Modal */}
        {editingCardId && (
          <div className="edit-flashcard-overlay" onClick={() => setEditingCardId(null)}>
            <div className="edit-flashcard-content" onClick={(e) => e.stopPropagation()}>
              <div className="edit-flashcard-header">
                <h3>🎴 Edit Flashcard</h3>
                <button className="close-edit" onClick={() => setEditingCardId(null)}>
                  ×
                </button>
              </div>

              {(() => {
                const cardToEdit = allFlashcards.find(c => c.id === editingCardId);
                if (!cardToEdit) return null;

                return (
                  <FlashcardForm
                    onSubmit={async (data: CreateFlashcardDto | UpdateFlashcardDto) => {
                      try {
                        await onUpdateFlashcard(editingCardId, data as UpdateFlashcardDto);
                        setEditingCardId(null);
                        // Force refresh
                        setActiveTab('manage');
                        setTimeout(() => setActiveTab('add'), 100);
                      } catch (error) {
                        alert('Cannot update card: ' + (error as Error).message);
                      }
                    }}
                    onCancel={() => setEditingCardId(null)}
                    isLoading={false}
                    allFlashcards={allFlashcards.filter(c => c.id !== editingCardId)}
                    editingCard={cardToEdit}
                  />
                );
              })()}
            </div>
          </div>
        )}

        {/* Import Modal */}
        {showImportModal && (
          <div className="import-overlay" onClick={() => setShowImportModal(false)}>
            <div className="import-content" onClick={(e) => e.stopPropagation()}>
              <div className="import-header">
                <h3>📥 Import Deck</h3>
                <button className="close-import" onClick={() => setShowImportModal(false)}>
                  ×
                </button>
              </div>
              <div className="import-body">
                <p>Paste the JSON content of the deck below:</p>
                <textarea
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  placeholder='{"version":"1.0.0","decks":[...]}'
                  rows={10}
                />
                <div className="import-actions">
                  <button className="btn-cancel" onClick={() => setShowImportModal(false)}>
                    Cancel
                  </button>
                  <button className="btn-import" onClick={handleImport}>
                    Import
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardDeckModal;
