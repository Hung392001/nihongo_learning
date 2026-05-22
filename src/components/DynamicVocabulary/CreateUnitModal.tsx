import React, { useState, useEffect, useRef } from 'react';

interface CreateUnitModalProps {
  onClose: () => void;
  onCreate: (name: string, description?: string) => void;
}

export const CreateUnitModal: React.FC<CreateUnitModalProps> = ({
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Focus name input on mount
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    setIsSubmitting(true);
    onCreate(name.trim(), description.trim() || undefined);
  };

  // Handle cancel
  const handleCancel = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content create-unit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📖 Create New Unit</h2>
          <button className="close-button" onClick={handleCancel} disabled={isSubmitting}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label htmlFor="unit-name">Unit Name *</label>
            <input
              ref={nameInputRef}
              id="unit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="e.g., JLPT N5 Lesson 1, Travel Vocabulary, Anime Words"
              required
              autoComplete="off"
            />
            <p className="hint">
              Give your unit a meaningful name. You can create units for any topic!
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="unit-description">Description (Optional)</label>
            <textarea
              id="unit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              placeholder="Describe what this unit contains..."
              rows={3}
            />
          </div>
        </form>

        <div className="modal-footer">
          <button 
            type="button"
            className="cancel-button"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="primary-button"
            onClick={handleSubmit}
            disabled={!name.trim() || isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Unit'}
          </button>
        </div>
      </div>
    </div>
  );
};
