import React, { useState, useEffect } from "react";
import type { CustomList, VocabularyUnit } from "./vocabulary";
import { dynamicVocabularyStorage } from "./DynamicVocabularyStorage";
import "./UnitSelector.css";

interface UnitMetadata {
  unit: number | "all" | string;
  name: string;
  count: number;
  icon?: string;
  color?: string;
  type: "unit" | "custom" | "all";
}

interface UnitSelectorProps {
  selectedUnit: number | "all" | string;
  onUnitSelect: (unit: number | "all" | string) => void;
  customLists: CustomList[];
  onCreateCustomList: () => void;
  unitCounts: Record<number, number>;
  customListCounts: Record<string, number>;
}

/**
 * UnitSelector - Now uses dynamic vocabulary units from the new system
 */
export const UnitSelector: React.FC<UnitSelectorProps> = ({
  selectedUnit,
  onUnitSelect,
  customLists,
  onCreateCustomList,
  unitCounts,
  customListCounts,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [dynamicUnits, setDynamicUnits] = useState<VocabularyUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUnitId, setEditingUnitId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [creatingUnit, setCreatingUnit] = useState(false);
  const [newUnitName, setNewUnitName] = useState("");

  // Load dynamic vocabulary units
  useEffect(() => {
    const loadUnits = async () => {
      try {
        const units = await dynamicVocabularyStorage.getAllUnits();
        setDynamicUnits(units);
      } catch (error) {
        console.error("Failed to load dynamic units:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUnits();
  }, []);

  // Build unit metadata from dynamic units
  const units: UnitMetadata[] = [
    {
      unit: "all",
      name: "All Units",
      count: Object.values(unitCounts).reduce((sum, count) => sum + count, 0),
      icon: "📚",
      color: "#667eea",
      type: "all",
    },
    ...dynamicUnits.map((unit) => ({
      unit: unit.id,
      name: unit.name,
      count: unitCounts[unit.id] || 0,
      icon: "📖",
      color: "#667eea",
      type: "unit" as const,
    })),
  ];

  // Add custom lists to the navigation
  const customListItems: UnitMetadata[] = customLists.map((list) => ({
    unit: list.id,
    name: list.name,
    count: customListCounts[list.id] || 0,
    icon: list.icon || "📝",
    color: list.color || "#64748b",
    type: "custom",
  }));

  const allItems = [...units, ...customListItems];

  // Filter items based on search query
  const filteredItems = allItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.type === "unit" &&
        String(item.unit).toLowerCase().includes(searchQuery.toLowerCase())),
  );

  // Sync body class with sidebar state
  useEffect(() => {
    if (isExpanded) {
      document.body.classList.remove("sidebar-collapsed");
    } else {
      document.body.classList.add("sidebar-collapsed");
    }
    return () => {
      document.body.classList.remove("sidebar-collapsed");
    };
  }, [isExpanded]);

  // Handle creating a new unit
  const handleCreateUnit = async () => {
    setCreatingUnit(true);
    setNewUnitName(`Unit ${dynamicUnits.length + 1}`); // Default name
  };

  // Handle saving new unit
  const handleSaveNewUnit = async () => {
    if (!newUnitName.trim()) {
      alert("Please enter a unit name");
      return;
    }
    try {
      const newUnit = await dynamicVocabularyStorage.createUnit({
        name: newUnitName.trim(),
        description: `Created on ${new Date().toLocaleDateString()}`,
      });
      // Close modal immediately to ensure button is accessible
      setCreatingUnit(false);
      setNewUnitName("");
      // Select the new unit
      onUnitSelect(newUnit.id);
      // Refresh units
      const units = await dynamicVocabularyStorage.getAllUnits();
      setDynamicUnits(units);
    } catch (error) {
      console.error("Failed to create unit:", error);
      alert(
        `Failed to create unit: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  };

  // Handle cancel create unit
  const handleCancelCreateUnit = () => {
    setCreatingUnit(false);
    setNewUnitName("");
  };

  // Handle edit unit
  const handleEditUnit = (unitId: string, currentName: string) => {
    setEditingUnitId(unitId);
    setEditingName(currentName);
  };

  // Handle save unit name
  const handleSaveUnit = async () => {
    if (!editingUnitId || !editingName.trim()) return;
    try {
      await dynamicVocabularyStorage.updateUnit(editingUnitId, {
        name: editingName.trim(),
      });
      // Refresh units
      const units = await dynamicVocabularyStorage.getAllUnits();
      setDynamicUnits(units);
      setEditingUnitId(null);
      setEditingName("");
    } catch (error) {
      console.error("Failed to update unit:", error);
    }
  };

  // Handle delete unit
  const handleDeleteUnit = async (unitId: string, unitName: string) => {
    if (
      confirm(
        `Delete unit "${unitName}"? All vocabulary items in this unit will be deleted.`,
      )
    ) {
      try {
        await dynamicVocabularyStorage.deleteUnit(unitId);
        // Refresh units
        const units = await dynamicVocabularyStorage.getAllUnits();
        setDynamicUnits(units);
        // If the deleted unit was selected, select "all"
        if (selectedUnit === unitId) {
          onUnitSelect("all");
        }
      } catch (error) {
        console.error("Failed to delete unit:", error);
        alert(
          `Failed to delete unit: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingUnitId(null);
    setEditingName("");
  };

  if (loading) {
    return (
      <aside
        className={`unit-selector ${isExpanded ? "expanded" : "collapsed"}`}
      >
        <div className="selector-header">
          <button
            className="toggle-button"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Thu gọn" : "Mở rộng"}
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isExpanded ? "◀" : "▶"}
          </button>
          {isExpanded && <span className="header-title">📚 Danh Mục</span>}
        </div>
        <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
          Loading units...
        </div>
      </aside>
    );
  }

  return (
    <aside className={`unit-selector ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="selector-header">
        <button
          className="toggle-button"
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? "Thu gọn" : "Mở rộng"}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? "◀" : "▶"}
        </button>
        {isExpanded && <span className="header-title">📚 Units</span>}
      </div>

      {isExpanded && (
        <div
          className={`selector-search ${isSearchExpanded ? "expanded" : "collapsed"}`}
        >
          {!isSearchExpanded ? (
            <div className="search-icon-box">
              <button
                className="search-toggle-button"
                onClick={() => setIsSearchExpanded(true)}
                title="Tìm kiếm units"
                aria-label="Search"
              >
                🔍
              </button>
            </div>
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
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="clear-search"
                >
                  ×
                </button>
              )}
            </>
          )}
        </div>
      )}

      <nav className="unit-nav">
        {filteredItems.length === 0 ? (
          <div className="no-results">Không tìm thấy kết quả</div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={String(item.unit)}
              className={`nav-item-container ${item.type}`}
              title={`${item.name} (${item.count} từ)`}
            >
              <button
                className={`nav-item ${selectedUnit === item.unit ? "active" : ""} ${item.type}`}
                onClick={() => onUnitSelect(item.unit)}
              >
                {isExpanded && (
                  <>
                    <span className="item-icon" style={{ color: item.color }}>
                      {item.icon}
                    </span>
                    <span className="item-name">{item.name}</span>
                  </>
                )}
                {isExpanded && item.type !== "all" && (
                  <span className="item-count">{item.count}</span>
                )}
                {!isExpanded && (
                  <span
                    className="collapsed-icon"
                    style={{ color: item.color }}
                  >
                    {item.icon}
                  </span>
                )}
              </button>
              {isExpanded && item.type === "unit" && (
                <div className="unit-actions">
                  <button
                    className="unit-action-btn edit-btn"
                    title="Edit unit name"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditUnit(String(item.unit), item.name);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="unit-action-btn delete-btn"
                    title="Delete unit"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteUnit(String(item.unit), item.name);
                    }}
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </nav>

      {isExpanded && (
        <div className="unit-create-section">
          <button className="create-unit-button" onClick={handleCreateUnit}>
            + Add Unit
          </button>
        </div>
      )}

      {/* Edit Unit Modal */}
      {isExpanded && editingUnitId && (
        <div className="modal-overlay" onClick={handleCancelEdit}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>✏️ Edit Unit Name</h3>
              <button className="modal-close" onClick={handleCancelEdit}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                className="unit-name-input"
                placeholder="Enter new unit name"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveUnit();
                  if (e.key === "Escape") handleCancelEdit();
                }}
              />
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={handleCancelEdit}>
                Cancel
              </button>
              <button className="btn-save" onClick={handleSaveUnit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Unit Modal */}
      {isExpanded && creatingUnit && (
        <div className="modal-overlay" onClick={handleCancelCreateUnit}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>➕ Create New Unit</h3>
              <button className="modal-close" onClick={handleCancelCreateUnit}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                value={newUnitName}
                onChange={(e) => setNewUnitName(e.target.value)}
                className="unit-name-input"
                placeholder="Enter unit name (e.g., JLPT N5, Travel, My Vocabulary)"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveNewUnit();
                  if (e.key === "Escape") handleCancelCreateUnit();
                }}
              />
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={handleCancelCreateUnit}>
                Cancel
              </button>
              <button className="btn-save" onClick={handleSaveNewUnit}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
