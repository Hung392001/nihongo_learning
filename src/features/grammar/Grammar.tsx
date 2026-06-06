import React, { useState } from "react";
import "./Grammar.css";
import { unit1 } from "./units/unit1";
import { unit2 } from "./units/unit2";
import { unit3 } from "./units/unit3";
import { unit4 } from "./units/unit4";
import { unit5 } from "./units/unit5";
import { unit6 } from "./units/unit6";
import { unit7 } from "./units/unit7";
import { unit8 } from "./units/unit8";
import { unit9 } from "./units/unit9";
import { unit10 } from "./units/unit10";
import { unit11 } from "./units/unit11";
import { unit12 } from "./units/unit12";
import { unit13 } from "./units/unit13";
import { unit14 } from "./units/unit14";
import { unit15 } from "./units/unit15";
import { unit16 } from "./units/unit16";
import { GrammarLesson, GrammarContent, TextItem } from "./units/types";

interface GrammarProps {
  onNavigate?: (page: string) => void;
}

export const Grammar: React.FC<GrammarProps> = ({ onNavigate }) => {
  const [selectedUnit, setSelectedUnit] = useState<string>("unit1");
  const [language, setLanguage] = useState<"vietnamese" | "english">(
    "vietnamese",
  );

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "vietnamese" ? "english" : "vietnamese"));
  };

  const grammarLessons: Record<string, GrammarLesson> = {
    unit1,
    unit2,
    unit3,
    unit4,
    unit5,
    unit6,
    unit7,
    unit8,
    unit9,
    unit10,
    unit11,
    unit12,
    unit13,
    unit14,
    unit15,
    unit16,
  };

  const renderTextContent = (
    text: string | TextItem[] | undefined,
  ): React.ReactNode => {
    if (!text) return null;

    if (Array.isArray(text)) {
      return (
        <div className="multi-text-content">
          {text.map((item: TextItem, idx: number) => {
            const displayText =
              language === "vietnamese"
                ? item.vietnamese || item.text || ""
                : item.english || item.text || "";

            return (
              <div key={idx} className="text-item">
                <p
                  className={
                    language === "vietnamese" ? "vietnamese" : "english"
                  }
                  dangerouslySetInnerHTML={{ __html: displayText }}
                />
                {item.structure && (
                  <p
                    className={
                      language === "vietnamese" ? "vietnamese" : "english"
                    }
                  >
                    <span
                      className="formula-block"
                      dangerouslySetInnerHTML={{
                        __html: item.structure,
                      }}
                    />
                  </p>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <p
        className={language === "vietnamese" ? "vietnamese" : "english"}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  };

  const renderContent = (
    content: GrammarContent,
    index: number,
  ): React.ReactNode => {
    switch (content.type) {
      case "title":
        return (
          <h3
            key={index}
            className="grammar-section-title"
            dangerouslySetInnerHTML={{
              __html:
                language === "vietnamese"
                  ? content.vietnamese ||
                    (typeof content.text === "string"
                      ? content.text
                      : String(content.text))
                  : content.english ||
                    (typeof content.text === "string"
                      ? content.text
                      : String(content.text)),
            }}
          />
        );

      case "explanation":
        return (
          <div key={index} className="grammar-explanation">
            {content.text && renderTextContent(content.text)}
            {!content.text && (
              <p
                className={language === "vietnamese" ? "vietnamese" : "english"}
                dangerouslySetInnerHTML={{
                  __html:
                    language === "vietnamese"
                      ? content.vietnamese || ""
                      : content.english || "",
                }}
              />
            )}
            {content.structure && !Array.isArray(content.text) && (
              <p
                className={language === "vietnamese" ? "vietnamese" : "english"}
              >
                <span
                  className="formula-block"
                  dangerouslySetInnerHTML={{
                    __html: content.structure,
                  }}
                />
              </p>
            )}
          </div>
        );

      case "example":
        return (
          <div key={index} className="grammar-examples">
            {content.examples?.map((ex, idx) => (
              <div key={idx} className="example-item">
                <div key={idx} className="example-text">
                  <p
                    className="example-japanese"
                    dangerouslySetInnerHTML={{ __html: ex.japanese }}
                  />
                  <p
                    className="example-english"
                    dangerouslySetInnerHTML={{ __html: ex.english }}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case "note":
        return (
          <div key={index} className="grammar-note">
            <p
              className={language === "vietnamese" ? "vietnamese" : "english"}
              dangerouslySetInnerHTML={{
                __html:
                  language === "vietnamese"
                    ? `<strong>💡 ${
                        content.vietnamese ||
                        (typeof content.text === "string"
                          ? content.text
                          : "") ||
                        ""
                      }</strong>`
                    : `<strong>💡 ${
                        content.english ||
                        (typeof content.text === "string"
                          ? content.text
                          : "") ||
                        ""
                      }</strong>`,
              }}
            />
          </div>
        );

      case "table":
        return (
          <div
            key={index}
            className="grammar-table"
            dangerouslySetInnerHTML={{
              __html:
                language === "vietnamese"
                  ? content.vietnamese ||
                    (typeof content.text === "string" ? content.text : "") ||
                    ""
                  : content.english ||
                    (typeof content.text === "string" ? content.text : "") ||
                    "",
            }}
          />
        );

      case "practice":
        return (
          <div key={index} className="grammar-practice">
            {content.items?.map((item, idx) => (
              <div key={idx} className="practice-item">
                <div
                  className="practice-meaning"
                  dangerouslySetInnerHTML={{
                    __html:
                      language === "vietnamese" && item.vietnameseMeaning
                        ? item.vietnameseMeaning
                        : item.meaning,
                  }}
                />
                <div className="practice-hint">
                  💡{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        language === "vietnamese" && item.vietnameseUsage
                          ? item.vietnameseUsage
                          : item.usage,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const lesson = grammarLessons[selectedUnit];

  return (
    <div className="grammar-container">
      <div className="grammar-sidebar">
        <h2 className="grammar-sidebar-title">📚 Grammar Units</h2>
        <div className="grammar-units-list">
          <button
            className={`grammar-unit-btn ${selectedUnit === "unit1" ? "active" : ""}`}
            onClick={() => setSelectedUnit("unit1")}
          >
            <span className="unit-number">1</span>
            <span className="unit-name">Unit 1</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === "unit2" ? "active" : ""}`}
            onClick={() => setSelectedUnit("unit2")}
          >
            <span className="unit-number">2</span>
            <span className="unit-name">Unit 2</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === "unit3" ? "active" : ""}`}
            onClick={() => setSelectedUnit("unit3")}
          >
            <span className="unit-number">3</span>
            <span className="unit-name">Unit 3</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === "unit4" ? "active" : ""}`}
            onClick={() => setSelectedUnit("unit4")}
          >
            <span className="unit-number">4</span>
            <span className="unit-name">Unit 4</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === "unit5" ? "active" : ""}`}
            onClick={() => setSelectedUnit("unit5")}
          >
            <span className="unit-number">5</span>
            <span className="unit-name">Unit 5</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === "unit6" ? "active" : ""}`}
            onClick={() => setSelectedUnit("unit6")}
          >
            <span className="unit-number">6</span>
            <span className="unit-name">Unit 6</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === "unit7" ? "active" : ""}`}
            onClick={() => setSelectedUnit("unit7")}
          >
            <span className="unit-number">7</span>
            <span className="unit-name">Unit 7</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === "unit8" ? "active" : ""}`}
            onClick={() => setSelectedUnit("unit8")}
          >
            <span className="unit-number">8</span>
            <span className="unit-name">Unit 8</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === "unit9" ? "active" : ""}`}
            onClick={() => setSelectedUnit("unit9")}
          >
            <span className="unit-number">9</span>
            <span className="unit-name">Unit 9</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === "unit10" ? "active" : ""}`}
            onClick={() => setSelectedUnit("unit10")}
          >
            <span className="unit-number">10</span>
            <span className="unit-name">Unit 10</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === "unit11" ? "active" : ""}`}
            onClick={() => setSelectedUnit("unit11")}
          >
            <span className="unit-number">11</span>
            <span className="unit-name">Unit 11</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === "unit12" ? "active" : ""}`}
            onClick={() => setSelectedUnit("unit12")}
          >
            <span className="unit-number">12</span>
            <span className="unit-name">Unit 12</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === "unit13" ? "active" : ""}`}
            onClick={() => setSelectedUnit("unit13")}
          >
            <span className="unit-number">13</span>
            <span className="unit-name">Unit 13</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === "unit14" ? "active" : ""}`}
            onClick={() => setSelectedUnit("unit14")}
          >
            <span className="unit-number">14</span>
            <span className="unit-name">Unit 14</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === "unit15" ? "active" : ""}`}
            onClick={() => setSelectedUnit("unit15")}
          >
            <span className="unit-number">15</span>
            <span className="unit-name">Unit 15</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === "unit16" ? "active" : ""}`}
            onClick={() => setSelectedUnit("unit16")}
          >
            <span className="unit-number">16</span>
            <span className="unit-name">Unit 16</span>
          </button>
        </div>
      </div>
      <div className="grammar-main">
        <div className="grammar-header">
          <div className="header-content">
            <h1 className="grammar-title">{lesson.title}</h1>
            <button
              className="language-toggle"
              onClick={toggleLanguage}
              title={
                language === "vietnamese"
                  ? "Switch to English"
                  : "Switch to Vietnamese"
              }
            >
              {language === "vietnamese" ? "🇻🇳" : "🇬🇧"}
            </button>
          </div>
        </div>
        <div className="grammar-content">
          {lesson.content.map((content, index) =>
            renderContent(content, index),
          )}
        </div>
        <div className="grammar-footer">
          <button
            className="grammar-nav-btn prev"
            onClick={() => onNavigate?.("home")}
          >
            ← Back to Home
          </button>
          <button
            className="grammar-nav-btn next"
            onClick={() => onNavigate?.("vocabulary")}
          >
            Next: Vocabulary →
          </button>
        </div>
      </div>
    </div>
  );
};
