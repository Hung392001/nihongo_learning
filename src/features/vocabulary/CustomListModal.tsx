import React, { useState, useEffect } from 'react';
import type { CustomList, ListItem } from './vocabulary';
import type { VocabularyItem, CreateVocabularyDto, UpdateVocabularyDto } from './vocabulary';
import './CustomListModal.css';
import { VocabularyForm } from './VocabularyForm';

interface CustomListModalProps {
  isOpen: boolean;
  onClose: () => void;
  customLists: CustomList[];
  onCreateList: (name: string, description?: string) => Promise<void>;
  onDeleteList: (id: string) => Promise<void>;
  onUpdateList: (id: string, updates: Partial<CustomList>) => Promise<void>;
  allVocabulary: VocabularyItem[];
  onAddToList: (listId: string, vocabularyId: string) => Promise<void>;
  onRemoveFromList: (itemId: string) => Promise<void>;
  onCreateVocabulary: (data: CreateVocabularyDto) => Promise<VocabularyItem>;
  onUpdateVocabulary: (id: string, data: UpdateVocabularyDto) => Promise<VocabularyItem>;
  selectedListId: string | null;
  onSelectList: (id: string | null) => void;
  listVocabulary: Map<string, VocabularyItem[]>;
  listItems: Map<string, ListItem[]>;
}

export const CustomListModal: React.FC<CustomListModalProps> = ({
  isOpen,
  onClose,
  customLists,
  onCreateList,
  onDeleteList,
  onUpdateList,
  allVocabulary,
  onAddToList,
  onRemoveFromList,
  onCreateVocabulary,
  onUpdateVocabulary,
  selectedListId,
  onSelectList,
  listVocabulary,
  listItems,
}) => {
  const [activeTab, setActiveTab] = useState<'manage' | 'add' | 'create'>('manage');
  const [newListName, setNewListName] = useState('');
  const [newListDescription, setNewListDescription] = useState('');
  const [editingListId, setEditingListId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [editingDescription, setEditingDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatingVocab, setIsCreatingVocab] = useState(false);
  const [editingVocabId, setEditingVocabId] = useState<string | null>(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setActiveTab('manage');
      setNewListName('');
      setNewListDescription('');
      setEditingListId(null);
      setSearchQuery('');
      setIsCreatingVocab(false);
      setEditingVocabId(null);
    }
  }, [isOpen]);

  // Reset editing state when editingListId changes
  useEffect(() => {
    if (editingListId) {
      const list = customLists.find(l => l.id === editingListId);
      if (list) {
        setEditingName(list.name);
        setEditingDescription(list.description || '');
      }
    }
  }, [editingListId, customLists]);

  if (!isOpen) return null;

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) {
      alert('Please enter a list name');
      return;
    }

    try {
      await onCreateList(newListName.trim(), newListDescription.trim());
      setNewListName('');
      setNewListDescription('');
    } catch (error) {
      alert('Cannot create list: ' + (error as Error).message);
    }
  };

  const handleUpdateList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingListId || !editingName.trim()) {
      return;
    }

    try {
      await onUpdateList(editingListId, {
        name: editingName.trim(),
        description: editingDescription.trim(),
      });
      setEditingListId(null);
    } catch (error) {
      alert('Cannot update list: ' + (error as Error).message);
    }
  };

  const handleDeleteList = async (id: string) => {
    if (!confirm('Are you sure you want to delete this list? All vocabulary in the list will also be removed from the list.')) {
      return;
    }

    try {
      await onDeleteList(id);
      if (selectedListId === id) {
        onSelectList(null);
      }
    } catch (error) {
      alert('Cannot delete list: ' + (error as Error).message);
    }
  };

  const handleAddToList = async (vocabularyId: string) => {
    if (!selectedListId) {
      alert('Please select a list first');
      return;
    }

    try {
      await onAddToList(selectedListId, vocabularyId);
    } catch (error) {
      alert('Cannot add vocabulary: ' + (error as Error).message);
    }
  };

  const handleRemoveFromList = async (itemId: string) => {
    try {
      await onRemoveFromList(itemId);
    } catch (error) {
      alert('Cannot remove vocabulary: ' + (error as Error).message);
    }
  };

  // Filter vocabulary based on search
  const filteredVocabulary = allVocabulary.filter(
    (vocab) =>
      vocab.hiragana.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (vocab.kanji || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      vocab.vietnamese.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get vocabulary for selected list
  const selectedListVocabulary = selectedListId ? listVocabulary.get(selectedListId) || [] : [];
  const selectedListItems = selectedListId ? listItems.get(selectedListId) || [] : [];

  // Create a map for quick lookup
  const vocabularyInList = new Set(selectedListVocabulary.map(v => v.id));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📝 Manage Vocabulary Lists</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-tabs">
          <button
            className={`tab-button ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            Manage Lists
          </button>
          <button
            className={`tab-button ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            Add Existing Vocabulary
          </button>
          <button
            className={`tab-button ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            Create New Vocabulary
          </button>
        </div>

        {activeTab === 'manage' && (
          <div className="manage-tab">
            {/* Create new list form */}
            <div className="create-list-form">
              <h3>Create New List</h3>
              <form onSubmit={handleCreateList}>
                <div className="form-group">
                  <label htmlFor="listName">List Name *</label>
                  <input
                    id="listName"
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="Enter list name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="listDescription">Description (optional)</label>
                  <input
                    id="listDescription"
                    type="text"
                    value={newListDescription}
                    onChange={(e) => setNewListDescription(e.target.value)}
                    placeholder="Brief description"
                  />
                </div>
                <button type="submit" className="btn-primary">
                  Create List
                </button>
              </form>
            </div>

            {/* Existing lists */}
            <div className="existing-lists">
              <h3>Created Lists ({customLists.length})</h3>
              {customLists.length === 0 ? (
                <p className="empty-message">No lists yet. Create your first list!</p>
              ) : (
                <div className="lists-grid">
                  {customLists.map((list) => (
                    <div key={list.id} className="list-card">
                      <div className="list-header">
                        <span className="list-icon" style={{ fontSize: '1.5rem' }}>
                          {list.icon || '📝'}
                        </span>
                        {editingListId === list.id ? (
                          <form onSubmit={handleUpdateList} className="edit-form">
                            <input
                              type="text"
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              autoFocus
                            />
                            <button type="submit" className="btn-save" title="Save">
                              ✓
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingListId(null)}
                              className="btn-cancel"
                              title="Cancel"
                            >
                              ×
                            </button>
                          </form>
                        ) : (
                          <>
                            <span className="list-name">{list.name}</span>
                            <div className="list-actions">
                              <button
                                onClick={() => setEditingListId(list.id)}
                                className="btn-edit"
                                title="Edit"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete list "${list.name}"?`)) {
                                    handleDeleteList(list.id);
                                  }
                                }}
                                className="btn-delete"
                                title="Delete"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="list-info">
                        <span className="list-count">
                          {listVocabulary.get(list.id)?.length || 0} vocabulary
                        </span>
                        <span className="list-date">
                          Created: {new Date(list.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="list-description">
                        {list.description || 'No description'}
                      </div>
                      <button
                        className={`btn-select ${selectedListId === list.id ? 'selected' : ''}`}
                        onClick={() => onSelectList(selectedListId === list.id ? null : list.id)}
                      >
                        {selectedListId === list.id ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'add' && selectedListId && (
          <div className="add-tab">
            <div className="selected-list-info">
              <h3>
                Add Vocabulary to "{customLists.find(l => l.id === selectedListId)?.name}"
              </h3>
              <p>
                Already has {selectedListVocabulary.length} vocabulary in the list
              </p>
            </div>

            <div className="search-section">
              <div className="search-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Search vocabulary..."
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

            <div className="vocabulary-grid">
              {filteredVocabulary.length === 0 ? (
                <p className="empty-message">No vocabulary found</p>
              ) : (
                filteredVocabulary.slice(0, 50).map((vocab) => {
                  const isInList = vocabularyInList.has(vocab.id);
                  const item = selectedListItems.find(i => i.vocabularyId === vocab.id);

                  return (
                    <div
                      key={vocab.id}
                      className={`vocab-card ${isInList ? 'in-list' : ''}`}
                    >
                      <div className="vocab-content">
                        <div className="vocab-hiragana">{vocab.hiragana}</div>
                        {vocab.kanji && <div className="vocab-kanji">{vocab.kanji}</div>}
                        <div className="vocab-vietnamese">{vocab.vietnamese}</div>
                      </div>
                      <div className="vocab-actions">
                        {isInList && item && (
                          <button
                            className="btn-edit-vocab"
                            onClick={() => setEditingVocabId(vocab.id)}
                            title="Edit"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                        )}
                        <button
                          className={`btn-add-remove ${isInList ? 'remove' : 'add'}`}
                          onClick={() => {
                            if (isInList && item) {
                              handleRemoveFromList(item.id);
                            } else {
                              handleAddToList(vocab.id);
                            }
                          }}
                          disabled={isInList && !item}
                        >
                          {isInList ? '✓ Added' : '+ Add'}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {filteredVocabulary.length > 50 && (
              <p className="more-results">
                Showing first 50 results. Please search more specifically.
              </p>
            )}
          </div>
        )}

        {activeTab === 'add' && !selectedListId && (
          <div className="no-list-selected">
            <p>Please select a list before adding vocabulary</p>
            <button onClick={() => setActiveTab('manage')} className="btn-primary">
              Select List
            </button>
          </div>
        )}

        {/* Create New Vocabulary Tab */}
        {activeTab === 'create' && (
          <div className="create-vocabulary-tab">
            {selectedListId ? (
              <div className="create-vocabulary-content">
                <div className="selected-list-info">
                  <h3>
                    Create New Vocabulary for "{customLists.find(l => l.id === selectedListId)?.name}"
                  </h3>
                  <p>
                    New vocabulary will be added directly to this list and saved to the system.
                  </p>
                </div>

                <VocabularyForm
                  onSubmit={async (data: CreateVocabularyDto | UpdateVocabularyDto) => {
                    setIsCreatingVocab(true);
                    try {
                      // Create the vocabulary item
                      const newVocab = await onCreateVocabulary(data as CreateVocabularyDto);

                      // After creating, add it to the selected list
                      if (selectedListId && newVocab?.id) {
                        await onAddToList(selectedListId, newVocab.id);
                      }

                      // Reset and go back to add tab
                      setIsCreatingVocab(false);
                      setActiveTab('add');
                    } catch (error) {
                      setIsCreatingVocab(false);
                      alert('Cannot create vocabulary: ' + (error as Error).message);
                    }
                  }}
                  onCancel={() => setActiveTab('add')}
                  isLoading={isCreatingVocab}
                  allVocabulary={allVocabulary}
                />
              </div>
            ) : (
              <div className="no-list-selected">
                <p>Please select a list before creating new vocabulary</p>
                <button onClick={() => setActiveTab('manage')} className="btn-primary">
                  Select List
                </button>
              </div>
            )}
          </div>
        )}

        {/* Edit Vocabulary Modal (overlay on top of existing modal) */}
        {editingVocabId && (
          <div className="edit-vocab-overlay" onClick={() => setEditingVocabId(null)}>
            <div className="edit-vocab-content" onClick={(e) => e.stopPropagation()}>
              <div className="edit-vocab-header">
                <h3>📝 Edit Vocabulary</h3>
                <button className="close-edit" onClick={() => setEditingVocabId(null)}>
                  ×
                </button>
              </div>

              {(() => {
                const vocabToEdit = allVocabulary.find(v => v.id === editingVocabId);
                if (!vocabToEdit) return null;

                return (
                  <VocabularyForm
                    onSubmit={async (data: CreateVocabularyDto | UpdateVocabularyDto) => {
                      try {
                        await onUpdateVocabulary(editingVocabId, data as UpdateVocabularyDto);
                        setEditingVocabId(null);
                        // Refresh the list
                        if (selectedListId) {
                          // Force refresh by toggling tab
                          setActiveTab('manage');
                          setTimeout(() => setActiveTab('add'), 100);
                        }
                      } catch (error) {
                        alert('Cannot update vocabulary: ' + (error as Error).message);
                      }
                    }}
                    onCancel={() => setEditingVocabId(null)}
                    isLoading={false}
                    allVocabulary={allVocabulary.filter(v => v.id !== editingVocabId)}
                    editingVocab={vocabToEdit}
                  />
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
