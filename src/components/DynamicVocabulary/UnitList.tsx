import React, { useState, useEffect, useCallback } from 'react';
import { VocabularyUnit } from '../../types/vocabulary';
import { dynamicVocabularyStorage } from '../../services/DynamicVocabularyStorage';
import { UnitCard } from './UnitCard';
import { CreateUnitModal } from './CreateUnitModal';
import './DynamicVocabulary.css';

export const UnitList: React.FC = () => {
  const [units, setUnits] = useState<VocabularyUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deletingUnitId, setDeletingUnitId] = useState<string | null>(null);

  // Load all units with retry mechanism
  const loadUnits = useCallback(async (retryCount: number = 0) => {
    try {
      setLoading(true);
      setError(null);
      const fetchedUnits = await dynamicVocabularyStorage.getAllUnits();
      // Sort by displayOrder
      const sortedUnits = [...fetchedUnits].sort((a, b) => a.displayOrder - b.displayOrder);
      setUnits(sortedUnits);
      setLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load units';
      console.error('Error loading units:', err);
      
      // If it's a connection error and we haven't retried too many times, try again
      if (retryCount < 10 && (errorMessage.includes('Failed to fetch') || errorMessage.includes('ECONNREFUSED') || errorMessage.includes('500'))) {
        setTimeout(() => loadUnits(retryCount + 1), 2000);
        setError(`Waiting for server... (attempt ${retryCount + 1}/10)`);
      } else {
        setError(errorMessage);
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadUnits();
  }, [loadUnits]);

  // Handle unit creation
  const handleCreateUnit = async (name: string, description?: string) => {
    try {
      const maxOrder = Math.max(...units.map(u => u.displayOrder), -1); // Start at 0 if no units
      const newUnit = await dynamicVocabularyStorage.createUnit({
        name,
        description,
        displayOrder: maxOrder + 1,
      });
      setUnits(prev => [...prev, newUnit].sort((a, b) => a.displayOrder - b.displayOrder));
      setShowCreateModal(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create unit';
      // Provide more helpful error messages
      let userFriendlyMessage = errorMessage;
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('ECONNREFUSED')) {
        userFriendlyMessage = 'Cannot connect to server. Please make sure the backend server is running.';
      } else if (errorMessage.includes('500') || errorMessage.includes('database')) {
        userFriendlyMessage = 'Database error. Please run: npm run db:migrate';
      } else if (errorMessage.includes('400') || errorMessage.includes('Name is required')) {
        userFriendlyMessage = 'Please enter a unit name.';
      }
      setError(userFriendlyMessage);
      console.error('Error creating unit:', err);
    }
  };

  // Handle unit deletion
  const handleDeleteUnit = async (unitId: string) => {
    if (deletingUnitId !== unitId) {
      setDeletingUnitId(unitId);
      return;
    }

    try {
      await dynamicVocabularyStorage.deleteUnit(unitId);
      setUnits(prev => prev.filter(u => u.id !== unitId));
      setDeletingUnitId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete unit');
      console.error('Error deleting unit:', err);
      setDeletingUnitId(null);
    }
  };

  // Handle unit update
  const handleUpdateUnit = async (unitId: string, name: string, description?: string) => {
    try {
      const updatedUnit = await dynamicVocabularyStorage.updateUnit(unitId, { name, description });
      setUnits(prev => prev.map(u => u.id === unitId ? updatedUnit : u));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update unit');
      console.error('Error updating unit:', err);
    }
  };

  // Handle unit reorder
  const handleReorderUnits = async (newUnits: VocabularyUnit[]) => {
    try {
      const unitIds = newUnits.map(u => u.id);
      await dynamicVocabularyStorage.reorderUnits(unitIds);
      setUnits(newUnits);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reorder units');
      console.error('Error reordering units:', err);
      // Reload units to reset order
      loadUnits();
    }
  };

  // Handle drag and drop reordering
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (dragIndex === dropIndex) return;
    
    const newUnits = [...units];
    const [removed] = newUnits.splice(dragIndex, 1);
    newUnits.splice(dropIndex, 0, removed);
    
    // Update display orders
    const reorderedUnits = newUnits.map((unit, idx) => ({
      ...unit,
      displayOrder: idx,
    }));
    
    handleReorderUnits(reorderedUnits);
  };

  if (loading) {
    return (
      <div className="dynamic-vocab-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading units...</p>
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
              <div style={{ display: 'flex', gap: '1em', marginTop: '1em' }}>
                <button onClick={() => loadUnits()} className="retry-button">
                  Retry
                </button>
                <button onClick={() => window.location.reload()} className="retry-button">
                  Reload Page
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="dynamic-vocab-container">
      <div className="page-header">
        <div className="header-content">
          <h1>📚 Vocabulary Units</h1>
          <p className="subtitle">
            Organize your Japanese vocabulary into custom units
          </p>
        </div>
      </div>

      {units.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📖</div>
          <h2>No Units Yet</h2>
          <p>Start by creating your first vocabulary unit</p>
        </div>
      ) : (
        <div className="units-grid">
          {units.map((unit, index) => (
            <div
              key={unit.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="unit-draggable"
            >
              <UnitCard
                unit={unit}
                onDelete={() => handleDeleteUnit(unit.id)}
                onUpdate={handleUpdateUnit}
                isDeleting={deletingUnitId === unit.id}
              />
            </div>
          ))}
        </div>
      )}

      {/* Create Unit Button - positioned at bottom-left */}
      <div className="page-actions">
        <button 
          onClick={() => setShowCreateModal(true)}
          className="create-unit-button"
        >
          + Create Unit
        </button>
      </div>

      {showCreateModal && (
        <CreateUnitModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateUnit}
        />
      )}

      {/* Delete confirmation modal */}
      {deletingUnitId && (
        <div className="modal-overlay" onClick={() => setDeletingUnitId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🗑️ Delete Unit</h3>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete this unit? All vocabulary items 
                in this unit will also be deleted.
              </p>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-button"
                onClick={() => setDeletingUnitId(null)}
              >
                Cancel
              </button>
              <button 
                className="delete-confirm-button"
                onClick={() => handleDeleteUnit(deletingUnitId)}
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
