/**
 * Asset Service
 * Manages external cloud storage for GIF assets (Cloudflare R2, AWS S3, or Supabase Storage)
 *
 * This service provides a unified interface for:
 * - Generating asset URLs for remote storage
 * - Managing asset metadata
 * - Handling fallback URLs
 * - Supporting multiple storage providers
 */

// ============================================
// Configuration Types
// ============================================

/**
 * Configuration for Cloudflare R2 storage
 */
export interface R2Config {
  type: "r2";
  accountId: string;
  bucketName: string;
  publicDomain?: string; // Custom domain for public access
  accessKeyId?: string; // For server-side operations
  secretAccessKey?: string; // For server-side operations
}

/**
 * Configuration for AWS S3 storage
 */
export interface S3Config {
  type: "s3";
  region: string;
  bucketName: string;
  publicDomain?: string; // Custom CloudFront domain
  accessKeyId?: string;
  secretAccessKey?: string;
}

/**
 * Configuration for Supabase Storage
 */
export interface SupabaseConfig {
  type: "supabase";
  projectUrl: string;
  anonKey: string;
  bucketName: string;
}

/**
 * Configuration for local development fallback
 */
export interface LocalDevConfig {
  type: "local";
  basePath: string; // Local path prefix (e.g., '/assets/gifs')
}

/**
 * Unified storage configuration
 */
export type StorageConfig =
  | R2Config
  | S3Config
  | SupabaseConfig
  | LocalDevConfig;

/**
 * Asset metadata for a single GIF
 */
export interface AssetMetadata {
  kanjiId: string;
  kanjiChar: string;
  fileName: string;
  url: string;
  alternateUrls?: string[]; // Fallback URLs (WebP, MP4, etc.)
  fileSize?: number;
  contentType: string;
  uploadedAt?: string;
  cdnUrl?: string; // CDN URL if different from storage URL
}

/**
 * Complete asset manifest mapping kanji to their GIF URLs
 */
export interface AssetManifest {
  version: string;
  lastUpdated: string;
  assets: Record<string, AssetMetadata>; // Keyed by kanjiId
}

// ============================================
// Environment Configuration
// ============================================

/**
 * Get storage configuration from environment variables
 * Priority: R2 > S3 > Supabase > Local
 */
export function getStorageConfig(): StorageConfig {
  // Use import.meta.env for Vite environment variables
  const env = (import.meta as any).env || {};

  const storageType = (env.VITE_ASSET_STORAGE_TYPE as string) || "r2";

  switch (storageType) {
    case "r2":
      return {
        type: "r2",
        accountId: env.VITE_R2_ACCOUNT_ID || "",
        bucketName: env.VITE_R2_BUCKET_NAME || "kanji",
        publicDomain:
          env.VITE_R2_PUBLIC_DOMAIN ||
          "pub-5b960731e8a84853bb330dec843a0f02.r2.dev",
      };
    case "s3":
      return {
        type: "s3",
        region: env.VITE_S3_REGION || "us-east-1",
        bucketName: env.VITE_S3_BUCKET_NAME || "nihongo-assets",
        publicDomain: env.VITE_S3_PUBLIC_DOMAIN,
      };
    case "supabase":
      return {
        type: "supabase",
        projectUrl: env.VITE_SUPABASE_URL || "",
        anonKey: env.VITE_SUPABASE_ANON_KEY || "",
        bucketName: env.VITE_SUPABASE_BUCKET_NAME || "kanji-gifs",
      };
    default:
      // Use your R2 bucket by default for production
      return {
        type: "r2",
        accountId: "",
        bucketName: "kanji",
        publicDomain: "pub-5b960731e8a84853bb330dec843a0f02.r2.dev",
      };
  }
}

// ============================================
// Asset URL Generation
// ============================================

function buildAssetUrlVariants(baseUrl: string, fileName: string): string[] {
  const normalized = baseUrl.replace(/\/$/, "");
  const variants = new Set<string>([`${normalized}/${fileName}`]);

  if (normalized.endsWith("/kanji")) {
    variants.add(`${normalized.replace(/\/kanji$/, "")}/${fileName}`);
  } else {
    variants.add(`${normalized}/kanji/${fileName}`);
  }

  return Array.from(variants);
}

export function generateAssetUrls(
  kanjiId: string,
  fileExtension: string = "gif",
): string[] {
  const env = (import.meta as any).env || {};
  const assetBaseUrl = env.VITE_ASSET_BASE_URL?.replace(/\/$/, "");
  const fileName = `${kanjiId}.${fileExtension}`;
  const urls: string[] = [];

  if (assetBaseUrl) {
    urls.push(...buildAssetUrlVariants(assetBaseUrl, fileName));
  }

  const config = getStorageConfig();

  switch (config.type) {
    case "r2": {
      if (config.publicDomain) {
        urls.push(
          ...buildAssetUrlVariants(`https://${config.publicDomain}`, fileName),
        );
      }

      if (config.accountId && config.bucketName) {
        urls.push(
          `https://${config.accountId}.r2.cloudflarestorage.com/${config.bucketName}/${fileName}`,
        );
        urls.push(
          `https://${config.accountId}.r2.cloudflarestorage.com/${config.bucketName}/kanji/${fileName}`,
        );
        urls.push(
          `https://${config.bucketName}.${config.accountId}.r2.cloudflarestorage.com/${fileName}`,
        );
        urls.push(
          `https://${config.bucketName}.${config.accountId}.r2.cloudflarestorage.com/kanji/${fileName}`,
        );
      }
      break;
    }

    case "s3": {
      if (config.publicDomain) {
        urls.push(
          ...buildAssetUrlVariants(`https://${config.publicDomain}`, fileName),
        );
      }
      urls.push(
        `https://${config.bucketName}.s3.${config.region}.amazonaws.com/${fileName}`,
      );
      urls.push(
        `https://${config.bucketName}.s3.${config.region}.amazonaws.com/kanji/${fileName}`,
      );
      break;
    }

    case "supabase": {
      urls.push(
        `${config.projectUrl}/storage/v1/object/public/${config.bucketName}/${fileName}`,
      );
      urls.push(
        `${config.projectUrl}/storage/v1/object/public/${config.bucketName}/kanji/${fileName}`,
      );
      break;
    }

    default: {
      urls.push(...buildAssetUrlVariants(config.basePath, fileName));
      break;
    }
  }

  return Array.from(new Set(urls));
}

export function generateAssetUrl(
  kanjiId: string,
  fileExtension: string = "gif",
): string {
  return generateAssetUrls(kanjiId, fileExtension)[0];
}

export function getStrokeAnimationUrls(
  kanjiId: string,
  kanjiChar: string,
): string[] {
  const urls = [
    ...generateAssetUrls(kanjiId, "gif"),
    ...generateAssetUrls(kanjiId, "webp"),
    ...generateAssetUrls(kanjiId, "mp4"),
    ...generateAssetUrls(encodeURIComponent(kanjiChar), "gif"),
    ...generateAssetUrls(encodeURIComponent(kanjiChar), "webp"),
    ...generateAssetUrls(encodeURIComponent(kanjiChar), "mp4"),
  ];

  return Array.from(new Set(urls));
}

export function getStrokeAnimationUrl(
  kanjiId: string,
  _kanjiChar: string,
  preferredFormat: "gif" | "webp" | "mp4" = "gif",
): string {
  return generateAssetUrls(kanjiId, preferredFormat)[0];
}

/**
 * Get optimized URL based on browser support
 * Prefers WebP/MP4 for modern browsers, falls back to GIF
 */
export function getOptimizedAssetUrl(
  kanjiId: string,
  kanjiChar: string,
): string {
  // For now, use GIF as default
  // In production, you could detect WebP/MP4 support and use those
  return getStrokeAnimationUrl(kanjiId, kanjiChar, "gif");
}

// ============================================
// Asset Metadata Management
// ============================================

/**
 * Default manifest for development
 * In production, this would be fetched from a remote endpoint
 */
const DEV_MANIFEST: AssetManifest = {
  version: "1.0.0",
  lastUpdated: new Date().toISOString(),
  assets: {},
};

/**
 * Load asset manifest
 * In production: fetches from CDN or API
 * In development: uses local manifest or generates dynamically
 */
export async function loadAssetManifest(): Promise<AssetManifest> {
  // Check if we have a remote manifest URL
  const env = (import.meta as any).env || {};
  const manifestUrl = env.VITE_ASSET_MANIFEST_URL;

  if (manifestUrl) {
    try {
      const response = await fetch(manifestUrl, {
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn(
        "Failed to load remote asset manifest, using fallback:",
        error,
      );
    }
  }

  // Return development manifest
  return DEV_MANIFEST;
}

/**
 * Get asset metadata for a specific kanji
 */
export async function getAssetMetadata(
  kanjiId: string,
): Promise<AssetMetadata | null> {
  const manifest = await loadAssetManifest();
  return manifest.assets[kanjiId] || null;
}

/**
 * Get URL for a specific kanji's animation
 */
export async function getAssetUrl(
  kanjiId: string,
  kanjiChar: string,
): Promise<string> {
  // First, try to get from manifest
  const metadata = await getAssetMetadata(kanjiId);
  if (metadata?.url) {
    return metadata.url;
  }

  // Fallback to generated URL
  return getOptimizedAssetUrl(kanjiId, kanjiChar);
}

// ============================================
// URL Validation & Fallback
// ============================================

/**
 * Validate if a URL is accessible
 */
export async function validateUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      cache: "no-store",
    });

    if (response.ok && response.status < 400) {
      return true;
    }
  } catch {
    // Ignore fetch errors and fall back to image validation below.
  }

  if (typeof window !== "undefined") {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  return false;
}

/**
 * Get all possible URLs for a kanji and return the first valid one
 */
export async function getValidAssetUrl(
  kanjiId: string,
  kanjiChar: string,
): Promise<string | null> {
  const candidates = getStrokeAnimationUrls(kanjiId, kanjiChar);

  for (const url of candidates) {
    if (await validateUrl(url)) {
      return url;
    }
  }

  return null;
}

// ============================================
// Asset Preloading & Caching
// ============================================

/**
 * Preload critical assets
 */
export function preloadAsset(url: string): void {
  if (typeof window !== "undefined") {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);
  }
}

/**
 * Prefetch assets for better performance
 */
export function prefetchAsset(url: string): void {
  if (typeof window !== "undefined") {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);
  }
}

// ============================================
// Utility Functions
// ============================================

/**
 * Extract kanji ID from file path
 */
export function extractKanjiIdFromPath(path: string): string | null {
  const match = path.match(/kanji_(\d+)/);
  if (match) {
    return `kanji_${match[1]}`;
  }

  // Try matching just the filename
  const filename = path.split("/").pop() || "";
  const filenameMatch = filename.match(/^kanji_(\d+)\./);
  if (filenameMatch) {
    return `kanji_${filenameMatch[1]}`;
  }

  return null;
}

/**
 * Get CDN URL if configured, otherwise use storage URL
 */
export function getCdnUrl(url: string): string {
  const env = (import.meta as any).env || {};
  const cdnBase = env.VITE_CDN_BASE_URL;
  if (!cdnBase) {
    return url;
  }

  // Extract the path from the URL
  try {
    const urlObj = new URL(url);
    return `${cdnBase}${urlObj.pathname}`;
  } catch {
    return url;
  }
}

/**
 * Check if assets are hosted remotely
 */
export function isUsingRemoteStorage(): boolean {
  const config = getStorageConfig();
  return config.type !== "local";
}

// ============================================
// Default Export
// ============================================

export default {
  getStorageConfig,
  generateAssetUrl,
  getStrokeAnimationUrl,
  getOptimizedAssetUrl,
  loadAssetManifest,
  getAssetMetadata,
  getAssetUrl,
  validateUrl,
  getValidAssetUrl,
  preloadAsset,
  prefetchAsset,
  extractKanjiIdFromPath,
  getCdnUrl,
  isUsingRemoteStorage,
};
