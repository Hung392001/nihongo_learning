import React, { useState, useEffect } from "react";
import { FlashcardMode } from "../types/vocabulary";
import type { CreateFlashcardDto } from "../types/flashcard";
import "./QuickAddWordModal.css";

interface QuickAddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateFlashcardDto) => Promise<void>;
  currentMode: FlashcardMode;
  isLoading?: boolean;
}

export const QuickAddWordModal: React.FC<QuickAddWordModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentMode,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    vietnamese: "",
    hiragana: "",
    kanji: "",
    note: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Get mode name for display
  const getModeName = (): string => {
    switch (currentMode) {
      case FlashcardMode.VI_TO_HIRA:
        return "Vietnamese → Hiragana";
      case FlashcardMode.HIRA_TO_KANJI:
        return "Hiragana → Kanji";
      case FlashcardMode.KANJI_TO_HIRA:
        return "Kanji → Hiragana";
      default:
        return "Learning Mode";
    }
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({
        vietnamese: "",
        hiragana: "",
        kanji: "",
        note: "",
        tags: [],
      });
      setTagInput("");
      setError("");
      setSuccessMessage("");
    }
  }, [isOpen]);

  const validate = (): boolean => {
    setError("");

    if (!formData.vietnamese.trim()) {
      setError("Vietnamese is required");
      return false;
    }

    if (!formData.hiragana.trim()) {
      setError("Hiragana is required");
      return false;
    }

    return true;
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      // Create flashcard with all 3 values
      // - front: kanji if available, otherwise hiragana
      // - back: vietnamese
      // - kana: hiragana
      const front = formData.kanji.trim() || formData.hiragana.trim();

      await onSubmit({
        front: front,
        back: formData.vietnamese.trim(),
        kana: formData.hiragana.trim(),
        note: formData.note.trim() || undefined,
        tags: formData.tags.filter((t) => t.trim()),
      });

      setSuccessMessage(`✓ Word added successfully!`);
      setFormData({
        vietnamese: "",
        hiragana: "",
        kanji: "",
        note: "",
        tags: [],
      });
      setTagInput("");

      // Reset form after short delay
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } catch (err) {
      setError("Failed to add word: " + (err as Error).message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="quick-add-overlay" onClick={onClose}>
      <div className="quick-add-modal" onClick={(e) => e.stopPropagation()}>
        <div className="quick-add-header">
          <div>
            <h3>📝 Add New Word</h3>
            <p className="mode-info">{getModeName()}</p>
          </div>
          <button
            className="close-button"
            onClick={onClose}
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="quick-add-form">
          {/* Vietnamese */}
          <div className="form-group">
            <label htmlFor="vietnamese">Vietnamese *</label>
            <input
              id="vietnamese"
              type="text"
              value={formData.vietnamese}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, vietnamese: e.target.value }))
              }
              placeholder="e.g., người, sách, học sinh"
              disabled={isLoading}
              autoFocus
            />
          </div>

          {/* Hiragana */}
          <div className="form-group">
            <label htmlFor="hiragana">Hiragana (Reading) *</label>
            <input
              id="hiragana"
              type="text"
              value={formData.hiragana}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, hiragana: e.target.value }))
              }
              placeholder="e.g., ひと, ほん, がくせい"
              disabled={isLoading}
            />
          </div>

          {/* Kanji (optional) */}
          <div className="form-group">
            <label htmlFor="kanji">
              Kanji <span className="optional">(optional)</span>
            </label>
            <input
              id="kanji"
              type="text"
              value={formData.kanji}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, kanji: e.target.value }))
              }
              placeholder="e.g., 人, 本, 学生"
              disabled={isLoading}
            />
            <p className="field-hint">
              If left empty, Hiragana will be used as the main form
            </p>
          </div>

          {/* Note */}
          <div className="form-group">
            <label htmlFor="note">
              Note / Example <span className="optional">(optional)</span>
            </label>
            <textarea
              id="note"
              value={formData.note}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, note: e.target.value }))
              }
              placeholder="Add example sentence or personal note..."
              rows={2}
              disabled={isLoading}
            />
          </div>

          {/* Tags */}
          <div className="form-group">
            <label htmlFor="tag-input">
              Tags <span className="optional">(optional)</span>
            </label>
            <div className="tags-input">
              <div className="tags">
                {formData.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="tag-remove"
                      disabled={isLoading}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                id="tag-input"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Type and press Enter"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Error message */}
          {error && <div className="error-message">{error}</div>}

          {/* Success message */}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          {/* Buttons */}
          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn-cancel"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Word"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickAddWordModal;
