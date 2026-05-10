import React from 'react';
import { VocabularyStatistics } from '../types/vocabulary';
import './StatisticsPanel.css';

interface StatisticsPanelProps {
  statistics: VocabularyStatistics;
}

/**
 * Statistics panel showing vocabulary metrics
 */
export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ statistics }) => {
  const formatDate = (timestamp?: number) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString('vi-VN');
  };

  return (
    <div className="statistics-panel">
      <h3>📊 Thống kê từ vựng</h3>
      
      <div className="stats-grid">
        <div className="stat-card stat-primary">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <div className="stat-value">{statistics.totalWords}</div>
            <div className="stat-label">Tổng số từ</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🈯</div>
          <div className="stat-content">
            <div className="stat-value">{statistics.wordsWithKanji}</div>
            <div className="stat-label">Có Kanji</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-value">{statistics.favoriteWords}</div>
            <div className="stat-label">Yêu thích</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🆕</div>
          <div className="stat-content">
            <div className="stat-value">{statistics.recentlyAdded}</div>
            <div className="stat-label">7 ngày qua</div>
          </div>
        </div>
      </div>

      {statistics.categories.length > 0 && (
        <div className="categories-section">
          <h4>📂 Phân loại theo chủ đề</h4>
          <div className="categories-list">
            {statistics.categories.map((cat) => (
              <div key={cat.name} className="category-item">
                <span className="category-name">{cat.name}</span>
                <span className="category-count">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {(statistics.oldestWord || statistics.newestWord) && (
        <div className="timeline-section">
          {statistics.oldestWord && (
            <div className="timeline-item">
              <div className="timeline-label">📅 Từ cũ nhất:</div>
              <div className="timeline-content">
                <strong>{statistics.oldestWord.vietnamese}</strong>
                <span className="timeline-date">
                  {formatDate(statistics.oldestWord.createdAt)}
                </span>
              </div>
            </div>
          )}
          
          {statistics.newestWord && (
            <div className="timeline-item">
              <div className="timeline-label">🆕 Từ mới nhất:</div>
              <div className="timeline-content">
                <strong>{statistics.newestWord.vietnamese}</strong>
                <span className="timeline-date">
                  {formatDate(statistics.newestWord.createdAt)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
