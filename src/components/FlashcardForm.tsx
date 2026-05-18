import React, { useState, useEffect } from 'react';
import type { FlashcardItem, CreateFlashcardDto, UpdateFlashcardDto } from '../types/flashcard';
import './FlashcardForm.css';

interface FlashcardFormProps {
  onSubmit: (data: CreateFlashcardDto | UpdateFlashcardDto) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  allFlashcards?: FlashcardItem[];
  editingCard?: FlashcardItem | null;
}

const DIFFICULTY_LEVELS: { value: 1 | 2 | 3 | 4 | 5; label: string }[] = [
  { value: 1, label: 'N5' },
  { value: 2, label: 'N4' },
  { value: 3, label: 'N3' },
  { value: 4, label: 'N2' },
  { value: 5, label: 'N1' },
];

export const FlashcardForm: React.FC<FlashcardFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
  allFlashcards = [],
  editingCard = null,
}) => {
  const [formData, setFormData] = useState<CreateFlashcardDto>({
    front: '',
    back: '',
    kana: '',
    note: '',
    tags: [],
    difficulty: undefined,
    isFavorite: false,
    audioUrl: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState('');

  // Initialize form with editing card
  useEffect(() => {
    if (editingCard) {
      setFormData({
        front: editingCard.front || '',
        back: editingCard.back || '',
        kana: editingCard.kana || '',
        note: editingCard.note || '',
        tags: editingCard.tags || [],
        difficulty: editingCard.difficulty,
        isFavorite: editingCard.isFavorite || false,
        audioUrl: editingCard.audioUrl || '',
      });
    } else {
      setFormData({
        front: '',
        back: '',
        kana: '',
        note: '',
        tags: [],
        difficulty: undefined,
        isFavorite: false,
        audioUrl: '',
      });
    }
  }, [editingCard]);

  // Check for duplicates
  const isDuplicate = (): boolean => {
    if (!formData.front || !formData.back) return false;
    const currentId = editingCard?.id;
    return allFlashcards.some(c => 
      c.id !== currentId &&
      c.front.toLowerCase() === formData.front?.toLowerCase() &&
      c.back.toLowerCase() === formData.back?.toLowerCase()
    );
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.front?.trim()) {
      newErrors.front = 'Front is required';
    }
    
    if (!formData.back?.trim()) {
      newErrors.back = 'Back is required';
    }
    
    if (isDuplicate()) {
      newErrors.duplicate = 'This flashcard already exists';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof CreateFlashcardDto, value: string | number | boolean | null | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value !== undefined ? value : undefined,
    }));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags?.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...(prev.tags || []), tagInput.trim()],
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      await onSubmit({
        ...formData,
        front: formData.front?.trim() || '',
        back: formData.back?.trim() || '',
        kana: formData.kana?.trim(),
        note: formData.note?.trim(),
        tags: formData.tags?.filter(t => t.trim()),
        audioUrl: formData.audioUrl?.trim(),
      });
    } catch (error) {
      // Error is handled by parent component
    }
  };

  return (
    <div className="flashcard-form-container">
      <form onSubmit={handleSubmit} className="flashcard-form">
        {/* Japanese Side */}
        <div className="flashcard-form-section">
          <h4>Japanese Side *</h4>
          
          <div className="flashcard-form-row">
            <div className="flashcard-form-group">
              <label htmlFor="front">Kanji / Word *</label>
              <input
                id="front"
                type="text"
                value={formData.front || ''}
                onChange={(e) => handleChange('front', e.target.value)}
                placeholder="e.g., 人, 日本, 学生"
                className={errors.front ? 'error' : ''}
              />
              {errors.front && <span className="error-message">{errors.front}</span>}
              <p className="field-hint">The main Japanese word (use kanji if available, or hiragana)</p>
            </div>

            <div className="flashcard-form-group">
              <label htmlFor="back">Vietnamese Meaning *</label>
              <input
                id="back"
                type="text"
                value={formData.back || ''}
                onChange={(e) => handleChange('back', e.target.value)}
                placeholder="e.g., person, Japan, student"
                className={errors.back ? 'error' : ''}
              />
              {errors.back && <span className="error-message">{errors.back}</span>}
              <p className="field-hint">The Vietnamese translation/meaning</p>
            </div>
          </div>

          <div className="flashcard-form-group">
            <label htmlFor="kana">Reading (Hiragana/Katakana) <span className="optional">(optional)</span></label>
            <input
              id="kana"
              type="text"
              value={formData.kana || ''}
              onChange={(e) => handleChange('kana', e.target.value)}
              placeholder="e.g., ひと, にほん, がくせい"
            />
            <p className="field-hint">How the word is pronounced (hiragana or katakana)</p>
          </div>
          
          {errors.duplicate && <div className="error-message full-width">{errors.duplicate}</div>}
        </div>

        {/* Classification */}
        <div className="flashcard-form-section">
          <h4>Classification</h4>
          
          <div className="flashcard-form-row">
            <div className="flashcard-form-group">
              <label htmlFor="difficulty">Difficulty (JLPT Level)</label>
              <select
                id="difficulty"
                value={formData.difficulty || ''}
                onChange={(e) => handleChange('difficulty', parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 || undefined)}
              >
                <option value="">Select level...</option>
                {DIFFICULTY_LEVELS.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>

            <div className="flashcard-form-group">
              <label htmlFor="tags">Tags</label>
              <div className="tags-input">
                <div className="tags">
                  {(formData.tags || []).map(tag => (
                    <span key={tag} className="tag">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="tag-remove">
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  id="tags"
                  type="text"
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Type tag and press Enter"
                />
              </div>
            </div>
          </div>

          <div className="flashcard-form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={formData.isFavorite || false}
                onChange={(e) => handleChange('isFavorite', e.target.checked)}
              />
              <span>Mark as favorite</span>
            </label>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flashcard-form-section">
          <h4>Additional Information</h4>
          
          <div className="flashcard-form-group">
            <label htmlFor="note">Note / Example</label>
            <textarea
              id="note"
              value={formData.note || ''}
              onChange={(e) => handleChange('note', e.target.value)}
              placeholder="Example sentence or personal note..."
              rows={3}
            />
          </div>

          <div className="flashcard-form-group">
            <label htmlFor="audioUrl">Audio URL <span className="optional">(optional)</span></label>
            <input
              id="audioUrl"
              type="url"
              value={formData.audioUrl || ''}
              onChange={(e) => handleChange('audioUrl', e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flashcard-form-actions">
          <button type="button" onClick={onCancel} className="btn-cancel" disabled={isLoading}>
            Cancel
          </button>
          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : editingCard ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlashcardForm;
