import React, { useState, useMemo, useEffect } from "react";
import { VocabularyItem } from "../types/vocabulary";
import { ttsService } from "../services/TextToSpeechService";
import "./VocabularyTable.css";

interface VocabularyTableProps {
  vocabulary: VocabularyItem[];
  onStartPractice?: (unit: number | "all" | string) => void;
  selectedUnit?: number | "all" | string;
  onUnitChange?: (unit: number | "all" | string) => void;
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [internalSelectedUnit, setInternalSelectedUnit] = useState<
    number | "all" | string
  >("all");
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [femaleVoices, setFemaleVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(0);
  const [showVoiceSelector, setShowVoiceSelector] = useState(false);
  const [testingVoiceIndex, setTestingVoiceIndex] = useState<number | null>(
    null,
  );

  // Load female voices on component mount
  useEffect(() => {
    const loadVoices = () => {
      const voices = ttsService.getFemaleJapaneseVoices();
      console.log(
        "🎙️ Female voices found:",
        voices.length,
        voices.map((v) => v.name),
      );
      setFemaleVoices(voices);

      // Set the first female voice as default
      if (voices.length > 0) {
        ttsService.setVoice(voices[0]);
        console.log("✅ Default voice set to:", voices[0].name);
      } else {
        console.warn("⚠️ No female voices available");
      }
    };

    // Voices might not be loaded immediately
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      loadVoices();
    }

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Use controlled or internal state
  const selectedUnit =
    controlledSelectedUnit !== undefined
      ? controlledSelectedUnit
      : internalSelectedUnit;
  const setSelectedUnit = (unit: number | "all" | string) => {
    if (onUnitChange) {
      onUnitChange(unit);
    } else {
      setInternalSelectedUnit(unit);
    }
  };

  // Get unique categories and units
  const categories = useMemo(() => {
    const cats = new Set(vocabulary.map((item) => item.category || "other"));
    return ["all", ...Array.from(cats)];
  }, [vocabulary]);

  const availableUnits = useMemo(() => {
    const units = new Set(vocabulary.map((item) => item.unit || 1));
    return Array.from(units).sort((a, b) => (a as number) - (b as number));
  }, [vocabulary]);

  // Filter vocabulary
  const filteredVocabulary = useMemo(() => {
    let result = [...vocabulary];

    // Filter by unit
    if (selectedUnit !== "all") {
      result = result.filter((item) => (item.unit || 1) === selectedUnit);
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(
        (item) => (item.category || "other") === selectedCategory,
      );
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.hiragana.includes(term) ||
          item.kanji?.includes(term) ||
          item.vietnamese.toLowerCase().includes(term),
      );
    }

    return result;
  }, [vocabulary, selectedUnit, selectedCategory, searchTerm]);

  // Category labels in Vietnamese
  const categoryLabels: Record<string, string> = {
    all: "Tất cả",
    pronoun: "Đại từ",
    people: "Con người",
    occupation: "Nghề nghiệp",
    country: "Quốc gia",
    place: "Địa điểm",
    greeting: "Chào hỏi",
    grammar: "Ngữ pháp",
    question: "Câu hỏi",
    number: "Số đếm",
    honorific: "Kính ngữ",
    phrase: "Cụm từ",
    other: "Khác",
  };

  /**
   * Handle pronunciation of vocabulary item
   */
  const handleSpeak = (item: VocabularyItem) => {
    // Use kanji if available, otherwise use hiragana
    const textToSpeak = item.kanji || item.hiragana;
    setPlayingId(item.id);

    // Set the selected voice before speaking
    if (femaleVoices.length > 0 && selectedVoiceIndex < femaleVoices.length) {
      ttsService.setVoice(femaleVoices[selectedVoiceIndex]);
    }

    ttsService.speak(textToSpeak);

    // Reset playing state after a reasonable time (in case speech ends without callback)
    setTimeout(() => {
      setPlayingId(null);
    }, 3000);
  };

  /**
   * Handle voice selection change
   */
  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value, 10);
    setSelectedVoiceIndex(index);

    if (femaleVoices.length > 0 && index < femaleVoices.length) {
      ttsService.setVoice(femaleVoices[index]);

      // Play a test pronunciation
      ttsService.speak("こんにちは");
    }
  };

  /**
   * Handle voice selection from modal
   */
  const handleSelectVoice = (index: number) => {
    setSelectedVoiceIndex(index);
    if (femaleVoices.length > 0 && index < femaleVoices.length) {
      ttsService.setVoice(femaleVoices[index]);
    }
  };

  /**
   * Test a specific voice
   */
  const handleTestVoice = (index: number) => {
    setTestingVoiceIndex(index);
    if (femaleVoices.length > 0 && index < femaleVoices.length) {
      ttsService.setVoice(femaleVoices[index]);
      ttsService.speak("こんにちは、私の名前は何ですか。");

      // Reset after 4 seconds
      setTimeout(() => {
        setTestingVoiceIndex(null);
      }, 4000);
    }
  };

  return (
    <div className="vocabulary-table-container">
      <div className="table-header">
        <div className="table-controls">
          <div className="search-box">
            <svg
              className="search-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
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
                onClick={() => setSearchTerm("")}
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
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {categoryLabels[cat] || cat}
              </option>
            ))}
          </select>

          {femaleVoices.length > 0 && (
            <select
              value={selectedVoiceIndex}
              onChange={handleVoiceChange}
              className="voice-select"
              aria-label="Chọn giọng phát âm"
            >
              {femaleVoices.map((voice, index) => (
                <option key={index} value={index}>
                  {voice.name}
                </option>
              ))}
            </select>
          )}

          {femaleVoices.length > 0 && (
            <button
              onClick={() => setShowVoiceSelector(true)}
              className="voice-settings-button"
              aria-label="Cài đặt giọng phát âm"
              title="Chọn giọng phát âm"
            >
              🎙️ Giọng nữ
            </button>
          )}

          {onStartPractice && (
            <button
              onClick={() => setShowUnitModal(true)}
              className="practice-button"
            >
              🎴 Luyện tập Flashcard
            </button>
          )}
        </div>

        <div className="table-info">
          <span>
            Hiển thị {filteredVocabulary.length} / {vocabulary.length} từ
          </span>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="vocabulary-table">
          <thead>
            <tr>
              <th className="col-speaker">🔊</th>
              <th className="col-hiragana">Hiragana</th>
              <th className="col-kanji">Kanji</th>
              <th className="col-vietnamese">Tiếng Việt</th>
              <th className="col-example">Ví dụ (Hiragana)</th>
            </tr>
          </thead>
          <tbody>
            {filteredVocabulary.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty-message">
                  Không tìm thấy từ vựng nào
                </td>
              </tr>
            ) : (
              filteredVocabulary.map((item) => (
                <tr key={item.id} className="vocab-row">
                  <td className="col-speaker">
                    <button
                      className={`speaker-button ${playingId === item.id ? "playing" : ""}`}
                      onClick={() => handleSpeak(item)}
                      aria-label={`Phát âm: ${item.hiragana}`}
                      title="Nhấn để phát âm"
                    >
                      🔊
                    </button>
                  </td>
                  <td className="col-hiragana">{item.hiragana}</td>
                  <td className="col-kanji">{item.kanji || "—"}</td>
                  <td className="col-vietnamese">{item.vietnamese}</td>
                  <td className="col-example">{item.exampleSentenceHiragana || "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filteredVocabulary.length > 0 && (
        <div className="table-footer">
          <p>
            💡 Mẹo: Click vào "Luyện tập Flashcard" để học từ vựng một cách hiệu
            quả!
          </p>
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
                    onStartPractice?.("all");
                    setShowUnitModal(false);
                  }}
                >
                  <span className="unit-icon">📚</span>
                  <span className="unit-name">Tất cả Units</span>
                  <span className="unit-count">{vocabulary.length} từ</span>
                </button>
                {availableUnits.map((unit) => {
                  const unitVocab = vocabulary.filter((v) => v.unit === unit);
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
                      <span className="unit-count">{unitVocab.length} từ</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Voice Selector Modal */}
      {showVoiceSelector && (
        <div
          className="modal-overlay"
          onClick={() => setShowVoiceSelector(false)}
        >
          <div
            className="modal-content voice-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>🎙️ Chọn Giọng Phát Âm</h3>
              <button
                className="modal-close"
                onClick={() => setShowVoiceSelector(false)}
                aria-label="Đóng"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-description">
                Có {femaleVoices.length} giọng nữ tiếng Nhật. Chọn giọng bạn
                thích:
              </p>
              <div className="voice-list">
                {femaleVoices.map((voice, index) => (
                  <div key={index} className="voice-item">
                    <div className="voice-info">
                      <input
                        type="radio"
                        id={`voice-${index}`}
                        name="female-voice"
                        value={index}
                        checked={selectedVoiceIndex === index}
                        onChange={() => handleSelectVoice(index)}
                        className="voice-radio"
                      />
                      <label htmlFor={`voice-${index}`} className="voice-name">
                        {index + 1}. {voice.name}
                      </label>
                    </div>
                    <button
                      className={`test-button ${testingVoiceIndex === index ? "playing" : ""}`}
                      onClick={() => handleTestVoice(index)}
                      disabled={
                        testingVoiceIndex !== null &&
                        testingVoiceIndex !== index
                      }
                      title="Nghe thử giọng này"
                    >
                      {testingVoiceIndex === index
                        ? "🔊 Đang phát..."
                        : "🔊 Test"}
                    </button>
                  </div>
                ))}
              </div>
              <div className="voice-preview">
                <p className="preview-text">
                  <strong>Giọng được chọn:</strong>{" "}
                  {femaleVoices[selectedVoiceIndex]?.name}
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="confirm-button"
                onClick={() => setShowVoiceSelector(false)}
              >
                ✓ Xác Nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
