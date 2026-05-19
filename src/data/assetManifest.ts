/**
 * Asset Manifest
 * Maps kanji IDs to their remote GIF URLs
 *
 * This file serves as the source of truth for asset URLs in development.
 * In production, asset URLs should be loaded from a remote manifest file
 * or API endpoint that can be updated without redeploying the frontend.
 *
 * Structure:
 * - version: Manifest version for cache busting
 * - lastUpdated: ISO timestamp of last update
 * - baseUrl: Base URL for all assets (can be overridden per-asset)
 * - assets: Mapping of kanjiId to asset metadata
 */

import Kanji from "../components/Kanji";
import { AssetManifest, AssetMetadata } from "../services/AssetService";

// Default base URLs for different environments
const getDefaultBaseUrl = (): string => {
  // In production, this should be set via environment variable
  const envBaseUrl = (import.meta as any).env?.VITE_ASSET_BASE_URL;
  if (envBaseUrl) {
    return envBaseUrl;
  }

  // Production: Use your Cloudflare R2 bucket
  // Note: In devcontainer, we'll serve these from a local server
  return "https://pub-5b960731e8a84853bb330dec843a0f02.r2.dev/kanji";
};

/**
 * Generate asset metadata for a kanji
 * This creates the structure that would be stored in a remote manifest
 */
export function createAssetMetadata(
  kanjiId: string,
  kanjiChar: string,
  baseUrl: string = getDefaultBaseUrl(),
): AssetMetadata {
  return {
    kanjiId,
    kanjiChar,
    fileName: `${kanjiId}.gif`,
    url: `${baseUrl}/${kanjiId}.gif`,
    alternateUrls: [`${baseUrl}/${kanjiId}.webp`, `${baseUrl}/${kanjiId}.mp4`],
    contentType: "image/gif",
  };
}

/**
 * Default manifest for development
 * Contains mappings for all kanji in the database
 *
 * NOTE: In production, this should be replaced with a manifest
 * fetched from your CDN or asset management service.
 */
export const assetManifest: AssetManifest = {
  version: "1.0.0",
  lastUpdated: new Date().toISOString(),
  assets: {
    // Numbers 1-10
    kanji_001: {
      kanjiId: "kanji_001",
      kanjiChar: "一",
      fileName: "kanji_001.gif",
      url: `${getDefaultBaseUrl()}/kanji_001.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_001.webp`,
        `${getDefaultBaseUrl()}/kanji_001.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_002: {
      kanjiId: "kanji_002",
      kanjiChar: "二",
      fileName: "kanji_002.gif",
      url: `${getDefaultBaseUrl()}/kanji_002.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_002.webp`,
        `${getDefaultBaseUrl()}/kanji_002.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_003: {
      kanjiId: "kanji_003",
      kanjiChar: "三",
      fileName: "kanji_003.gif",
      url: `${getDefaultBaseUrl()}/kanji_003.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_003.webp`,
        `${getDefaultBaseUrl()}/kanji_003.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_004: {
      kanjiId: "kanji_004",
      kanjiChar: "四",
      fileName: "kanji_004.gif",
      url: `${getDefaultBaseUrl()}/kanji_004.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_004.webp`,
        `${getDefaultBaseUrl()}/kanji_004.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_005: {
      kanjiId: "kanji_005",
      kanjiChar: "五",
      fileName: "kanji_005.gif",
      url: `${getDefaultBaseUrl()}/kanji_005.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_005.webp`,
        `${getDefaultBaseUrl()}/kanji_005.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_006: {
      kanjiId: "kanji_006",
      kanjiChar: "六",
      fileName: "kanji_006.gif",
      url: `${getDefaultBaseUrl()}/kanji_006.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_006.webp`,
        `${getDefaultBaseUrl()}/kanji_006.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_007: {
      kanjiId: "kanji_007",
      kanjiChar: "七",
      fileName: "kanji_007.gif",
      url: `${getDefaultBaseUrl()}/kanji_007.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_007.webp`,
        `${getDefaultBaseUrl()}/kanji_007.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_008: {
      kanjiId: "kanji_008",
      kanjiChar: "八",
      fileName: "kanji_008.gif",
      url: `${getDefaultBaseUrl()}/kanji_008.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_008.webp`,
        `${getDefaultBaseUrl()}/kanji_008.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_009: {
      kanjiId: "kanji_009",
      kanjiChar: "九",
      fileName: "kanji_009.gif",
      url: `${getDefaultBaseUrl()}/kanji_009.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_009.webp`,
        `${getDefaultBaseUrl()}/kanji_009.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_010: {
      kanjiId: "kanji_010",
      kanjiChar: "十",
      fileName: "kanji_010.gif",
      url: `${getDefaultBaseUrl()}/kanji_010.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_010.webp`,
        `${getDefaultBaseUrl()}/kanji_010.mp4`,
      ],
      contentType: "image/gif",
    },
    // Additional kanji from the database
    kanji_011: {
      kanjiId: "kanji_011",
      kanjiChar: "百",
      fileName: "kanji_011.gif",
      url: `${getDefaultBaseUrl()}/kanji_011.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_011.webp`,
        `${getDefaultBaseUrl()}/kanji_011.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_012: {
      kanjiId: "kanji_012",
      kanjiChar: "千",
      fileName: "kanji_012.gif",
      url: `${getDefaultBaseUrl()}/kanji_012.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_012.webp`,
        `${getDefaultBaseUrl()}/kanji_012.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_013: {
      kanjiId: "kanji_013",
      kanjiChar: "万",
      fileName: "kanji_013.gif",
      url: `${getDefaultBaseUrl()}/kanji_013.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_013.webp`,
        `${getDefaultBaseUrl()}/kanji_013.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_014: {
      kanjiId: "kanji_014",
      kanjiChar: "円",
      fileName: "kanji_014.gif",
      url: `${getDefaultBaseUrl()}/kanji_014.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_014.webp`,
        `${getDefaultBaseUrl()}/kanji_014.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_015: {
      kanjiId: "kanji_015",
      kanjiChar: "口",
      fileName: "kanji_015.gif",
      url: `${getDefaultBaseUrl()}/kanji_015.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_015.webp`,
        `${getDefaultBaseUrl()}/kanji_015.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_016: {
      kanjiId: "kanji_016",
      kanjiChar: "目",
      fileName: "kanji_016.gif",
      url: `${getDefaultBaseUrl()}/kanji_016.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_016.webp`,
        `${getDefaultBaseUrl()}/kanji_016.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_017: {
      kanjiId: "kanji_017",
      kanjiChar: "日",
      fileName: "kanji_017.gif",
      url: `${getDefaultBaseUrl()}/kanji_017.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_017.webp`,
        `${getDefaultBaseUrl()}/kanji_017.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_018: {
      kanjiId: "kanji_018",
      kanjiChar: "月",
      fileName: "kanji_018.gif",
      url: `${getDefaultBaseUrl()}/kanji_018.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_018.webp`,
        `${getDefaultBaseUrl()}/kanji_018.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_019: {
      kanjiId: "kanji_019",
      kanjiChar: "火",
      fileName: "kanji_019.gif",
      url: `${getDefaultBaseUrl()}/kanji_019.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_019.webp`,
        `${getDefaultBaseUrl()}/kanji_019.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_020: {
      kanjiId: "kanji_020",
      kanjiChar: "水",
      fileName: "kanji_020.gif",
      url: `${getDefaultBaseUrl()}/kanji_020.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_020.webp`,
        `${getDefaultBaseUrl()}/kanji_020.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_021: {
      kanjiId: "kanji_021",
      kanjiChar: "木",
      fileName: "kanji_021.gif",
      url: `${getDefaultBaseUrl()}/kanji_021.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_021.webp`,
        `${getDefaultBaseUrl()}/kanji_021.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_022: {
      kanjiId: "kanji_022",
      kanjiChar: "金",
      fileName: "kanji_022.gif",
      url: `${getDefaultBaseUrl()}/kanji_022.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_022.webp`,
        `${getDefaultBaseUrl()}/kanji_022.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_023: {
      kanjiId: "kanji_023",
      kanjiChar: "土",
      fileName: "kanji_023.gif",
      url: `${getDefaultBaseUrl()}/kanji_023.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_023.webp`,
        `${getDefaultBaseUrl()}/kanji_023.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_024: {
      kanjiId: "kanji_024",
      kanjiChar: "曜",
      fileName: "kanji_024.gif",
      url: `${getDefaultBaseUrl()}/kanji_024.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_024.webp`,
        `${getDefaultBaseUrl()}/kanji_024.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_025: {
      kanjiId: "kanji_025",
      kanjiChar: "本",
      fileName: "kanji_025.gif",
      url: `${getDefaultBaseUrl()}/kanji_025.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_025.webp`,
        `${getDefaultBaseUrl()}/kanji_025.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_026: {
      kanjiId: "kanji_026",
      kanjiChar: "人",
      fileName: "kanji_026.gif",
      url: `${getDefaultBaseUrl()}/kanji_026.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_026.webp`,
        `${getDefaultBaseUrl()}/kanji_026.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_027: {
      kanjiId: "kanji_027",
      kanjiChar: "今",
      fileName: "kanji_027.gif",
      url: `${getDefaultBaseUrl()}/kanji_027.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_027.webp`,
        `${getDefaultBaseUrl()}/kanji_027.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_028: {
      kanjiId: "kanji_028",
      kanjiChar: "寺",
      fileName: "kanji_028.gif",
      url: `${getDefaultBaseUrl()}/kanji_028.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_028.webp`,
        `${getDefaultBaseUrl()}/kanji_028.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_029: {
      kanjiId: "kanji_029",
      kanjiChar: "時",
      fileName: "kanji_029.gif",
      url: `${getDefaultBaseUrl()}/kanji_029.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_029.webp`,
        `${getDefaultBaseUrl()}/kanji_029.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_030: {
      kanjiId: "kanji_030",
      kanjiChar: "半",
      fileName: "kanji_030.gif",
      url: `${getDefaultBaseUrl()}/kanji_030.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_030.webp`,
        `${getDefaultBaseUrl()}/kanji_030.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_031: {
      kanjiId: "kanji_031",
      kanjiChar: "刀",
      fileName: "kanji_031.gif",
      url: `${getDefaultBaseUrl()}/kanji_031.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_031.webp`,
        `${getDefaultBaseUrl()}/kanji_031.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_032: {
      kanjiId: "kanji_032",
      kanjiChar: "分",
      fileName: "kanji_032.gif",
      url: `${getDefaultBaseUrl()}/kanji_032.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_032.webp`,
        `${getDefaultBaseUrl()}/kanji_032.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_033: {
      kanjiId: "kanji_033",
      kanjiChar: "上",
      fileName: "kanji_033.gif",
      url: `${getDefaultBaseUrl()}/kanji_033.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_033.webp`,
        `${getDefaultBaseUrl()}/kanji_033.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_034: {
      kanjiId: "kanji_034",
      kanjiChar: "下",
      fileName: "kanji_034.gif",
      url: `${getDefaultBaseUrl()}/kanji_034.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_034.webp`,
        `${getDefaultBaseUrl()}/kanji_034.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_035: {
      kanjiId: "kanji_035",
      kanjiChar: "中",
      fileName: "kanji_035.gif",
      url: `${getDefaultBaseUrl()}/kanji_035.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_035.webp`,
        `${getDefaultBaseUrl()}/kanji_035.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_036: {
      kanjiId: "kanji_036",
      kanjiChar: "外",
      fileName: "kanji_036.gif",
      url: `${getDefaultBaseUrl()}/kanji_036.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_036.webp`,
        `${getDefaultBaseUrl()}/kanji_036.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_037: {
      kanjiId: "kanji_037",
      kanjiChar: "右",
      fileName: "kanji_037.gif",
      url: `${getDefaultBaseUrl()}/kanji_037.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_037.webp`,
        `${getDefaultBaseUrl()}/kanji_037.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_038: {
      kanjiId: "kanji_038",
      kanjiChar: "工",
      fileName: "kanji_038.gif",
      url: `${getDefaultBaseUrl()}/kanji_038.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_038.webp`,
        `${getDefaultBaseUrl()}/kanji_038.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_039: {
      kanjiId: "kanji_039",
      kanjiChar: "左",
      fileName: "kanji_039.gif",
      url: `${getDefaultBaseUrl()}/kanji_039.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_039.webp`,
        `${getDefaultBaseUrl()}/kanji_039.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_040: {
      kanjiId: "kanji_040",
      kanjiChar: "右",
      fileName: "kanji_040.gif",
      url: `${getDefaultBaseUrl()}/kanji_040.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_040.webp`,
        `${getDefaultBaseUrl()}/kanji_040.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_041: {
      kanjiId: "kanji_041",
      kanjiChar: "後",
      fileName: "kanji_041.gif",
      url: `${getDefaultBaseUrl()}/kanji_041.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_041.webp`,
        `${getDefaultBaseUrl()}/kanji_041.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_042: {
      kanjiId: "kanji_042",
      kanjiChar: "午",
      fileName: "kanji_042.gif",
      url: `${getDefaultBaseUrl()}/kanji_042.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_042.webp`,
        `${getDefaultBaseUrl()}/kanji_042.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_043: {
      kanjiId: "kanji_043",
      kanjiChar: "門",
      fileName: "kanji_043.gif",
      url: `${getDefaultBaseUrl()}/kanji_043.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_043.webp`,
        `${getDefaultBaseUrl()}/kanji_043.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_044: {
      kanjiId: "kanji_044",
      kanjiChar: "問",
      fileName: "kanji_044.gif",
      url: `${getDefaultBaseUrl()}/kanji_044.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_044.webp`,
        `${getDefaultBaseUrl()}/kanji_044.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_045: {
      kanjiId: "kanji_045",
      kanjiChar: "東",
      fileName: "kanji_045.gif",
      url: `${getDefaultBaseUrl()}/kanji_045.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_045.webp`,
        `${getDefaultBaseUrl()}/kanji_045.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_046: {
      kanjiId: "kanji_046",
      kanjiChar: "西",
      fileName: "kanji_046.gif",
      url: `${getDefaultBaseUrl()}/kanji_046.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_046.webp`,
        `${getDefaultBaseUrl()}/kanji_046.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_047: {
      kanjiId: "kanji_047",
      kanjiChar: "南",
      fileName: "kanji_047.gif",
      url: `${getDefaultBaseUrl()}/kanji_047.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_047.webp`,
        `${getDefaultBaseUrl()}/kanji_047.mp4`,
      ],
      contentType: "image/gif",
    },
    kanji_048: {
      kanjiId: "kanji_048",
      kanjiChar: "北",
      fileName: "kanji_048.gif",
      url: `${getDefaultBaseUrl()}/kanji_048.gif`,
      alternateUrls: [
        `${getDefaultBaseUrl()}/kanji_048.webp`,
        `${getDefaultBaseUrl()}/kanji_048.mp4`,
      ],
      contentType: "image/gif",
    },
  },
};

/**
 * Get asset metadata for a kanji
 */
export function getAssetByKanjiId(kanjiId: string): AssetMetadata | null {
  return assetManifest.assets[kanjiId] || null;
}

/**
 * Get URL for a kanji's animation
 */
export function getAssetUrlByKanjiId(kanjiId: string): string | null {
  const asset = getAssetByKanjiId(kanjiId);
  return asset?.url || null;
}

/**
 * Check if an asset exists in the manifest
 */
export function hasAsset(kanjiId: string): boolean {
  return kanjiId in assetManifest.assets;
}

export default assetManifest;
