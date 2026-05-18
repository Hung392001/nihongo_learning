import React, { useState, useEffect } from 'react';
import type { CreateVocabularyDto, UpdateVocabularyDto, VocabularyCategory, VocabularyItem } from '../types/vocabulary';
import './VocabularyForm.css';

interface VocabularyFormProps {
  onSubmit: (data: CreateVocabularyDto | UpdateVocabularyDto) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  allVocabulary?: VocabularyItem[]; // For duplicate checking
  editingVocab?: VocabularyItem | null; // For editing mode
}

const VOCABULARY_CATEGORIES: { value: VocabularyCategory; label: string }[] = [
  { value: 'pronoun', label: 'Pronoun' },
  { value: 'people', label: 'People' },
  { value: 'occupation', label: 'Occupation' },
  { value: 'country', label: 'Country' },
  { value: 'place', label: 'Place' },
  { value: 'greeting', label: 'Greeting' },
  { value: 'grammar', label: 'Grammar' },
  { value: 'question', label: 'Question' },
  { value: 'number', label: 'Number' },
  { value: 'honorific', label: 'Honorific' },
  { value: 'phrase', label: 'Phrase' },
  { value: 'verb', label: 'Verb' },
  { value: 'interjection', label: 'Interjection' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'time', label: 'Time' },
];

const DIFFICULTY_LEVELS: { value: 1 | 2 | 3 | 4 | 5; label: string }[] = [
  { value: 1, label: 'N5' },
  { value: 2, label: 'N4' },
  { value: 3, label: 'N3' },
  { value: 4, label: 'N2' },
  { value: 5, label: 'N1' },
];

export const VocabularyForm: React.FC<VocabularyFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
  allVocabulary = [],
  editingVocab = null,
}) => {
  const [formData, setFormData] = useState<CreateVocabularyDto>({
    vietnamese: '',
    hiragana: '',
    kanji: null,
    romaji: '',
    category: undefined,
    tags: [],
    exampleSentence: '',
    exampleSentenceHiragana: '',
    exampleTranslationVi: '',
    unit: undefined,
    difficulty: undefined,
    audioUrl: '',
    isFavorite: false,
    note: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState('');

  // Initialize form with editing vocabulary
  useEffect(() => {
    if (editingVocab) {
      setFormData({
        vietnamese: editingVocab.vietnamese || '',
        hiragana: editingVocab.hiragana || '',
        kanji: editingVocab.kanji || null,
        romaji: editingVocab.romaji || '',
        category: editingVocab.category,
        tags: editingVocab.tags || [],
        exampleSentence: editingVocab.exampleSentence || '',
        exampleSentenceHiragana: editingVocab.exampleSentenceHiragana || '',
        exampleTranslationVi: editingVocab.exampleTranslationVi || '',
        unit: editingVocab.unit,
        difficulty: editingVocab.difficulty,
        audioUrl: editingVocab.audioUrl || '',
        isFavorite: editingVocab.isFavorite || false,
        note: editingVocab.note || '',
      });
    } else {
      setFormData({
        vietnamese: '',
        hiragana: '',
        kanji: null,
        romaji: '',
        category: undefined,
        tags: [],
        exampleSentence: '',
        exampleSentenceHiragana: '',
        exampleTranslationVi: '',
        unit: undefined,
        difficulty: undefined,
        audioUrl: '',
        isFavorite: false,
        note: '',
      });
    }
  }, [editingVocab]);

  // Check for duplicates
  const isDuplicate = (): boolean => {
    if (!formData.vietnamese || !formData.hiragana) return false;
    const currentId = editingVocab?.id;
    return allVocabulary.some(v => 
      v.id !== currentId &&
      v.vietnamese.toLowerCase() === formData.vietnamese?.toLowerCase() &&
      v.hiragana.toLowerCase() === formData.hiragana?.toLowerCase()
    );
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.vietnamese?.trim()) {
      newErrors.vietnamese = 'Meaning is required';
    }

    if (!formData.hiragana?.trim()) {
      newErrors.hiragana = 'Hiragana is required';
    }

    if (isDuplicate()) {
      newErrors.duplicate = 'This vocabulary already exists';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = <K extends keyof CreateVocabularyDto>(
    field: K,
    value: CreateVocabularyDto[K]
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
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
        vietnamese: formData.vietnamese?.trim() || '',
        hiragana: formData.hiragana?.trim() || '',
        kanji: formData.kanji?.trim() || null,
        romaji: formData.romaji?.trim(),
        tags: formData.tags?.filter(t => t.trim()),
        exampleSentence: formData.exampleSentence?.trim(),
        exampleSentenceHiragana: formData.exampleSentenceHiragana?.trim(),
        exampleTranslationVi: formData.exampleTranslationVi?.trim(),
        audioUrl: formData.audioUrl?.trim(),
        note: formData.note?.trim(),
      });
    } catch (error) {
      // Error is handled by parent component
    }
  };

  // Generate unit options
  const unitOptions = [];
  for (let i = 1; i <= 50; i++) {
    unitOptions.push(
      <option key={i} value={i}>
        Unit {i}
      </option>
    );
  }

  return (
    <div className="vocabulary-form-container">
      <form onSubmit={handleSubmit} className="vocabulary-form">
        {/* Main Fields */}
        <div className="vocabulary-form-section">
          <h4>Core Information *</h4>
          
          <div className="vocabulary-form-row">
            <div className="vocabulary-form-group">
              <label htmlFor="vietnamese">Vietnamese Meaning *</label>
              <input
                id="vietnamese"
                type="text"
                value={formData.vietnamese || ''}
                onChange={(e) => handleChange('vietnamese', e.target.value)}
                placeholder="e.g., Xin chào, Cảm ơn"
                className={errors.vietnamese ? 'error' : ''}
              />
              {errors.vietnamese && <span className="error-message">{errors.vietnamese}</span>}
            </div>

            <div className="vocabulary-form-group">
              <label htmlFor="hiragana">Hiragana *</label>
              <input
                id="hiragana"
                type="text"
                value={formData.hiragana || ''}
                onChange={(e) => handleChange('hiragana', e.target.value)}
                placeholder="e.g., こんにちは, ありがとう"
                className={errors.hiragana ? 'error' : ''}
              />
              {errors.hiragana && <span className="error-message">{errors.hiragana}</span>}
            </div>
          </div>

          <div className="vocabulary-form-row">
            <div className="vocabulary-form-group">
              <label htmlFor="kanji">Kanji <span className="optional">(optional)</span></label>
              <input
                id="kanji"
                type="text"
                value={formData.kanji || ''}
                onChange={(e) => handleChange('kanji', e.target.value)}
                placeholder="e.g., 今日, 日本"
              />
            </div>

            <div className="vocabulary-form-group">
              <label htmlFor="romaji">Romaji <span className="optional">(optional)</span></label>
              <input
                id="romaji"
                type="text"
                value={formData.romaji || ''}
                onChange={(e) => handleChange('romaji', e.target.value)}
                placeholder="e.g., konnichiwa, arigatou"
              />
            </div>
          </div>

          {errors.duplicate && <div className="error-message full-width">{errors.duplicate}</div>}
        </div>

        {/* Classification */}
        <div className="vocabulary-form-section">
          <h4>Classification</h4>
          
          <div className="vocabulary-form-row">
            <div className="vocabulary-form-group">
              <label htmlFor="category">Category <span className="optional">(optional)</span></label>
              <select
                id="category"
                value={formData.category || ''}
                onChange={(e) => handleChange('category', e.target.value as VocabularyCategory || undefined)}
              >
                <option value="">Select category...</option>
                {VOCABULARY_CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="vocabulary-form-group">
              <label htmlFor="unit">Unit <span className="optional">(optional)</span></label>
              <select
                id="unit"
                value={formData.unit || ''}
                onChange={(e) => handleChange('unit', e.target.value ? parseInt(e.target.value) : undefined)}
              >
                <option value="">Select unit...</option>
                {unitOptions}
              </select>
            </div>
          </div>

          <div className="vocabulary-form-row">
            <div className="vocabulary-form-group">
              <label htmlFor="difficulty">Difficulty (JLPT) <span className="optional">(optional)</span></label>
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

            <div className="vocabulary-form-group">
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

          <div className="vocabulary-form-group checkbox-group">
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

        {/* Example Sentences */}
        <div className="vocabulary-form-section">
          <h4>Example Sentences <span className="optional">(optional)</span></h4>
          
          <div className="vocabulary-form-group">
            <label htmlFor="exampleSentence">Japanese Sentence</label>
            <input
              id="exampleSentence"
              type="text"
              value={formData.exampleSentence || ''}
              onChange={(e) => handleChange('exampleSentence', e.target.value)}
              placeholder="e.g., 今日は良い天気ですね"
            />
          </div>

          <div className="vocabulary-form-row">
            <div className="vocabulary-form-group">
              <label htmlFor="exampleSentenceHiragana">Hiragana Reading</label>
              <input
                id="exampleSentenceHiragana"
                type="text"
                value={formData.exampleSentenceHiragana || ''}
                onChange={(e) => handleChange('exampleSentenceHiragana', e.target.value)}
                placeholder="e.g., きょうはいいてんきですね"
              />
            </div>

            <div className="vocabulary-form-group">
              <label htmlFor="exampleTranslationVi">Vietnamese Translation</label>
              <input
                id="exampleTranslationVi"
                type="text"
                value={formData.exampleTranslationVi || ''}
                onChange={(e) => handleChange('exampleTranslationVi', e.target.value)}
                placeholder="e.g., Hôm nay thời tiết đẹp nhỉ"
              />
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="vocabulary-form-section">
          <h4>Additional Information <span className="optional">(optional)</span></h4>
          
          <div className="vocabulary-form-group">
            <label htmlFor="audioUrl">Audio URL</label>
            <input
              id="audioUrl"
              type="url"
              value={formData.audioUrl || ''}
              onChange={(e) => handleChange('audioUrl', e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="vocabulary-form-group">
            <label htmlFor="note">Personal Note</label>
            <textarea
              id="note"
              value={formData.note || ''}
              onChange={(e) => handleChange('note', e.target.value)}
              placeholder="Any personal notes or comments..."
              rows={3}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="vocabulary-form-actions">
          <button type="button" onClick={onCancel} className="btn-cancel" disabled={isLoading}>
            Cancel
          </button>
          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : editingVocab ? 'Update Vocabulary' : 'Add Vocabulary'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VocabularyForm;
