import React from 'react';
import { VocabularyUnitItem } from '../../types/vocabulary';

interface VocabularyItemCardProps {
  item: VocabularyUnitItem;
  onEdit: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isDeleting: boolean;
}

export const VocabularyItemCard: React.FC<VocabularyItemCardProps> = ({
  item,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  isDeleting,
}) => {
  return (
    <div className={`vocabulary-item-card ${isDeleting ? 'deleting' : ''}`}>
      <div className="item-main">
        <div className="item-characters">
          <div className="item-hiragana">{item.hiragana}</div>
          {item.kanji && (
            <div className="item-kanji">{item.kanji}</div>
          )}
        </div>
        <div className="item-vietnamese">{item.vietnamese}</div>
      </div>

      {item.hiraganaSentence && (
        <div className="item-sentence">
          <span className="sentence-label">Example: </span>
          <span className="sentence-text">{item.hiraganaSentence}</span>
        </div>
      )}

      <div className="item-actions">
        <button className="action-button move-up" onClick={onMoveUp} title="Move up">
          ↑
        </button>
        <button className="action-button move-down" onClick={onMoveDown} title="Move down">
          ↓
        </button>
        <button className="action-button edit" onClick={onEdit} title="Edit">
          ✏️
        </button>
        <button className="action-button delete" onClick={onDelete} title="Delete">
          🗑️
        </button>
      </div>
    </div>
  );
};
