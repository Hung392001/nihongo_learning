import React from 'react';
import './Navigation.css';
import { VietnameseFlagIcon, EnglishFlagIcon } from './icons';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  darkMode: boolean;
  onThemeToggle: () => void;
  language?: "vietnamese" | "english";
  onLanguageToggle?: () => void;
}

/**
 * Navigation component for switching between pages and themes
 */
export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  darkMode,
  onThemeToggle,
  language = "vietnamese",
  onLanguageToggle,
}) => {
  const isHome = currentPage === 'home';

  // Page names in English
  const pageNames: Record<string, string> = {
    home: 'Home',
    flashcards: 'Flashcards Practice',
    vocabulary: 'Vocabulary (Old)',
    'dynamic-vocabulary': 'Vocabulary Units',
    alphabet: 'Alphabets',
    grammar: 'Grammar',
    kanji: 'Kanji',
  };

  // Show breadcrumb only for non-home pages
  const showBreadcrumb = !isHome && currentPage !== 'dynamic-vocabulary';

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
        {!isHome && showBreadcrumb && (
          <div className="nav-breadcrumb">
            <button className="breadcrumb-item" onClick={() => onNavigate('home')}>
              Home
            </button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-item current">
              {pageNames[currentPage] || currentPage}
            </span>
          </div>
        )}
        {currentPage === 'dynamic-vocabulary' && (
          <div className="nav-breadcrumb">
            <button className="breadcrumb-item" onClick={() => onNavigate('home')}>
              Home
            </button>
            <span className="breadcrumb-separator">/</span>
            <button className="breadcrumb-item" onClick={() => onNavigate('vocabulary/units')}>
              Vocabulary Units
            </button>
          </div>
        )}
      </div>

      <div className="nav-right">
        {onLanguageToggle && (
          <button
            className="nav-language-toggle"
            onClick={onLanguageToggle}
            title={language === "vietnamese" ? "Switch to English" : "Switch to Vietnamese"}
            aria-label="Toggle language"
          >
            {language === "vietnamese" ? (
              <VietnameseFlagIcon size={24} />
            ) : (
              <EnglishFlagIcon size={24} />
            )}
          </button>
        )}
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
