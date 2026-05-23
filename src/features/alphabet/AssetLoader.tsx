/**
 * AssetLoader Component
 *
 * Smart image loader for remote GIF assets with:
 * - Loading states
 * - Error fallbacks
 * - Format fallback (GIF -> WebP -> MP4)
 * - Lazy loading
 * - Caching
 * - Performance optimization
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import * as AssetService from "./AssetService";

interface AssetLoaderProps {
  /**
   * Primary URL for the asset
   */
  src: string;
  /**
   * Alternate URLs to try if primary fails
   */
  fallbackUrls?: string[];
  /**
   * Alt text for accessibility
   */
  alt: string;
  /**
   * CSS class for the container
   */
  className?: string;
  /**
   * CSS style for the container
   */
  style?: React.CSSProperties;
  /**
   * Callback when image loads successfully
   */
  onLoad?: () => void;
  /**
   * Callback when image fails to load
   */
  onError?: (error: Error) => void;
  /**
   * Enable lazy loading (default: true)
   */
  lazyLoad?: boolean;
  /**
   * Show loading spinner (default: true)
   */
  showLoading?: boolean;
  /**
   * Show error state (default: true)
   */
  showError?: boolean;
  /**
   * Fallback content to show when image fails
   */
  fallbackContent?: React.ReactNode;
  /**
   * Preload the image (default: false)
   */
  preload?: boolean;
}

interface AssetLoaderState {
  status: "idle" | "loading" | "loaded" | "error";
  currentUrl: string | null;
  triedUrls: Set<string>;
  error: Error | null;
}

export const AssetLoader: React.FC<AssetLoaderProps> = ({
  src,
  fallbackUrls = [],
  alt,
  className = "",
  style = {},
  onLoad,
  onError,
  lazyLoad = true,
  showLoading = true,
  showError = true,
  fallbackContent,
  preload = false,
}) => {
  const [state, setState] = useState<AssetLoaderState>({
    status: "idle",
    currentUrl: null,
    triedUrls: new Set(),
    error: null,
  });

  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Try all available URLs in order
  const allUrls = [src, ...fallbackUrls].filter(Boolean);

  // Load the image
  const loadImage = useCallback(
    (url: string) => {
      setState((prev) => ({
        ...prev,
        status: "loading",
        currentUrl: url,
      }));

      const img = new Image();

      img.onload = () => {
        setState((prev) => ({
          ...prev,
          status: "loaded",
          triedUrls: new Set(prev.triedUrls).add(url),
        }));
        onLoad?.();
      };

      img.onerror = () => {
        setState((prev) => {
          const newTriedUrls = new Set(prev.triedUrls).add(url);
          const error = new Error(`Failed to load image: ${url}`);

          // Try next URL if available
          const nextUrl = allUrls.find((u) => !newTriedUrls.has(u));
          if (nextUrl) {
            // Auto-retry next URL
            setTimeout(() => loadImage(nextUrl), 100);
            return {
              ...prev,
              triedUrls: newTriedUrls,
              error,
            };
          }

          // No more URLs to try
          onError?.(error);
          return {
            ...prev,
            status: "error",
            triedUrls: newTriedUrls,
            error,
          };
        });
      };

      img.src = url;
    },
    [src, fallbackUrls, onLoad, onError],
  );

  // Preload if requested
  useEffect(() => {
    if (preload && state.status === "idle") {
      loadImage(allUrls[0]);
    }
  }, [preload, state.status, loadImage]);

  // Lazy loading with Intersection Observer
  useEffect(() => {
    const img = imgRef.current;
    if (!img || !lazyLoad || state.status !== "idle") return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && state.status === "idle") {
            loadImage(allUrls[0]);
            observerRef.current?.unobserve(img);
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.01,
      },
    );

    observerRef.current.observe(img);

    return () => {
      observerRef.current?.unobserve(img);
      observerRef.current?.disconnect();
    };
  }, [lazyLoad, state.status, loadImage]);

  // If not lazy loading, load immediately
  useEffect(() => {
    if (!lazyLoad && state.status === "idle") {
      loadImage(allUrls[0]);
    }
  }, [lazyLoad, state.status, loadImage]);

  // Render based on state
  if (state.status === "loaded" && state.currentUrl) {
    return (
      <img
        ref={imgRef}
        src={state.currentUrl}
        alt={alt}
        className={className}
        style={style}
        loading={lazyLoad ? "lazy" : "eager"}
        // Use modern image features
        fetchPriority={lazyLoad ? "low" : "high"}
        decoding="async"
      />
    );
  }

  if (state.status === "error" && showError) {
    return (
      <div className={`asset-error ${className}`} style={style}>
        {fallbackContent || (
          <div className="asset-error-content">
            <span className="error-icon">⚠️</span>
            <span className="error-message">Animation not available</span>
          </div>
        )}
      </div>
    );
  }

  if (state.status === "loading" && showLoading) {
    return (
      <div className={`asset-loading ${className}`} style={style}>
        <div className="asset-spinner">
          <div className="spinner-ring" />
        </div>
      </div>
    );
  }

  // Idle state - placeholder
  return (
    <div
      ref={imgRef as any}
      className={`asset-placeholder ${className}`}
      style={style}
    />
  );
};

// Convenience component for kanji stroke animations
export interface KanjiStrokeAnimationProps {
  kanjiId: string;
  kanjiChar: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  lazyLoad?: boolean;
  showLoading?: boolean;
  showError?: boolean;
  fallbackContent?: React.ReactNode;
}

export const KanjiStrokeAnimation: React.FC<KanjiStrokeAnimationProps> = ({
  kanjiId,
  kanjiChar,
  alt = `Stroke order animation for ${kanjiChar}`,
  className = "",
  style = {},
  onLoad,
  onError,
  lazyLoad = true,
  showLoading = true,
  showError = true,
  fallbackContent,
}) => {
  // Use AssetService to generate image URLs (GIF + WebP only)
  const allUrls = [
    AssetService.generateAssetUrl(kanjiId, "gif"),
    AssetService.generateAssetUrl(kanjiId, "webp"),
    AssetService.generateAssetUrl(encodeURIComponent(kanjiChar), "gif"),
  ].filter(Boolean);

  return (
    <AssetLoader
      src={allUrls[0]}
      fallbackUrls={allUrls.slice(1)}
      alt={alt}
      className={`kanji-stroke-animation ${className}`}
      style={style}
      onLoad={onLoad}
      onError={onError}
      lazyLoad={lazyLoad}
      showLoading={showLoading}
      showError={showError}
      fallbackContent={
        fallbackContent || (
          <div className="kanji-fallback">
            <span className="kanji-char">{kanjiChar}</span>
            <span className="hint">Animation not available</span>
          </div>
        )
      }
    />
  );
};

export default AssetLoader;
