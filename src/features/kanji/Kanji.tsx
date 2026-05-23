import React, { useState, useEffect } from "react";
import { useKanji } from "./useKanji";
import { KanjiData } from "./kanjiDatabase";
import { AssetLoader } from "../alphabet/AssetLoader";
import * as AssetService from "../alphabet/AssetService";
import "./Kanji.css";
import "../alphabet/AssetLoader.css";

interface KanjiProps {
  onNavigate: (page: string) => void;
}

/**
 * Kanji learning component for numbers 1-10
 * Features: Search by kanji/romaji/hiragana, GIF animation on click
 *
 * Updated to use remote asset URLs from cloud storage (R2, S3, Supabase)
 */
export const Kanji: React.FC<KanjiProps> = ({ onNavigate }) => {
  const {
    kanji,
    loading,
    error,
    currentKanji,
    searchKanji,
    selectKanjiByCharacter,

    getAnimationUrl,
    hasAnimation,
  } = useKanji();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<KanjiData[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showStrokeGuide, setShowStrokeGuide] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationSrc, setAnimationSrc] = useState<string | null>(null);
  const [isKanjiSelected, setIsKanjiSelected] = useState(false);
  const [animationError, setAnimationError] = useState(false);
  const [gifLoading, setGifLoading] = useState(false);

  // Handle search input change
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      const results = await searchKanji(query);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  // Handle selecting a kanji from search results
  const handleSelectKanji = async (selectedKanji: KanjiData) => {
    selectKanjiByCharacter(selectedKanji.ka_utf);
    setSearchQuery(selectedKanji.ka_utf);
    setShowSearchResults(false);
    setShowStrokeGuide(false);
    setShowAnimation(false);
    setIsKanjiSelected(true);
    setAnimationError(false);

    // Pre-fetch animation URL in background
    if (hasAnimation(selectedKanji)) {
      setGifLoading(true);
      try {
        const url = await getAnimationUrl(selectedKanji);
        if (url) {
          setAnimationSrc(url);
        }
      } catch {
        setAnimationError(true);
      } finally {
        setGifLoading(false);
      }
    }
  };

  // Close animation when clicking outside or pressing Escape
  const handleCloseAnimation = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (e.type === "keydown" && (e as React.KeyboardEvent).key !== "Escape")
      return;
    if (
      e.type === "click" &&
      (e.target as HTMLElement).className?.includes("animation-overlay")
    ) {
      setShowAnimation(false);
    }
  };

  // Handle click to show animation
  const handleShowAnimation = async () => {
    if (!currentKanji) return;

    // Try to get animation URL
    setGifLoading(true);
    setAnimationError(false);

    try {
      const url = await getAnimationUrl(currentKanji);
      if (url) {
        setAnimationSrc(url);
        setShowAnimation(true);
      } else {
        setAnimationError(true);
      }
    } catch {
      setAnimationError(true);
    } finally {
      setGifLoading(false);
    }
  };

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowAnimation(false);
      }
    };
    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, []);

  if (loading) {
    return (
      <main className="kanji-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading kanji data...</p>
        </div>
      </main>
    );
  }

  if (error || kanji.length === 0) {
    return (
      <main className="kanji-container">
        <div className="error-state">
          <h2>Error loading kanji</h2>
          <p>{error || "No kanji data available"}</p>
          <button onClick={() => onNavigate("home")} className="back-home-btn">
            ← Back to Home
          </button>
        </div>
      </main>
    );
  }

  // Get animation URL candidates for current kanji (synchronous for immediate display)
  const animationCandidates = currentKanji
    ? AssetService.getStrokeAnimationUrls(
        currentKanji.ka_id,
        currentKanji.ka_utf,
      )
    : [];
  const imageAnimationCandidates = animationCandidates.filter(
    (url) => !url.endsWith(".mp4"),
  );
  const currentAnimationUrl = imageAnimationCandidates[0] || null;
  const animationAvailable = currentKanji ? hasAnimation(currentKanji) : false;

  return (
    <main className="kanji-container">
      <div className="kanji-header">
        <h1>🎌 学ぶ漢字 - Kanji Learning</h1>
        <p>Search by kanji, romaji, or hiragana (数字 1-10)</p>
      </div>

      {/* Search Box */}
      <div className="kanji-search-section">
        <div className="search-box-wrapper">
          <input
            type="text"
            className="kanji-search-box"
            placeholder="Search: 一, ichi, いち..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() =>
              searchQuery.trim().length > 0 && setShowSearchResults(true)
            }
          />
          {searchQuery && (
            <button
              className="search-clear-btn"
              onClick={() => {
                setSearchQuery("");
                setSearchResults([]);
                setShowSearchResults(false);
              }}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Search Results / Suggestions */}
        {showSearchResults && (
          <div className="search-results">
            {searchResults.length > 0 ? (
              <div className="suggestions-list">
                {searchResults.map((result) => (
                  <button
                    key={result.ka_id}
                    className="suggestion-item"
                    onClick={() => handleSelectKanji(result)}
                  >
                    <span className="suggestion-kanji">{result.ka_utf}</span>
                    <span className="suggestion-info">
                      <span className="suggestion-romaji">{result.kname}</span>
                      <span className="suggestion-meaning">
                        {result.meaning}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>
                  No kanji found. Try searching for 一, 二, 三... or ichi, ni,
                  san...
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Kanji Display (only if one is selected by user) */}
      {currentKanji && isKanjiSelected && (
        <>
          <div className="kanji-main-display">
            <div className="kanji-card">
              {/* Kanji character - clickable for animation */}
              <div className="kanji-visualization">
                {animationAvailable && currentAnimationUrl && !gifLoading ? (
                  <div
                    className="kanji-gif-display"
                    onClick={handleShowAnimation}
                    style={{ cursor: "pointer" }}
                    title="Click to expand animation"
                  >
                    {gifLoading ? (
                      <div className="gif-loading">
                        <div className="small-spinner" />
                      </div>
                    ) : (
                      <AssetLoader
                        src={currentAnimationUrl}
                        alt={`Writing animation for ${currentKanji.ka_utf}`}
                        className="kanji-gif-img"
                        fallbackUrls={imageAnimationCandidates.slice(1)}
                        onError={() => setAnimationError(true)}
                        lazyLoad={false}
                        showLoading={true}
                        showError={false}
                      />
                    )}
                  </div>
                ) : animationError ? (
                  <div className="kanji-large" title="GIF not available">
                    {currentKanji.ka_utf}
                  </div>
                ) : (
                  <div className="kanji-large" title="Click to view">
                    {currentKanji.ka_utf}
                  </div>
                )}
              </div>

              {/* Character details */}
              <div className="kanji-details">
                <div className="detail-row">
                  <span className="label">Kanji:</span>
                  <span className="kanji-char">{currentKanji.ka_utf}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Meaning:</span>
                  <span className="value">{currentKanji.meaning}</span>
                </div>
                <div className="detail-row">
                  <span className="label">On-yomi:</span>
                  <span className="value">{currentKanji.onyomi_ja}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Kun-yomi:</span>
                  <span className="value">
                    {currentKanji.kunyomi_ja} ({currentKanji.kunyomi})
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">Strokes:</span>
                  <span className="value">{currentKanji.kstroke}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Radical:</span>
                  <span className="value">
                    {currentKanji.rad_name} ({currentKanji.rad_utf})
                  </span>
                </div>
              </div>

              {/* Examples section */}
              {currentKanji.examples && currentKanji.examples.length > 0 && (
                <div className="examples-section">
                  <h3>例 - Examples:</h3>
                  <div className="examples-list">
                    {currentKanji.examples.map((example, idx) => (
                      <div key={idx} className="example-item">
                        <span className="example-text">{example[0]}</span>
                        <span className="example-meaning">{example[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stroke guide toggle */}
              <button
                className={`stroke-guide-btn ${showStrokeGuide ? "active" : ""}`}
                onClick={() => setShowStrokeGuide(!showStrokeGuide)}
              >
                {showStrokeGuide ? "✓ Stroke Guide Shown" : "Show Stroke Guide"}
              </button>
            </div>

            {/* Writing practice hint */}
            {showStrokeGuide && (
              <div className="stroke-guide">
                <h3>✏️ How to Write</h3>
                <p>This character has {currentKanji.kstroke} stroke(s).</p>
                <p className="hint">
                  Practice writing the character following proper stroke order:
                </p>
                <div className="stroke-info">
                  <p>
                    Stroke count: <strong>{currentKanji.kstroke}</strong>
                  </p>
                  <p>
                    Radical: <strong>{currentKanji.rad_name}</strong> (
                    {currentKanji.rad_utf})
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Learning tips */}
          <section className="learning-tips">
            <h3>💡 Learning Tips</h3>
            <ul>
              <li>
                <strong>On-yomi (音読み):</strong> Chinese reading, used in most
                modern words
              </li>
              <li>
                <strong>Kun-yomi (訓読み):</strong> Japanese reading, often used
                in native words
              </li>
              <li>
                <strong>Radical (部首):</strong> The key component that groups
                kanji by meaning
              </li>
              <li>
                <strong>Animation:</strong> Click the kanji to view writing
                animation
              </li>
              <li>
                <strong>Practice:</strong> Write each kanji repeatedly to
                improve retention
              </li>
            </ul>
          </section>
        </>
      )}

      {/* Animation Modal */}
      {showAnimation && animationSrc && (
        <div className="animation-overlay" onClick={handleCloseAnimation}>
          <div className="animation-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="animation-close-btn"
              onClick={() => setShowAnimation(false)}
              title="Close (ESC)"
            >
              ✕
            </button>
            <h2>Writing Animation - {currentKanji?.ka_utf}</h2>
            <div className="animation-container">
              {gifLoading ? (
                <div className="animation-loading">
                  <div className="spinner"></div>
                  <p>Loading animation...</p>
                </div>
              ) : animationError ? (
                <div className="animation-error">
                  <p>Unable to load animation</p>
                  <p className="error-path">{animationSrc}</p>
                  <p className="hint">
                    Try again later or check your connection.
                  </p>
                </div>
              ) : (
                <AssetLoader
                  src={animationSrc}
                  alt={`Writing animation for ${currentKanji?.ka_utf}`}
                  className="animation-img"
                  fallbackUrls={imageAnimationCandidates.filter(
                    (url) => url !== animationSrc,
                  )}
                  onError={() => setAnimationError(true)}
                  lazyLoad={false}
                  showLoading={true}
                  showError={true}
                  fallbackContent={
                    <div className="animation-fallback">
                      <span className="fallback-char">
                        {currentKanji?.ka_utf}
                      </span>
                      <p>Animation file not found</p>
                    </div>
                  }
                />
              )}
            </div>
            <p className="animation-hint">Press ESC to close</p>
          </div>
        </div>
      )}

      {/* Back button */}
      <div className="kanji-footer">
        <button className="back-home-btn" onClick={() => onNavigate("home")}>
          ← Back to Home
        </button>
      </div>
    </main>
  );
};

export default Kanji;
