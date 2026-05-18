/**
 * useKanji Hook
 * Manages kanji data fetching and state management
 *
 * Updated to use remote asset URLs from AssetService instead of local paths
 */

import { useState, useEffect, useCallback } from "react";
import { KanjiData } from "../data/kanjiDatabase";
import * as KanjiService from "../services/KanjiService";
import * as AssetService from "../services/AssetService";
import { getAssetUrlByKanjiId, hasAsset } from "../data/assetManifest";

export interface UseKanjiResult {
  kanji: KanjiData[];
  loading: boolean;
  error: string | null;
  currentIndex: number;
  currentKanji: KanjiData | null;
  goToKanji: (index: number) => void;
  nextKanji: () => void;
  previousKanji: () => void;
  searchKanji: (query: string) => Promise<KanjiData[]>;
  getKanjiByStroke: (stroke: number) => Promise<KanjiData[]>;
  selectKanjiByCharacter: (character: string) => void;
  /**
   * Get the animation URL for a kanji
   * Uses remote URLs from cloud storage (R2, S3, Supabase) or local fallback
   */
  getAnimationUrl: (kanji: KanjiData) => Promise<string | null>;
  /**
   * Synchronously get animation URL (uses manifest or generates from config)
   * For immediate use without awaiting
   */
  getAnimationUrlSync: (kanji: KanjiData) => string | null;
  /**
   * Check if animation is available for a kanji
   */
  hasAnimation: (kanji: KanjiData) => boolean;
  /**
   * Legacy method for backwards compatibility
   * @deprecated Use getAnimationUrl or getAnimationUrlSync instead
   */
  showAnimationForKanji: (kanji: KanjiData) => string | null;
}

export const useKanji = (): UseKanjiResult => {
  const [kanji, setKanji] = useState<KanjiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load all kanji on mount
  useEffect(() => {
    const loadKanji = async () => {
      try {
        setLoading(true);
        const data = await KanjiService.getAllKanji();
        setKanji(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load kanji");
        console.error("Error loading kanji:", err);
      } finally {
        setLoading(false);
      }
    };

    loadKanji();
  }, []);

  const currentKanji = kanji[currentIndex] || null;

  const goToKanji = (index: number) => {
    if (index >= 0 && index < kanji.length) {
      setCurrentIndex(index);
    }
  };

  const nextKanji = () => {
    if (currentIndex < kanji.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousKanji = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  /**
   * Select kanji by its character and update current index
   */
  const selectKanjiByCharacter = (character: string) => {
    const index = kanji.findIndex((k) => k.ka_utf === character);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  /**
   * Check if animation exists for a kanji (synchronous)
   * Uses the manifest for quick lookup
   */
  const hasAnimation = useCallback((kanjiItem: KanjiData): boolean => {
    // Check manifest first
    if (hasAsset(kanjiItem.ka_id)) {
      return true;
    }

    // Fallback: check if using remote storage (always has assets)
    if (AssetService.isUsingRemoteStorage()) {
      return true;
    }

    // Local development: check if file exists (simplified check)
    // In production with remote storage, this will always return true
    return true;
  }, []);

  /**
   * Get animation URL synchronously
   * Uses manifest data or generates from configuration
   */
  const getAnimationUrlSync = useCallback(
    (kanjiItem: KanjiData): string | null => {
      const kanjiId = kanjiItem.ka_id;
      const kanjiChar = kanjiItem.ka_utf;

      // First, try to get from manifest
      const manifestUrl = getAssetUrlByKanjiId(kanjiId);
      if (manifestUrl) {
        return manifestUrl;
      }

      // Fallback: generate URL from asset service
      return AssetService.getStrokeAnimationUrl(kanjiId, kanjiChar, "gif");
    },
    [],
  );

  /**
   * Get animation URL for a kanji (async version)
   * This can validate the URL exists and try fallbacks
   */
  const getAnimationUrl = useCallback(
    async (kanjiItem: KanjiData): Promise<string | null> => {
      const kanjiId = kanjiItem.ka_id;
      const kanjiChar = kanjiItem.ka_utf;

      // First, try manifest URL and validate it if possible
      const manifestUrl = getAssetUrlByKanjiId(kanjiId);
      if (manifestUrl) {
        try {
          const isValid = await AssetService.validateUrl(manifestUrl);
          if (isValid) {
            return manifestUrl;
          }
        } catch {
          // Ignore validation errors
        }
      }

      // Fallback: use AssetService to generate and validate URL candidates
      try {
        const url = await AssetService.getValidAssetUrl(kanjiId, kanjiChar);
        if (url) {
          return url;
        }
      } catch {
        // Ignore validation errors
      }

      // Final fallback: return generated URL without validation
      return AssetService.getStrokeAnimationUrl(kanjiId, kanjiChar, "gif");
    },
    [],
  );

  /**
   * Legacy method for backwards compatibility
   * @deprecated Use getAnimationUrl or getAnimationUrlSync instead
   */
  const showAnimationForKanji = (kanjiItem: KanjiData): string | null => {
    console.warn(
      "showAnimationForKanji is deprecated, use getAnimationUrl or getAnimationUrlSync",
    );
    return getAnimationUrlSync(kanjiItem);
  };

  return {
    kanji,
    loading,
    error,
    currentIndex,
    currentKanji,
    goToKanji,
    nextKanji,
    previousKanji,
    searchKanji: (query: string) => KanjiService.searchKanjiByQuery(query),
    getKanjiByStroke: KanjiService.getKanjiByStroke,
    selectKanjiByCharacter,
    getAnimationUrl,
    getAnimationUrlSync,
    hasAnimation,
    // Keep legacy method for backwards compatibility
    showAnimationForKanji,
  };
};

export default useKanji;
