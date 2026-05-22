import React, { useState, useEffect, useRef } from 'react';
import { VocabularyUnitItem } from '../../types/vocabulary';

interface EditVocabularyItemModalProps {
  item: VocabularyUnitItem;
  onClose: () => void;
  onUpdate: (data: {
    hiragana: string;
    kanji?: string;
    vietnamese: string;
    hiraganaSentence?: string;
  }) => void;
}

export const EditVocabularyItemModal: React.FC<EditVocabularyItemModalProps> = ({
  item,
  onClose,
  onUpdate,
}) => {
  const [hiragana, setHiragana] = useState(item.hiragana);
  const [kanji, setKanji] = useState(item.kanji || '');
  const [vietnamese, setVietnamese] = useState(item.vietnamese);
  const [hiraganaSentence, setHiraganaSentence] = useState(item.hiraganaSentence || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hiraganaInputRef = useRef<HTMLInputElement>(null);

  // Focus hiragana input on mount
  useEffect(() => {
    if (hiraganaInputRef.current) {
      hiraganaInputRef.current.focus();
      hiraganaInputRef.current.select();
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hiragana.trim() || !vietnamese.trim()) {
      return;
    }
    setIsSubmitting(true);
    onUpdate({
      hiragana: hiragana.trim(),
      kanji: kanji.trim() || undefined,
      vietnamese: vietnamese.trim(),
      hiraganaSentence: hiraganaSentence.trim() || undefined,
    });
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
      <div className="modal-content edit-item-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>✏️ Edit Vocabulary</h2>
          <button className="close-button" onClick={handleCancel} disabled={isSubmitting}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-hiragana">Hiragana *</label>
              <input
                ref={hiraganaInputRef}
                id="edit-hiragana"
                type="text"
                value={hiragana}
                onChange={(e) => setHiragana(e.target.value)}
                className="form-input"
                required
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-kanji">Kanji (Optional)</label>
              <input
                id="edit-kanji"
                type="text"
                value={kanji}
                onChange={(e) => setKanji(e.target.value)}
                className="form-input"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="edit-vietnamese">Vietnamese *</label>
            <input
              id="edit-vietnamese"
              type="text"
              value={vietnamese}
              onChange={(e) => setVietnamese(e.target.value)}
              className="form-input"
              required
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-hiragana-sentence">Hiragana Sentence (Optional)</label>
            <input
              id="edit-hiragana-sentence"
              type="text"
              value={hiraganaSentence}
              onChange={(e) => setHiraganaSentence(e.target.value)}
              className="form-input"
              autoComplete="off"
            />
            <p className="hint">Example sentence in hiragana</p>
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
            disabled={!hiragana.trim() || !vietnamese.trim() || isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};
