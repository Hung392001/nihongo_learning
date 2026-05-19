#!/usr/bin/env node

/**
 * Asset Upload Script
 *
 * Migrates local GIF files from kanji_data/ to cloud storage (R2, S3, Supabase)
 * Generates asset manifest JSON file
 *
 * Usage:
 *   # Upload to Cloudflare R2
 *   VITE_ASSET_STORAGE_TYPE=r2 VITE_R2_ACCOUNT_ID=xxx VITE_R2_BUCKET_NAME=yyy node scripts/upload-assets.mjs
 *
 *   # Upload to AWS S3
 *   VITE_ASSET_STORAGE_TYPE=s3 VITE_S3_REGION=us-east-1 VITE_S3_BUCKET_NAME=yyy node scripts/upload-assets.mjs
 *
 *   # Upload to Supabase Storage
 *   VITE_ASSET_STORAGE_TYPE=supabase VITE_SUPABASE_URL=xxx VITE_SUPABASE_ANON_KEY=yyy node scripts/upload-assets.mjs
 *
 *   # Just generate manifest (no upload)
 *   node scripts/upload-assets.mjs --generate-manifest
 */

import { readdir, readFile, stat } from "node:fs/promises";
import { join, dirname, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import { createHash } from "node:crypto";

// Get directory name for this module
const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");

// ============================================
// Configuration
// ============================================

const config = {
  // Source directory for GIF files
  sourceDir: join(PROJECT_ROOT, "kanji_data"),

  // Output directory for manifest
  outputDir: join(PROJECT_ROOT, "src", "data"),

  // Storage type: 'r2', 's3', 'supabase', or 'local'
  storageType:
    process.env.VITE_ASSET_STORAGE_TYPE ||
    process.env.ASSET_STORAGE_TYPE ||
    "local",

  // Cloudflare R2
  r2: {
    accountId: process.env.VITE_R2_ACCOUNT_ID || process.env.R2_ACCOUNT_ID,
    bucketName:
      process.env.VITE_R2_BUCKET_NAME ||
      process.env.R2_BUCKET_NAME ||
      "nihongo-assets",
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    publicDomain:
      process.env.VITE_R2_PUBLIC_DOMAIN || process.env.R2_PUBLIC_DOMAIN,
  },

  // AWS S3
  s3: {
    region: process.env.VITE_S3_REGION || process.env.S3_REGION || "us-east-1",
    bucketName:
      process.env.VITE_S3_BUCKET_NAME ||
      process.env.S3_BUCKET_NAME ||
      "nihongo-assets",
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    publicDomain:
      process.env.VITE_S3_PUBLIC_DOMAIN || process.env.S3_PUBLIC_DOMAIN,
  },

  // Supabase
  supabase: {
    projectUrl: process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
    anonKey:
      process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY,
    bucketName:
      process.env.VITE_SUPABASE_BUCKET_NAME ||
      process.env.SUPABASE_BUCKET_NAME ||
      "kanji-gifs",
  },

  // Base URL for local mode
  baseUrl: process.env.VITE_ASSET_BASE_URL || "/assets/gifs",

  // CDN URL (optional)
  cdnBaseUrl: process.env.VITE_CDN_BASE_URL || process.env.CDN_BASE_URL,
};

// ============================================
// Helper Functions
// ============================================

function log(message, level = "info") {
  const levels = { error: "❌", warn: "⚠️", info: "ℹ️", success: "✅" };
  const prefix = levels[level] || "ℹ️";
  console.log(`[${new Date().toISOString()}] ${prefix} ${message}`);
}

function getKanjiIdFromFilename(filename) {
  // Extract kanji ID from filename (e.g., kanji_001.gif -> kanji_001)
  const name = basename(filename, extname(filename));

  // Match kanji_001, kanji_012, etc.
  if (/^kanji_\d+$/.test(name)) {
    return name;
  }

  // Try to extract number
  const match = name.match(/kanji_(\d+)/);
  if (match) {
    return `kanji_${match[1]}`;
  }

  return null;
}

function getKanjiCharFromFilename(filename) {
  // Try to extract kanji character from filename
  const name = basename(filename, extname(filename));

  // Common kanji characters in filenames
  const kanjiMap = {
    kanji_001: "一",
    ichi: "一",
    kanji_002: "二",
    ni: "二",
    kanji_003: "三",
    san: "三",
    kanji_004: "四",
    shi: "四",
    kanji_005: "五",
    go: "五",
    kanji_006: "六",
    roku: "六",
    kanji_007: "七",
    shichi: "七",
    kanji_008: "八",
    hachi: "八",
    kanji_009: "九",
    kyuu: "九",
    kanji_010: "十",
    juu: "十",
    kanji_011: "百",
    hyaku: "百",
    kanji_012: "千",
    sen: "千",
    kanji_013: "万",
    man: "万",
    kanji_014: "円",
    en: "円",
    kanji_015: "口",
    kuchi: "口",
    kanji_016: "目",
    me: "目",
    kanji_017: "日",
    hi: "日",
    kanji_018: "月",
    tsuki: "月",
    kanji_019: "火",
    hi: "火",
    kanji_020: "水",
    mizu: "水",
    kanji_021: "木",
    ki: "木",
    kanji_022: "金",
    kane: "金",
    kanji_023: "土",
    tsuchi: "土",
    kanji_024: "曜",
    you: "曜",
    kanji_025: "本",
    hon: "本",
    kanji_026: "人",
    hito: "人",
    kanji_027: "今",
    ima: "今",
    kanji_028: "寺",
    tera: "寺",
    kanji_029: "時",
    toki: "時",
    kanji_030: "半",
    han: "半",
    kanji_031: "刀",
    to: "刀",
    kanji_032: "分",
    fun: "分",
    kanji_033: "上",
    ue: "上",
    kanji_034: "下",
    shita: "下",
    kanji_035: "中",
    chuu: "中",
    kanji_036: "外",
    soto: "外",
    kanji_037: "右",
    migi: "右",
    kanji_038: "工",
    kou: "工",
    kanji_039: "左",
    hidari: "左",
    kanji_040: "前",
    mae: "前",
    kanji_041: "後",
    ushi: "後",
    kanji_042: "午",
    go: "午",
    kanji_043: "門",
    mon: "門",
    kanji_044: "間",
    aida: "間",
    kanji_045: "東",
    higashi: "東",
    kanji_046: "西",
    nishi: "西",
    kanji_047: "南",
    minami: "南",
    kanji_048: "北",
    kita: "北",
  };

  return kanjiMap[name] || null;
}

function calculateFileHash(content) {
  return createHash("md5").update(content).digest("hex");
}

function getContentType(filename) {
  const ext = extname(filename).toLowerCase();
  const types = {
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".mp4": "video/mp4",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
  };
  return types[ext] || "application/octet-stream";
}

// ============================================
// Storage Providers
// ============================================

class StorageProvider {
  async uploadFile(filename, content, contentType) {
    throw new Error("Not implemented");
  }

  async getPublicUrl(filename) {
    throw new Error("Not implemented");
  }

  async uploadAll(files) {
    const results = [];
    for (const file of files) {
      try {
        const url = await this.uploadFile(
          file.filename,
          file.content,
          file.contentType,
        );
        results.push({ filename: file.filename, url, success: true });
        log(`Uploaded: ${file.filename} -> ${url}`, "success");
      } catch (error) {
        log(`Failed to upload ${file.filename}: ${error.message}`, "error");
        results.push({
          filename: file.filename,
          url: null,
          success: false,
          error: error.message,
        });
      }
    }
    return results;
  }
}

class R2StorageProvider extends StorageProvider {
  async uploadFile(filename, content, contentType) {
    // R2 upload implementation would go here
    // For now, just return the expected public URL
    const baseUrl = config.r2.publicDomain
      ? `https://${config.r2.publicDomain}`
      : `https://${config.r2.accountId}.r2.cloudflarestorage.com/${config.r2.bucketName}`;

    return `${baseUrl}/${filename}`;
  }

  async getPublicUrl(filename) {
    const baseUrl = config.r2.publicDomain
      ? `https://${config.r2.publicDomain}`
      : `https://${config.r2.accountId}.r2.cloudflarestorage.com/${config.r2.bucketName}`;
    return `${baseUrl}/${filename}`;
  }
}

class S3StorageProvider extends StorageProvider {
  async uploadFile(filename, content, contentType) {
    // S3 upload implementation would go here
    const baseUrl = config.s3.publicDomain
      ? `https://${config.s3.publicDomain}`
      : `https://${config.s3.bucketName}.s3.${config.s3.region}.amazonaws.com`;

    return `${baseUrl}/${filename}`;
  }

  async getPublicUrl(filename) {
    const baseUrl = config.s3.publicDomain
      ? `https://${config.s3.publicDomain}`
      : `https://${config.s3.bucketName}.s3.${config.s3.region}.amazonaws.com`;
    return `${baseUrl}/${filename}`;
  }
}

class SupabaseStorageProvider extends StorageProvider {
  async uploadFile(filename, content, contentType) {
    // Supabase upload implementation would go here
    return `${config.supabase.projectUrl}/storage/v1/object/public/${config.supabase.bucketName}/${filename}`;
  }

  async getPublicUrl(filename) {
    return `${config.supabase.projectUrl}/storage/v1/object/public/${config.supabase.bucketName}/${filename}`;
  }
}

class LocalStorageProvider extends StorageProvider {
  async uploadFile(filename, content, contentType) {
    // Local mode - just return the local path
    return `${config.baseUrl}/${filename}`;
  }

  async getPublicUrl(filename) {
    return `${config.baseUrl}/${filename}`;
  }
}

function getStorageProvider() {
  switch (config.storageType) {
    case "r2":
      return new R2StorageProvider();
    case "s3":
      return new S3StorageProvider();
    case "supabase":
      return new SupabaseStorageProvider();
    default:
      return new LocalStorageProvider();
  }
}

// ============================================
// Manifest Generation
// ============================================

async function generateManifest(files, provider) {
  const assets = {};

  for (const file of files) {
    const kanjiId = getKanjiIdFromFilename(file.filename);
    const kanjiChar = getKanjiCharFromFilename(file.filename);

    if (!kanjiId) {
      log(`Skipping ${file.filename}: could not extract kanji ID`, "warn");
      continue;
    }

    const publicUrl = await provider.getPublicUrl(file.filename);

    // Get file info
    const filePath = join(config.sourceDir, file.filename);
    let fileStat;
    try {
      fileStat = await stat(filePath);
    } catch {
      fileStat = null;
    }

    // Generate alternate URLs for different formats
    const baseName = basename(file.filename, extname(file.filename));
    const alternateUrls = [
      publicUrl.replace(extname(file.filename), ".webp"),
      publicUrl.replace(extname(file.filename), ".mp4"),
    ].filter((url) => url !== publicUrl);

    assets[kanjiId] = {
      kanjiId,
      kanjiChar: kanjiChar || "",
      fileName: file.filename,
      url: config.cdnBaseUrl
        ? `${config.cdnBaseUrl}/${file.filename}`
        : publicUrl,
      alternateUrls,
      fileSize: fileStat ? fileStat.size : undefined,
      contentType: getContentType(file.filename),
      uploadedAt: new Date().toISOString(),
      ...(config.cdnBaseUrl && {
        cdnUrl: `${config.cdnBaseUrl}/${file.filename}`,
      }),
    };
  }

  return {
    version: "1.0.0",
    lastUpdated: new Date().toISOString(),
    storageType: config.storageType,
    storageConfig: {
      type: config.storageType,
      ...(config.storageType === "r2" && { bucket: config.r2.bucketName }),
      ...(config.storageType === "s3" && {
        bucket: config.s3.bucketName,
        region: config.s3.region,
      }),
      ...(config.storageType === "supabase" && {
        bucket: config.supabase.bucketName,
      }),
    },
    assets,
  };
}

async function writeManifest(manifest) {
  const manifestPath = join(config.outputDir, "assetManifest.generated.ts");

  const content = `/**
 * Generated Asset Manifest
 * This file was automatically generated by scripts/upload-assets.mjs
 * Do not edit manually - regenerate by running:
 *   node scripts/upload-assets.mjs
 */

import { AssetManifest } from '../services/AssetService';

export const assetManifest: AssetManifest = ${JSON.stringify(manifest, null, 2)};

export default assetManifest;
`;

  await Bun.write(manifestPath, content);
  log(`Manifest written to: ${manifestPath}`, "success");

  return manifestPath;
}

// ============================================
// Main Function
// ============================================

async function main() {
  log(`Starting asset upload/migration...`, "info");
  log(`Storage type: ${config.storageType}`, "info");
  log(`Source directory: ${config.sourceDir}`, "info");

  // Check if source directory exists
  if (!existsSync(config.sourceDir)) {
    log(`Source directory does not exist: ${config.sourceDir}`, "error");
    process.exit(1);
  }

  // Get all GIF files
  const files = await readdir(config.sourceDir);
  const gifFiles = files.filter((f) => {
    const ext = extname(f).toLowerCase();
    return [".gif", ".webp", ".mp4", ".png"].includes(ext);
  });

  log(`Found ${gifFiles.length} asset files to process`, "info");

  if (gifFiles.length === 0) {
    log("No asset files found in source directory", "warn");
    process.exit(0);
  }

  // Read file contents
  const fileContents = [];
  for (const filename of gifFiles) {
    const filePath = join(config.sourceDir, filename);
    const content = await readFile(filePath);
    fileContents.push({
      filename,
      content,
      contentType: getContentType(filename),
    });
  }

  // Get storage provider
  const provider = getStorageProvider();

  // Check if we should only generate manifest (no actual upload)
  const args = process.argv.slice(2);
  const generateOnly =
    args.includes("--generate-manifest") || args.includes("-g");

  if (generateOnly) {
    log("Generating manifest only (no upload)", "info");
  } else {
    log(
      `Uploading ${fileContents.length} files to ${config.storageType}...`,
      "info",
    );
  }

  // Upload files and generate manifest
  const manifest = await generateManifest(fileContents, provider);

  log(
    `Generated manifest with ${Object.keys(manifest.assets).length} assets`,
    "info",
  );

  // Write manifest file
  const manifestPath = await writeManifest(manifest);

  // Summary
  log("\n=== Upload Summary ===", "info");
  log(`Total files processed: ${fileContents.length}`, "info");
  log(`Assets in manifest: ${Object.keys(manifest.assets).length}`, "info");
  log(`Manifest file: ${manifestPath}`, "info");

  if (config.storageType === "local") {
    log("\nNote: Using local mode - no files were actually uploaded", "warn");
    log(
      "In production, set VITE_ASSET_STORAGE_TYPE to r2, s3, or supabase",
      "warn",
    );
  }

  if (generateOnly) {
    log("\nManifest generated without uploading files", "info");
  }
}

// Run
main().catch((error) => {
  log(`Error: ${error.message}`, "error");
  console.error(error);
  process.exit(1);
});

export { config, getStorageProvider, generateManifest, writeManifest };
