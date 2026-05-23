import React, { useState, useMemo } from 'react';
import type { FlashcardItem, FlashcardDeck, DeckItem, CreateFlashcardDto, UpdateFlashcardDto } from './flashcard';
import type { CreateDeckDto, UpdateDeckDto, FlashcardSortOption, FlashcardFilter, FlashcardExport } from './flashcard';
import { FlashcardDeckModal } from './FlashcardDeckModal';
import { FlashcardForm } from './FlashcardForm';
import './FlashcardManager.css';

interface FlashcardManagerProps {
  allFlashcards: FlashcardItem[];
  decks: FlashcardDeck[];
  deckItems: Map<string, DeckItem[]>;
  onCreateFlashcard: (data: CreateFlashcardDto) => Promise<FlashcardItem>;
  onUpdateFlashcard: (id: string, data: UpdateFlashcardDto) => Promise<FlashcardItem>;
  onDeleteFlashcard: (id: string) => Promise<void>;
  onCreateDeck: (data: CreateDeckDto) => Promise<FlashcardDeck>;
  onUpdateDeck: (id: string, data: UpdateDeckDto) => Promise<FlashcardDeck>;
  onDeleteDeck: (id: string, deleteCards?: boolean) => Promise<void>;
  onAddToDeck: (deckId: string, flashcardId: string, note?: string) => Promise<DeckItem>;
  onRemoveFromDeck: (deckItemId: string) => Promise<void>;
  selectedDeckId: string | null;
  onSelectDeck: (id: string | null) => void;
  onImportDeck: (data: FlashcardExport) => Promise<string>;
  onExportDeck: (deckId: string) => Promise<FlashcardExport>;
}

const DIFFICULTY_LABELS: Record<number, string> = {
  1: 'N5',
  2: 'N4',
  3: 'N3',
  4: 'N2',
  5: 'N1',
};

const SORT_LABELS: Record<FlashcardSortOption, string> = {
  newest: 'Mới nhất',
  oldest: 'Cũ nhất',
  az: 'A → Z (mặt trước)',
  za: 'Z → A (mặt trước)',
  'difficulty-asc': 'Độ khó: Dễ → Khó',
  'difficulty-desc': 'Độ khó: Khó → Dễ',
  'favorite-first': 'Yêu thích trước',
};

export const FlashcardManager: React.FC<FlashcardManagerProps> = ({
  allFlashcards,
  decks,
  deckItems,
  onCreateFlashcard,
  onUpdateFlashcard,
  onDeleteFlashcard,
  onCreateDeck,
  onUpdateDeck,
  onDeleteDeck,
  onAddToDeck,
  onRemoveFromDeck,
  selectedDeckId,
  onSelectDeck,
  onImportDeck,
  onExportDeck,
}) => {
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);
  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [selectedFlashcards, setSelectedFlashcards] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<FlashcardSortOption>('newest');
  const [filter, setFilter] = useState<FlashcardFilter>({});
  const [showImportModal, setShowImportModal] = useState(false);
  const [importData, setImportData] = useState('');

  // Get flashcards for current view
  const filteredFlashcards = useMemo(() => {
    let result = [...allFlashcards];

    // Apply deck filter if a deck is selected
    if (selectedDeckId) {
      const deckFlashcardIds = new Set(
        (deckItems.get(selectedDeckId) || []).map(item => item.flashcardId)
      );
      result = result.filter(f => deckFlashcardIds.has(f.id));
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(f =>
        f.front.toLowerCase().includes(lowerQuery) ||
        f.back.toLowerCase().includes(lowerQuery) ||
        (f.kana?.toLowerCase().includes(lowerQuery) ?? false) ||
        (f.note?.toLowerCase().includes(lowerQuery) ?? false) ||
        (f.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ?? false)
      );
    }

    // Apply tag filter
    if (filter.tags?.length) {
      result = result.filter(f =>
        f.tags && filter.tags!.some(tag => f.tags!.includes(tag))
      );
    }

    // Apply difficulty filter
    if (filter.difficulty) {
      result = result.filter(f => f.difficulty === filter.difficulty);
    }

    // Apply favorite filter
    if (filter.isFavorite) {
      result = result.filter(f => f.isFavorite);
    }

    return result;
  }, [allFlashcards, selectedDeckId, deckItems, searchQuery, filter]);

  // Sort flashcards
  const sortedFlashcards = useMemo(() => {
    const sorted = [...filteredFlashcards];
    
    switch (sortBy) {
      case 'newest':
        sorted.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case 'oldest':
        sorted.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case 'az':
        sorted.sort((a, b) => a.front.localeCompare(b.front, 'vi'));
        break;
      case 'za':
        sorted.sort((a, b) => b.front.localeCompare(a.front, 'vi'));
        break;
      case 'difficulty-asc':
        sorted.sort((a, b) => (a.difficulty ?? 0) - (b.difficulty ?? 0));
        break;
      case 'difficulty-desc':
        sorted.sort((a, b) => (b.difficulty ?? 0) - (a.difficulty ?? 0));
        break;
      case 'favorite-first':
        sorted.sort((a, b) => (b.isFavorite === a.isFavorite ? 0 : b.isFavorite ? 1 : -1));
        break;
    }
    
    return sorted;
  }, [filteredFlashcards, sortBy]);

  // Get statistics
  const stats = useMemo(() => ({
    total: filteredFlashcards.length,
    byDifficulty: Array.from({ length: 5 }, (_, i) => ({
      level: (i + 1) as 1 | 2 | 3 | 4 | 5,
      label: DIFFICULTY_LABELS[i + 1],
      count: filteredFlashcards.filter(f => f.difficulty === i + 1).length,
    })),
    favorites: filteredFlashcards.filter(f => f.isFavorite).length,
    withTags: filteredFlashcards.filter(f => f.tags && f.tags.length > 0).length,
    withKana: filteredFlashcards.filter(f => f.kana).length,
    withAudio: filteredFlashcards.filter(f => f.audioUrl).length,
  }), [filteredFlashcards]);

  const handleCreateCard = async (data: CreateFlashcardDto | UpdateFlashcardDto) => {
    try {
      // If data has an id, it's an update (from editing existing card via create form)
      // But in create mode, we treat it as create
      const newCard = await onCreateFlashcard(data as CreateFlashcardDto);
      if (selectedDeckId && newCard.id) {
        await onAddToDeck(selectedDeckId, newCard.id);
      }
      setIsCreatingCard(false);
    } catch (error) {
      alert('Không thể tạo thẻ: ' + (error as Error).message);
      setIsCreatingCard(false);
    }
  };

  const handleUpdateCard = async (id: string, data: UpdateFlashcardDto) => {
    try {
      await onUpdateFlashcard(id, data);
      setEditingCardId(null);
    } catch (error) {
      alert('Không thể cập nhật thẻ: ' + (error as Error).message);
    }
  };

  const handleDeleteCard = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa thẻ này?')) {
      return;
    }
    try {
      await onDeleteFlashcard(id);
      setSelectedFlashcards(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } catch (error) {
      alert('Không thể xóa thẻ: ' + (error as Error).message);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedFlashcards.size === 0) {
      alert('Vui lòng chọn ít nhất một thẻ để xóa');
      return;
    }
    
    if (!confirm(`Bạn có chắc muốn xóa ${selectedFlashcards.size} thẻ đã chọn?`)) {
      return;
    }
    
    try {
      for (const id of selectedFlashcards) {
        await onDeleteFlashcard(id);
      }
      setSelectedFlashcards(new Set());
    } catch (error) {
      alert('Không thể xóa các thẻ: ' + (error as Error).message);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedFlashcards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedFlashcards.size === sortedFlashcards.length) {
      setSelectedFlashcards(new Set());
    } else {
      setSelectedFlashcards(new Set(sortedFlashcards.map(f => f.id)));
    }
  };

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
      alert('Không thể nhập khẩu: ' + (error as Error).message);
    }
  };

  return (
    <div className="flashcard-manager">
      {/* Header */}
      <div className="flashcard-manager-header">
        <div className="header-left">
          <h2>🎴 Quản lý Flashcard</h2>
          <p>
            {selectedDeckId 
              ? `Bộ thẻ: "${decks.find(d => d.id === selectedDeckId)?.name || 'Unknown'}" - ${stats.total} thẻ`
              : `${stats.total} thẻ flashcard`
            }
          </p>
        </div>
        <div className="header-actions">
          <button
            className="btn-secondary"
            onClick={() => setIsDeckModalOpen(true)}
          >
            📁 Quản lý Bộ Thẻ
          </button>
          <button
            className="btn-primary"
            onClick={() => setIsCreatingCard(true)}
          >
            + Tạo Thẻ Mới
          </button>
        </div>
      </div>

      {/* Deck Selector */}
      <div className="deck-selector-row">
        <div className="deck-selector">
          <label>Chọn bộ thẻ:</label>
          <select
            value={selectedDeckId || ''}
            onChange={(e) => onSelectDeck(e.target.value ? e.target.value : null)}
          >
            <option value="">Tất cả thẻ</option>
            {decks.map(deck => (
              <option key={deck.id} value={deck.id}>
                {deck.name} ({deckItems.get(deck.id)?.length || 0} thẻ)
              </option>
            ))}
          </select>
        </div>
        
        <div className="manager-actions">
          <button
            className="btn-import"
            onClick={() => setShowImportModal(true)}
          >
            📥 Nhập Khẩu
          </button>
          <button
            className="btn-export-all"
            onClick={async () => {
              // Export all decks
              // This would need to be implemented in the parent component
              alert('Chức năng xuất tất cả sẽ được thêm sau');
            }}
          >
            📤 Xuất Tất Cả
          </button>
          {selectedFlashcards.size > 0 && (
            <button
              className="btn-delete-selected"
              onClick={handleDeleteSelected}
            >
              🗑️ Xóa Đã Chọn ({selectedFlashcards.size})
            </button>
          )}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="search-filter-row">
        <div className="search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm thẻ flashcard..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="clear-search">
              ×
            </button>
          )}
        </div>
        
        <div className="sort-filter-controls">
          <div className="sort-selector">
            <label>Sắp xếp:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as FlashcardSortOption)}
            >
              {Object.entries(SORT_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          
          <div className="difficulty-filter">
            <label>Độ khó:</label>
            <select
              value={filter.difficulty || ''}
              onChange={(e) => setFilter(prev => ({
                ...prev,
                difficulty: e.target.value ? parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 : undefined,
              }))}
            >
              <option value="">Tất cả</option>
              {Array.from({ length: 5 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{DIFFICULTY_LABELS[i + 1]}</option>
              ))}
            </select>
          </div>
          
          <div className="favorite-filter">
            <label>
              <input
                type="checkbox"
                checked={filter.isFavorite || false}
                onChange={(e) => setFilter(prev => ({
                  ...prev,
                  isFavorite: e.target.checked,
                }))}
              />
              <span>Chỉ yêu thích</span>
            </label>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="flashcard-stats">
        <div className="stat-card total">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Tổng thẻ</span>
        </div>
        <div className="stat-card favorites">
          <span className="stat-value">❤️ {stats.favorites}</span>
          <span className="stat-label">Yêu thích</span>
        </div>
        <div className="stat-card with-tags">
          <span className="stat-value">{stats.withTags}</span>
          <span className="stat-label">Có tags</span>
        </div>
        <div className="stat-card decks">
          <span className="stat-value">{decks.length}</span>
          <span className="stat-label">Bộ thẻ</span>
        </div>
        
        {stats.byDifficulty.map((d) => (
          <div key={d.level} className="stat-card difficulty">
            <span className="stat-value">{d.count}</span>
            <span className="stat-label">{d.label}</span>
          </div>
        ))}
      </div>

      {/* Flashcard List */}
      <div className="flashcard-list">
        {sortedFlashcards.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎴</div>
            <h3>Không có thẻ flashcard nào</h3>
            <p>Bắt đầu bằng cách tạo thẻ mới hoặc nhập khẩu từ file</p>
            <button className="btn-create-first" onClick={() => setIsCreatingCard(true)}>
              + Tạo Thẻ Đầu Tiên
            </button>
          </div>
        ) : (
          <>
            <div className="list-header">
              <label className="select-all">
                <input
                  type="checkbox"
                  checked={selectedFlashcards.size === sortedFlashcards.length && sortedFlashcards.length > 0}
                  onChange={toggleSelectAll}
                />
                <span>Chọn tất cả ({sortedFlashcards.length})</span>
              </label>
            </div>
            
            <div className="flashcard-grid">
              {sortedFlashcards.map((card) => (
                <div
                  key={card.id}
                  className={`flashcard-item-card ${selectedFlashcards.has(card.id) ? 'selected' : ''} ${card.isFavorite ? 'favorite' : ''}`}
                  onClick={(e) => {
                    // Don't toggle if clicking on buttons
                    if ((e.target as HTMLElement).tagName !== 'BUTTON') {
                      toggleSelect(card.id);
                    }
                  }}
                >
                  <div className="flashcard-item-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedFlashcards.has(card.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleSelect(card.id);
                      }}
                    />
                  </div>
                  
                  <div className="flashcard-item-content">
                    <div className="flashcard-item-front">{card.front}</div>
                    {card.kana && <div className="flashcard-item-kana">{card.kana}</div>}
                    <div className="flashcard-item-back">{card.back}</div>
                    
                    <div className="flashcard-item-meta">
                      {card.difficulty && (
                        <span className="difficulty-badge" style={{ background: ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'][card.difficulty - 1] }}>
                          {DIFFICULTY_LABELS[card.difficulty]}
                        </span>
                      )}
                      {card.isFavorite && <span className="favorite-icon">❤️</span>}
                      {card.tags?.length && (
                        <div className="flashcard-item-tags">
                          {card.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="tag-badge">{tag}</span>
                          ))}
                          {card.tags.length > 2 && <span className="tag-badge">+{card.tags.length - 2}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flashcard-item-actions">
                    <button
                      className="btn-edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingCardId(card.id);
                      }}
                      title="Chỉnh sửa"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button
                      className="btn-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCard(card.id);
                      }}
                      title="Xóa"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Create Card Modal */}
      {isCreatingCard && (
        <div className="modal-overlay" onClick={() => setIsCreatingCard(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🎴 Tạo Thẻ Flashcard Mới</h3>
              <button className="modal-close" onClick={() => setIsCreatingCard(false)}>
                ×
              </button>
            </div>
            <FlashcardForm
              onSubmit={handleCreateCard}
              onCancel={() => setIsCreatingCard(false)}
              isLoading={isCreatingCard}
              allFlashcards={allFlashcards}
            />
          </div>
        </div>
      )}

      {/* Edit Card Modal */}
      {editingCardId && (
        <div className="modal-overlay" onClick={() => setEditingCardId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🎴 Chỉnh Sửa Thẻ Flashcard</h3>
              <button className="modal-close" onClick={() => setEditingCardId(null)}>
                ×
              </button>
            </div>
            <FlashcardForm
              onSubmit={(data) => handleUpdateCard(editingCardId, data as UpdateFlashcardDto)}
              onCancel={() => setEditingCardId(null)}
              isLoading={false}
              allFlashcards={allFlashcards.filter(c => c.id !== editingCardId)}
              editingCard={allFlashcards.find(c => c.id === editingCardId) || null}
            />
          </div>
        </div>
      )}

      {/* Deck Modal */}
      <FlashcardDeckModal
        isOpen={isDeckModalOpen}
        onClose={() => setIsDeckModalOpen(false)}
        decks={decks}
        allFlashcards={allFlashcards}
        deckItems={deckItems}
        onCreateDeck={onCreateDeck}
        onUpdateDeck={onUpdateDeck}
        onDeleteDeck={onDeleteDeck}
        onUpdateFlashcard={onUpdateFlashcard}
        onDeleteFlashcard={onDeleteFlashcard}
        onAddToDeck={onAddToDeck}
        onRemoveFromDeck={onRemoveFromDeck}
        selectedDeckId={selectedDeckId}
        onSelectDeck={onSelectDeck}
        onImportDeck={onImportDeck}
        onExportDeck={onExportDeck}
      />

      {/* Import Modal */}
      {showImportModal && (
        <div className="modal-overlay" onClick={() => setShowImportModal(false)}>
          <div className="import-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📥 Nhập Khẩu Thẻ Flashcard</h3>
              <button className="modal-close" onClick={() => setShowImportModal(false)}>
                ×
              </button>
            </div>
            <div className="import-body">
              <p>Dán nội dung JSON của bộ thẻ hoặc danh sách thẻ vào dưới đây:</p>
              <textarea
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                placeholder='{"version":"1.0.0","decks":[{"deck":{"name":"..."},"cards":[...]}]}'
                rows={10}
              />
              <div className="import-actions">
                <button className="btn-cancel" onClick={() => setShowImportModal(false)}>
                  Hủy
                </button>
                <button className="btn-import" onClick={handleImport}>
                  Nhập Khẩu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardManager;
