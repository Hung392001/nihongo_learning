import React, { useState, useMemo } from "react";
import {
  VocabularyItem,
  CreateVocabularyDto,
  UpdateVocabularyDto,
  SortOption,
} from "../types/vocabulary";
import { sortVocabulary, filterVocabulary } from "../utils/flashcardHelpers";
import "./VocabularyManager.css";

interface VocabularyManagerProps {
  vocabulary: VocabularyItem[];
  onCreate: (data: CreateVocabularyDto) => Promise<VocabularyItem | void>;
  onUpdate: (
    id: string,
    data: UpdateVocabularyDto,
  ) => Promise<VocabularyItem | void>;
  onDelete: (id: string) => Promise<void>;
}

/**
 * Vocabulary management panel
 * Allows adding, editing, and deleting vocabulary items
 */
export const VocabularyManager: React.FC<VocabularyManagerProps> = ({
  vocabulary,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [formData, setFormData] = useState<CreateVocabularyDto>({
    vietnamese: "",
    hiragana: "",
    kanji: "",
  });

  // Filter and sort vocabulary
  const processedVocabulary = useMemo(() => {
    let result = [...vocabulary];

    // Filter by search query
    if (searchQuery.trim()) {
      result = filterVocabulary(result, searchQuery);
    }

    // Filter favorites only
    if (showFavoritesOnly) {
      result = result.filter((item) => item.isFavorite);
    }

    // Sort
    result = sortVocabulary(result, sortBy);

    return result;
  }, [vocabulary, searchQuery, sortBy, showFavoritesOnly]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.vietnamese.trim() || !formData.hiragana.trim()) {
      alert("Vietnamese and Hiragana fields are required");
      return;
    }

    try {
      if (editingId) {
        await onUpdate(editingId, formData);
        setEditingId(null);
      } else {
        await onCreate(formData);
      }
      setFormData({ vietnamese: "", hiragana: "", kanji: "" });
    } catch (error) {
      alert(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleEdit = (item: VocabularyItem) => {
    setEditingId(item.id);
    setFormData({
      vietnamese: item.vietnamese,
      hiragana: item.hiragana,
      kanji: item.kanji || "",
    });
    setIsOpen(true);
  };

  const handleToggleFavorite = async (id: string) => {
    const item = vocabulary.find((v) => v.id === id);
    if (item) {
      try {
        await onUpdate(id, { isFavorite: !item.isFavorite });
      } catch (error) {
        console.error("Failed to toggle favorite:", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this word?")) {
      try {
        await onDelete(id);
      } catch (error) {
        alert(error instanceof Error ? error.message : "Failed to delete");
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ vietnamese: "", hiragana: "", kanji: "" });
  };

  const handleToggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === vocabulary.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(vocabulary.map((item) => item.id)));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) return;

    const count = selectedIds.size;
    if (!confirm(`Bạn có chắc muốn xóa ${count} từ đã chọn?`)) return;

    let successCount = 0;
    for (const id of selectedIds) {
      try {
        await onDelete(id);
        successCount++;
      } catch (error) {
        console.error("Failed to delete item:", id, error);
      }
    }

    setSelectedIds(new Set());
    alert(`Đã xóa thành công ${successCount}/${count} từ!`);
  };

  const handleClearAll = async () => {
    if (vocabulary.length === 0) return;

    const confirmed = confirm(
      `⚠️ CẢNH BÁO: Bạn sắp xóa TẤT CẢ ${vocabulary.length} từ vựng!\n\n` +
        `Hành động này KHÔNG THỂ HOÀN TÁC.\n\n` +
        `Bạn có chắc chắn muốn tiếp tục?`,
    );

    if (!confirmed) return;

    // Double confirmation for safety
    const doubleConfirm = confirm(
      `Xác nhận lần cuối: Xóa hết ${vocabulary.length} từ vựng?`,
    );

    if (!doubleConfirm) return;

    let successCount = 0;
    for (const item of vocabulary) {
      try {
        await onDelete(item.id);
        successCount++;
      } catch (error) {
        console.error("Failed to delete item:", item.id, error);
      }
    }

    setSelectedIds(new Set());
    alert(`Đã xóa thành công ${successCount}/${vocabulary.length} từ!`);
  };

  const handleExport = () => {
    try {
      const dataStr = JSON.stringify(vocabulary, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `nihongo-vocabulary-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert("Failed to export vocabulary");
      console.error("Export error:", error);
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content) as VocabularyItem[];

        // Validate structure
        if (!Array.isArray(importedData)) {
          throw new Error("Invalid file format: expected an array");
        }

        // Validate each item
        for (const item of importedData) {
          if (!item.vietnamese || !item.hiragana) {
            throw new Error("Invalid vocabulary item: missing required fields");
          }
        }

        // Ask user: merge or overwrite
        const shouldOverwrite = confirm(
          `Found ${importedData.length} words in the file.\n\n` +
            `Click OK to REPLACE all existing vocabulary.\n` +
            `Click Cancel to ADD to existing vocabulary.`,
        );

        if (shouldOverwrite) {
          // Clear existing vocabulary
          const existingIds = vocabulary.map((item) => item.id);
          for (const id of existingIds) {
            await onDelete(id);
          }
        }

        // Import new items
        let successCount = 0;
        for (const item of importedData) {
          try {
            await onCreate({
              vietnamese: item.vietnamese,
              hiragana: item.hiragana,
              kanji: item.kanji || null,
            });
            successCount++;
          } catch (error) {
            console.error("Failed to import item:", item, error);
          }
        }

        alert(
          `Successfully imported ${successCount} of ${importedData.length} words!`,
        );
      } catch (error) {
        alert(error instanceof Error ? error.message : "Failed to import file");
        console.error("Import error:", error);
      }
    };

    reader.readAsText(file);
    // Reset file input
    event.target.value = "";
  };

  return (
    <div className="vocabulary-manager">
      <button
        className="toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12h14"></path>
        </svg>
        Manage Vocabulary ({vocabulary.length})
      </button>

      {isOpen && (
        <div className="manager-panel">
          <div className="import-export-buttons">
            <button
              onClick={handleExport}
              className="btn-export"
              disabled={vocabulary.length === 0}
              title="Export vocabulary as JSON"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Export JSON
            </button>

            <label className="btn-import">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              Import JSON
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: "none" }}
              />
            </label>

            <button
              onClick={handleClearAll}
              className="btn-clear-all"
              disabled={vocabulary.length === 0}
              title="Xóa tất cả từ vựng"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
              Xóa Hết
            </button>
          </div>

          <form onSubmit={handleSubmit} className="vocab-form">
            <h3>{editingId ? "Edit Word" : "Add New Word"}</h3>

            <div className="form-group">
              <label htmlFor="vietnamese">Vietnamese *</label>
              <input
                id="vietnamese"
                type="text"
                value={formData.vietnamese}
                onChange={(e) =>
                  setFormData({ ...formData, vietnamese: e.target.value })
                }
                placeholder="e.g., Xin chào"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="hiragana">Hiragana *</label>
              <input
                id="hiragana"
                type="text"
                value={formData.hiragana}
                onChange={(e) =>
                  setFormData({ ...formData, hiragana: e.target.value })
                }
                placeholder="e.g., こんにちは"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="kanji">Kanji (optional)</label>
              <input
                id="kanji"
                type="text"
                value={formData.kanji || ""}
                onChange={(e) =>
                  setFormData({ ...formData, kanji: e.target.value })
                }
                placeholder="e.g., 今日は"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId ? "Update" : "Add"} Word
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="vocab-list">
            <div className="vocab-list-header">
              <h3>Vocabulary List</h3>

              {vocabulary.length > 0 && (
                <>
                  <div className="search-sort-controls">
                    <div
                      className={`search-box ${isSearchExpanded ? "expanded" : "collapsed"}`}
                    >
                      {!isSearchExpanded ? (
                        <button
                          className="search-toggle-button"
                          onClick={() => setIsSearchExpanded(true)}
                          title="Tìm kiếm từ vựng"
                          aria-label="Search vocabulary"
                        >
                          🔍
                        </button>
                      ) : (
                        <>
                          <button
                            className="search-back-button"
                            onClick={() => {
                              setIsSearchExpanded(false);
                              setSearchQuery("");
                            }}
                            title="Đóng tìm kiếm"
                            aria-label="Close search"
                          >
                            ←
                          </button>
                          <input
                            type="text"
                            placeholder="Tìm kiếm từ vựng..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                            autoFocus
                          />
                          {searchQuery && (
                            <button
                              onClick={() => setSearchQuery("")}
                              className="clear-search"
                              aria-label="Xóa tìm kiếm"
                            >
                              ×
                            </button>
                          )}
                        </>
                      )}
                    </div>

                    <div className="sort-filter-controls">
                      <select
                        value={sortBy}
                        onChange={(e) =>
                          setSortBy(e.target.value as SortOption)
                        }
                        className="sort-select"
                      >
                        <option value="newest">Mới nhất</option>
                        <option value="oldest">Cũ nhất</option>
                        <option value="az">A → Z</option>
                        <option value="za">Z → A</option>
                        <option value="kanji-first">Có Kanji trước</option>
                        <option value="favorite-first">Yêu thích trước</option>
                      </select>

                      <label className="favorites-filter">
                        <input
                          type="checkbox"
                          checked={showFavoritesOnly}
                          onChange={(e) =>
                            setShowFavoritesOnly(e.target.checked)
                          }
                          className="filter-checkbox"
                        />
                        <span>⭐ Chỉ yêu thích</span>
                      </label>
                    </div>
                  </div>

                  <div className="bulk-actions">
                    <label className="select-all-label">
                      <input
                        type="checkbox"
                        checked={
                          selectedIds.size === processedVocabulary.length &&
                          processedVocabulary.length > 0
                        }
                        onChange={handleSelectAll}
                        className="select-checkbox"
                      />
                      <span>Chọn hết ({processedVocabulary.length})</span>
                    </label>
                    {selectedIds.size > 0 && (
                      <button
                        onClick={handleDeleteSelected}
                        className="btn-delete-selected"
                        title={`Xóa ${selectedIds.size} từ đã chọn`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        Xóa đã chọn ({selectedIds.size})
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
            {processedVocabulary.length === 0 ? (
              <p className="empty-state">
                {searchQuery || showFavoritesOnly
                  ? "Không tìm thấy từ vựng nào."
                  : "No vocabulary yet. Add your first word!"}
              </p>
            ) : (
              <div className="vocab-items">
                {processedVocabulary.map((item) => (
                  <div
                    key={item.id}
                    className={`vocab-item ${selectedIds.has(item.id) ? "selected" : ""}`}
                  >
                    <div className="vocab-select">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(item.id)}
                        onChange={() => handleToggleSelect(item.id)}
                        className="select-checkbox"
                        title="Chọn để xóa"
                      />
                    </div>
                    <div className="vocab-content">
                      <div className="vocab-field">
                        <span className="field-label">VI:</span>
                        <span className="field-value">{item.vietnamese}</span>
                      </div>
                      <div className="vocab-field">
                        <span className="field-label">Hiragana:</span>
                        <span className="field-value">{item.hiragana}</span>
                      </div>
                      {item.kanji && (
                        <div className="vocab-field">
                          <span className="field-label">Kanji:</span>
                          <span className="field-value">{item.kanji}</span>
                        </div>
                      )}
                    </div>
                    <div className="vocab-actions">
                      <button
                        onClick={() => handleToggleFavorite(item.id)}
                        className={`btn-icon btn-favorite ${item.isFavorite ? "active" : ""}`}
                        title={
                          item.isFavorite
                            ? "Bỏ yêu thích"
                            : "Đánh dấu yêu thích"
                        }
                        aria-label="Toggle favorite"
                      >
                        {item.isFavorite ? "⭐" : "☆"}
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="btn-icon"
                        title="Edit"
                        aria-label="Edit word"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn-icon btn-delete"
                        title="Delete"
                        aria-label="Delete word"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
