import React, { useState, useEffect } from "react";
import type { CustomList } from "../types/vocabulary";
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

  // Build unit metadata
  const units: UnitMetadata[] = [
    {
      unit: "all",
      name: "Tất cả Units",
      count: Object.values(unitCounts).reduce((sum, count) => sum + count, 0),
      icon: "📚",
      color: "#667eea",
      type: "all",
    },
    ...Array.from({ length: 21 }, (_, i) => {
      const unitNum = i + 1;
      return {
        unit: unitNum,
        name: `Unit ${unitNum}`,
        count: unitCounts[unitNum] || 0,
        icon: "📖",
        color: ["#ef4444", "#f97316", "#22c55e", "#3b82f6", "#8b5cf6"][i % 5],
        type: "unit" as const,
      };
    }),
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
        `Unit ${item.unit}`.toLowerCase().includes(searchQuery.toLowerCase())),
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
        {isExpanded && (
          <>
            <span className="header-title">📚 Danh Mục</span>
            <button
              className="create-list-button"
              onClick={onCreateCustomList}
              title="Tạo danh sách riêng"
            >
              <span>+</span>
            </button>
          </>
        )}
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
            <button
              key={String(item.unit)}
              className={`nav-item ${selectedUnit === item.unit ? "active" : ""} ${item.type}`}
              onClick={() => onUnitSelect(item.unit)}
              title={`${item.name} (${item.count} từ)`}
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
                <span className="collapsed-icon" style={{ color: item.color }}>
                  {item.icon}
                </span>
              )}
            </button>
          ))
        )}
      </nav>

      {isExpanded && customLists.length === 0 && (
        <div className="empty-custom-lists">
          <p>Chưa có danh sách riêng nào</p>
          <button className="create-first-list" onClick={onCreateCustomList}>
            Tạo danh sách đầu tiên
          </button>
        </div>
      )}
    </aside>
  );
};
