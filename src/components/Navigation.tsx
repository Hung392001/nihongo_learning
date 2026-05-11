import React from 'react';
import './Navigation.css';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  darkMode: boolean;
  onThemeToggle: () => void;
}

/**
 * Navigation component for switching between pages and themes
 */
export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  darkMode,
  onThemeToggle,
}) => {
  const isHome = currentPage === 'home';

  // Page names in Vietnamese
  const pageNames: Record<string, string> = {
    home: 'Trang chủ',
    flashcards: 'Flashcards',
    vocabulary: 'Từ vựng',
    alphabet: 'Bảng chữ cái',
    grammar: 'Ngữ pháp',
    kanji: 'Kanji',
  };

  return (
    <nav className="app-navigation">
      <div className="nav-left">
        <button
          className={`nav-logo ${isHome ? 'active' : ''}`}
          onClick={() => onNavigate('home')}
          title="Back to home"
        >
          🇯🇵 Nihongo Learning
        </button>
      </div>

      <div className="nav-center">
        {!isHome && (
          <div className="nav-breadcrumb">
            <button className="breadcrumb-item" onClick={() => onNavigate('home')}>
              Trang chủ
            </button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-item current">
              {pageNames[currentPage] || currentPage}
            </span>
          </div>
        )}
      </div>

      <div className="nav-right">
        <button
          className="nav-theme-toggle"
          onClick={onThemeToggle}
          title={darkMode ? 'Light mode' : 'Dark mode'}
          aria-label="Toggle theme"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
};
