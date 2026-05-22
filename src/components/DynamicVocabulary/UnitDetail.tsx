import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { VocabularyUnit, VocabularyUnitItem } from '../../types/vocabulary';
import { dynamicVocabularyStorage } from '../../services/DynamicVocabularyStorage';
import { VocabularyItemCard } from './VocabularyItemCard';
import { CreateVocabularyItemModal } from './CreateVocabularyItemModal';
import { EditVocabularyItemModal } from './EditVocabularyItemModal';
import './DynamicVocabulary.css';

export const UnitDetail: React.FC = () => {
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();
  const [unit, setUnit] = useState<VocabularyUnit | null>(null);
  const [items, setItems] = useState<VocabularyUnitItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState<VocabularyUnitItem | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  // Load unit and items with retry mechanism
  const loadData = useCallback(async (retryCount: number = 0) => {
    if (!unitId) return;

    try {
      setLoading(true);
      setError(null);
      
      const [unitData, itemsData] = await Promise.all([
        dynamicVocabularyStorage.getUnitById(unitId),
        dynamicVocabularyStorage.getItemsByUnit(unitId),
      ]);

      if (!unitData) {
        setError('Unit not found');
        setLoading(false);
        return;
      }

      // Sort items by displayOrder
      const sortedItems = [...itemsData].sort((a, b) => a.displayOrder - b.displayOrder);
      setUnit(unitData);
      setItems(sortedItems);
      setLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load unit data';
      console.error('Error loading unit data:', err);
      
      // If it's a connection error and we haven't retried too many times, try again
      if (retryCount < 10 && (errorMessage.includes('Failed to fetch') || errorMessage.includes('ECONNREFUSED') || errorMessage.includes('500'))) {
        setTimeout(() => loadData(retryCount + 1), 2000);
        setError(`Waiting for server... (attempt ${retryCount + 1}/10)`);
      } else {
        setError(errorMessage);
        setLoading(false);
      }
    }
  }, [unitId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle item creation
  const handleCreateItem = async (data: {
    hiragana: string;
    kanji?: string;
    vietnamese: string;
    hiraganaSentence?: string;
  }) => {
    if (!unitId) return;

    try {
      const maxOrder = Math.max(...items.map(i => i.displayOrder), 0);
      const newItem = await dynamicVocabularyStorage.createItem(unitId, {
        ...data,
        displayOrder: maxOrder + 1,
      });
      setItems(prev => [...prev, newItem].sort((a, b) => a.displayOrder - b.displayOrder));
      setShowCreateModal(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create vocabulary item');
      console.error('Error creating item:', err);
    }
  };

  // Handle item update
  const handleUpdateItem = async (itemId: string, data: {
    hiragana: string;
    kanji?: string;
    vietnamese: string;
    hiraganaSentence?: string;
  }) => {
    try {
      const updatedItem = await dynamicVocabularyStorage.updateItem(itemId, data);
      setItems(prev => prev.map(i => i.id === itemId ? updatedItem : i));
      setEditingItem(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update vocabulary item');
      console.error('Error updating item:', err);
    }
  };

  // Handle item deletion
  const handleDeleteItem = async (itemId: string) => {
    if (deletingItemId !== itemId) {
      setDeletingItemId(itemId);
      return;
    }

    try {
      await dynamicVocabularyStorage.deleteItem(itemId);
      setItems(prev => prev.filter(i => i.id !== itemId));
      setDeletingItemId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete vocabulary item');
      console.error('Error deleting item:', err);
      setDeletingItemId(null);
    }
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItemId(itemId);
    e.dataTransfer.setData('text/plain', itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle drop - reorder items
  const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    const draggedIndex = items.findIndex(i => i.id === draggedId);

    if (draggedIndex === targetIndex || draggedIndex === -1) {
      setDraggedItemId(null);
      return;
    }

    // Calculate new order
    const newItems = [...items];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, removed);

    // Update display orders
    const reorderedItems = newItems.map((item, idx) => ({
      ...item,
      displayOrder: idx,
    }));

    try {
      setReordering(true);
      const itemIds = reorderedItems.map(i => i.id);
      await dynamicVocabularyStorage.reorderItems(unitId!, itemIds);
      setItems(reorderedItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reorder items');
      console.error('Error reordering items:', err);
      // Reset to original order
      loadData();
    } finally {
      setDraggedItemId(null);
      setReordering(false);
    }
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedItemId(null);
  };

  // Handle move up/down
  const handleMoveItem = async (itemId: string, direction: 'up' | 'down') => {
    const currentIndex = items.findIndex(i => i.id === itemId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= items.length) return;

    const newItems = [...items];
    const [removed] = newItems.splice(currentIndex, 1);
    newItems.splice(newIndex, 0, removed);

    const reorderedItems = newItems.map((item, idx) => ({
      ...item,
      displayOrder: idx,
    }));

    try {
      setReordering(true);
      const itemIds = reorderedItems.map(i => i.id);
      await dynamicVocabularyStorage.reorderItems(unitId!, itemIds);
      setItems(reorderedItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to move item');
      console.error('Error moving item:', err);
    } finally {
      setReordering(false);
    }
  };

  if (loading) {
    return (
      <div className="dynamic-vocab-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading unit...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dynamic-vocab-container">
        <div className="error-state">
          {error.startsWith('Waiting for server') ? (
            <>
              <p>⏳ {error}</p>
              <p style={{ fontSize: '0.9em', color: '#666', marginTop: '0.5em' }}>
                Server is starting up. Please wait...
              </p>
            </>
          ) : (
            <>
              <p>⚠️ {error}</p>
              <div style={{ display: 'flex', gap: '1em', marginTop: '1em', flexWrap: 'wrap' }}>
                <button onClick={() => loadData()} className="retry-button">
                  Retry
                </button>
                <button onClick={() => window.location.reload()} className="retry-button">
                  Reload Page
                </button>
                <Link to="/vocabulary/units" className="back-button">
                  Back to Units
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  if (!unit) {
    return (
      <div className="dynamic-vocab-container">
        <div className="error-state">
          <p>Unit not found</p>
          <Link to="/vocabulary/units" className="back-button">
            Back to Units
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dynamic-vocab-container">
      <div className="page-header">
        <div className="header-content">
          <button className="back-button" onClick={() => navigate('/vocabulary/units')}>
            ← Back to Units
          </button>
          <div className="unit-header-info">
            <h1>{unit.name}</h1>
            {unit.description && (
              <p className="unit-description">{unit.description}</p>
            )}
          </div>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="create-item-button"
        >
          + Add Vocabulary
        </button>
      </div>

      <div className="unit-stats">
        <span className="stat-badge">
          {items.length} vocabulary items
        </span>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h2>No Vocabulary Items Yet</h2>
          <p>Start by adding your first vocabulary word to this unit</p>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="primary-button"
          >
            Add Vocabulary
          </button>
        </div>
      ) : (
        <div className="items-list">
          {items.map((item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`item-draggable ${draggedItemId === item.id ? 'dragging' : ''} ${reordering ? 'reordering' : ''}`}
            >
              <VocabularyItemCard
                item={item}
                onEdit={() => setEditingItem(item)}
                onDelete={() => handleDeleteItem(item.id)}
                onMoveUp={() => handleMoveItem(item.id, 'up')}
                onMoveDown={() => handleMoveItem(item.id, 'down')}
                isDeleting={deletingItemId === item.id}
              />
            </div>
          ))}
        </div>
      )}

      {showCreateModal && unitId && (
        <CreateVocabularyItemModal
          unitId={unitId}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateItem}
        />
      )}

      {editingItem && (
        <EditVocabularyItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onUpdate={(data) => handleUpdateItem(editingItem.id, data)}
        />
      )}

      {/* Delete confirmation modal */}
      {deletingItemId && (
        <div className="modal-overlay" onClick={() => setDeletingItemId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🗑️ Delete Vocabulary Item</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this vocabulary item?</p>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-button"
                onClick={() => setDeletingItemId(null)}
              >
                Cancel
              </button>
              <button 
                className="delete-confirm-button"
                onClick={() => handleDeleteItem(deletingItemId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
