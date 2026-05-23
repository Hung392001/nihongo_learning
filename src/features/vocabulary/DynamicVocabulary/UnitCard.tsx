import React, { useState, useRef, useEffect } from 'react';
import { VocabularyUnit } from '../vocabulary';
import { Link } from 'react-router-dom';

interface UnitCardProps {
  unit: VocabularyUnit;
  onDelete: () => void;
  onUpdate: (unitId: string, name: string, description?: string) => void;
  isDeleting: boolean;
}

export const UnitCard: React.FC<UnitCardProps> = ({
  unit,
  onDelete,
  onUpdate,
  isDeleting,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(unit.name);
  const [editDescription, setEditDescription] = useState(unit.description || '');
  const [itemCount, setItemCount] = useState<number | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Load item count for the unit
  useEffect(() => {
    const loadItemCount = async () => {
      try {
        // Import here to avoid circular dependency
        const { dynamicVocabularyStorage } = await import('../DynamicVocabularyStorage');
        const items = await dynamicVocabularyStorage.getItemsByUnit(unit.id);
        setItemCount(items.length);
      } catch (error) {
        console.error('Error loading item count:', error);
      }
    };
    loadItemCount();
  }, [unit.id]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditing]);

  // Handle key down for edit form
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditName(unit.name);
      setEditDescription(unit.description || '');
    }
  };

  // Save edits
  const handleSave = () => {
    if (editName.trim() === '') {
      return;
    }
    onUpdate(unit.id, editName, editDescription.trim() || undefined);
    setIsEditing(false);
  };

  return (
    <div className={`unit-card ${isDeleting ? 'deleting' : ''}`}>
      <div className="unit-card-header">
        {isEditing ? (
          <div className="unit-edit-form">
            <input
              ref={nameInputRef}
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="unit-name-input"
              placeholder="Enter unit name"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="unit-description-input"
              placeholder="Description (optional)"
              rows={2}
            />
            <div className="edit-actions">
              <button className="save-button" onClick={handleSave}>
                ✓ Save
              </button>
              <button className="cancel-button" onClick={() => setIsEditing(false)}>
                × Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="unit-name-row">
              <h3 className="unit-name">{unit.name}</h3>
              <div className="unit-actions">
                <button 
                  className="edit-button"
                  onClick={() => {
                    setEditName(unit.name);
                    setEditDescription(unit.description || '');
                    setIsEditing(true);
                  }}
                  title="Edit unit"
                >
                  ✏️
                </button>
                <button 
                  className="delete-button"
                  onClick={onDelete}
                  title="Delete unit"
                >
                  🗑️
                </button>
              </div>
            </div>
            {unit.description && (
              <p className="unit-description">{unit.description}</p>
            )}
          </>
        )}
      </div>

      <div className="unit-card-footer">
        <Link 
          to={`/vocabulary/units/${unit.id}`}
          className="view-unit-button"
        >
          View Vocabulary ({itemCount ?? '...'})
        </Link>
      </div>
    </div>
  );
};
