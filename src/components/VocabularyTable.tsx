import React, { useState, useMemo } from 'react';
import { VocabularyItem } from '../types/vocabulary';
import './VocabularyTable.css';

interface VocabularyTableProps {
  vocabulary: VocabularyItem[];
  onStartPractice?: (unit: number | 'all') => void;
  selectedUnit?: number | 'all';
  onUnitChange?: (unit: number | 'all') => void;
}

/**
 * Vocabulary table component - displays vocabulary in a textbook-style table
 */
export const VocabularyTable: React.FC<VocabularyTableProps> = ({
  vocabulary,
  onStartPractice,
  selectedUnit: controlledSelectedUnit,
  onUnitChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [internalSelectedUnit, setInternalSelectedUnit] = useState<number | 'all'>('all');
  const [showUnitModal, setShowUnitModal] = useState(false);

  // Use controlled or internal state
  const selectedUnit = controlledSelectedUnit !== undefined ? controlledSelectedUnit : internalSelectedUnit;
  const setSelectedUnit = (unit: number | 'all') => {
    if (onUnitChange) {
      onUnitChange(unit);
    } else {
      setInternalSelectedUnit(unit);
    }
  };

  // Get unique categories and units
  const categories = useMemo(() => {
    const cats = new Set(vocabulary.map(item => item.category || 'other'));
    return ['all', ...Array.from(cats)];
  }, [vocabulary]);

  const availableUnits = useMemo(() => {
    const units = new Set(vocabulary.map(item => item.unit || 1));
    return Array.from(units).sort((a, b) => a - b);
  }, [vocabulary]);

  // Filter vocabulary
  const filteredVocabulary = useMemo(() => {
    let result = [...vocabulary];

    // Filter by unit
    if (selectedUnit !== 'all') {
      result = result.filter(item => (item.unit || 1) === selectedUnit);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(item => (item.category || 'other') === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item =>
        item.hiragana.includes(term) ||
        item.kanji?.includes(term) ||
        item.vietnamese.toLowerCase().includes(term) 
      );
    }

    return result;
  }, [vocabulary, selectedUnit, selectedCategory, searchTerm]);

  // Category labels in Vietnamese
  const categoryLabels: Record<string, string> = {
    all: 'Tất cả',
    pronoun: 'Đại từ',
    people: 'Con người',
    occupation: 'Nghề nghiệp',
    country: 'Quốc gia',
    place: 'Địa điểm',
    greeting: 'Chào hỏi',
    grammar: 'Ngữ pháp',
    question: 'Câu hỏi',
    number: 'Số đếm',
    honorific: 'Kính ngữ',
    phrase: 'Cụm từ',
    other: 'Khác',
  };

  return (
    <div className="vocabulary-table-container">
      {/* Unit Tabs */}
      <div className="unit-tabs">
        <button
          className={`unit-tab ${selectedUnit === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedUnit('all')}
        >
          Tất cả
        </button>
        {availableUnits.map(unit => (
          <button
            key={unit}
            className={`unit-tab ${selectedUnit === unit ? 'active' : ''}`}
            onClick={() => setSelectedUnit(unit)}
          >
            Unit {unit}
          </button>
        ))}
      </div>

      <div className="table-header">
        <div className="table-controls">
          <div className="search-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm từ vựng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="clear-search"
                aria-label="Xóa tìm kiếm"
              >
                ×
              </button>
            )}
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {categoryLabels[cat] || cat}
              </option>
            ))}
          </select>

          {onStartPractice && (
            <button onClick={() => setShowUnitModal(true)} className="practice-button">
              🎴 Luyện tập Flashcard
            </button>
          )}
        </div>

        <div className="table-info">
          <span>Hiển thị {filteredVocabulary.length} / {vocabulary.length} từ</span>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="vocabulary-table">
          <thead>
            <tr>
              <th className="col-number">STT</th>
              <th className="col-hiragana">Hiragana</th>
              <th className="col-kanji">Kanji</th>
              <th className="col-vietnamese">Tiếng Việt</th>
            </tr>
          </thead>
          <tbody>
            {filteredVocabulary.length === 0 ? (
              <tr>
                <td colSpan={4} className="empty-message">
                  Không tìm thấy từ vựng nào
                </td>
              </tr>
            ) : (
              filteredVocabulary.map((item, index) => (
                <tr key={item.id} className="vocab-row">
                  <td className="col-number">{index + 1}</td>
                  <td className="col-hiragana">{item.hiragana}</td>
                  <td className="col-kanji">{item.kanji || '—'}</td>
                  <td className="col-vietnamese">{item.vietnamese}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filteredVocabulary.length > 0 && (
        <div className="table-footer">
          <p>💡 Mẹo: Click vào "Luyện tập Flashcard" để học từ vựng một cách hiệu quả!</p>
        </div>
      )}

      {/* Unit Selection Modal */}
      {showUnitModal && (
        <div className="modal-overlay" onClick={() => setShowUnitModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Chọn Unit để luyện tập</h3>
              <button 
                className="modal-close" 
                onClick={() => setShowUnitModal(false)}
                aria-label="Đóng"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-description">
                Chọn unit bạn muốn luyện tập với flashcard:
              </p>
              <div className="unit-options">
                <button
                  className="unit-option-button"
                  onClick={() => {
                    onStartPractice?.('all');
                    setShowUnitModal(false);
                  }}
                >
                  <span className="unit-icon">📚</span>
                  <span className="unit-name">Tất cả Units</span>
                  <span className="unit-count">
                    {vocabulary.length} từ
                  </span>
                </button>
                {availableUnits.map(unit => {
                  const unitVocab = vocabulary.filter(v => v.unit === unit);
                  return (
                    <button
                      key={unit}
                      className="unit-option-button"
                      onClick={() => {
                        onStartPractice?.(unit);
                        setShowUnitModal(false);
                      }}
                    >
                      <span className="unit-icon">📖</span>
                      <span className="unit-name">Unit {unit}</span>
                      <span className="unit-count">
                        {unitVocab.length} từ
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
