import React, { useState, useEffect, useRef } from 'react';

interface CreateVocabularyItemModalProps {
  unitId: string;
  onClose: () => void;
  onCreate: (data: {
    hiragana: string;
    kanji?: string;
    vietnamese: string;
  }) => void;
}

export const CreateVocabularyItemModal: React.FC<CreateVocabularyItemModalProps> = ({
  onClose,
  onCreate,
}) => {
  const [hiragana, setHiragana] = useState('');
  const [kanji, setKanji] = useState('');
  const [vietnamese, setVietnamese] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hiraganaInputRef = useRef<HTMLInputElement>(null);

  // Focus hiragana input on mount
  useEffect(() => {
    if (hiraganaInputRef.current) {
      hiraganaInputRef.current.focus();
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hiragana.trim() || !vietnamese.trim()) {
      return;
    }
    setIsSubmitting(true);
    onCreate({
      hiragana: hiragana.trim(),
      kanji: kanji.trim() || undefined,
      vietnamese: vietnamese.trim(),
    });
  };

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  // Clear form on close
  const clearForm = () => {
    setHiragana('');
    setKanji('');
    setVietnamese('');
  };

  const handleClose = () => {
    clearForm();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content create-item-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>➕ Add Vocabulary</h2>
          <button className="close-button" onClick={handleClose} disabled={isSubmitting}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="hiragana">Hiragana *</label>
              <input
                ref={hiraganaInputRef}
                id="hiragana"
                type="text"
                value={hiragana}
                onChange={(e) => setHiragana(e.target.value)}
                className="form-input"
                placeholder="わたし"
                required
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="kanji">Kanji (Optional)</label>
              <input
                id="kanji"
                type="text"
                value={kanji}
                onChange={(e) => setKanji(e.target.value)}
                className="form-input"
                placeholder="私"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="vietnamese">Vietnamese *</label>
            <input
              id="vietnamese"
              type="text"
              value={vietnamese}
              onChange={(e) => setVietnamese(e.target.value)}
              className="form-input"
              placeholder="Tôi"
              required
              autoComplete="off"
            />
          </div>
        </form>

        <div className="modal-footer">
          <button 
            type="button"
            className="cancel-button"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="primary-button"
            onClick={handleSubmit}
            disabled={!hiragana.trim() || !vietnamese.trim() || isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Vocabulary'}
          </button>
        </div>
      </div>
    </div>
  );
};
