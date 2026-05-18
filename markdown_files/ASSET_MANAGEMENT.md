# Asset Management Guide

## Overview

This document describes the new asset management architecture for Nihongo Learning. GIF animations for kanji stroke order are now managed externally using cloud storage services (Cloudflare R2, AWS S3, or Supabase Storage) instead of being bundled with the source code.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend App                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │
│  │  Kanji      │  │  Asset      │  │  AssetLoader     │   │
│  │  Component  │──▶│  Service    │──▶│  Component      │   │
│  └─────────────┘  └─────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Cloud Storage                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │
│  │ Cloudflare  │  │  AWS S3     │  │ Supabase        │   │
│  │ R2          │  │             │  │ Storage         │   │
│  └─────────────┘  └─────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         CDN                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  https://cdn.yourdomain.com/kanji/kanji_001.gif        │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Benefits

1. **Smaller Repository**: No GIF files in source control (saves ~10MB+)
2. **Faster Git Operations**: Cloning, pulling, and merging is much faster
3. **Smaller Docker Images**: Build context doesn't include heavy GIF files
4. **Independent Asset Updates**: Update animations without redeploying frontend
5. **Scalability**: Can handle thousands of GIFs efficiently
6. **Better Performance**: CDN caching improves load times globally
7. **Cost Effective**: Cloud storage is cheaper than serving from app server

## Setup

### Environment Variables

Create a `.env` file in your project root and configure your storage provider:

```env
# Storage Type: 'r2', 's3', 'supabase', or 'local'
VITE_ASSET_STORAGE_TYPE=r2

# Cloudflare R2
VITE_R2_ACCOUNT_ID=your_account_id
VITE_R2_BUCKET_NAME=nihongo-assets
VITE_R2_PUBLIC_DOMAIN=assets.yourdomain.com

# OR AWS S3
VITE_S3_REGION=us-east-1
VITE_S3_BUCKET_NAME=nihongo-assets
VITE_S3_PUBLIC_DOMAIN=s3.yourdomain.com

# OR Supabase Storage
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_SUPABASE_BUCKET_NAME=kanji-gifs

# Optional: CDN base URL
VITE_CDN_BASE_URL=https://cdn.yourdomain.com

# Optional: Remote manifest URL
VITE_ASSET_MANIFEST_URL=https://cdn.yourdomain.com/asset-manifest.json
```

### Storage Provider Configuration

#### Cloudflare R2 (Recommended)

1. Create an R2 bucket in your Cloudflare account
2. Enable public access for the bucket
3. Set the bucket name and account ID in environment variables
4. Optional: Configure a custom domain (e.g., `assets.yourdomain.com`)

#### AWS S3

1. Create an S3 bucket
2. Enable public access or configure CloudFront CDN
3. Set the bucket name and region in environment variables
4. Optional: Configure CORS policy for the bucket

#### Supabase Storage

1. Create a Supabase project
2. Enable Storage in your project
3. Create a bucket for kanji GIFs
4. Set the project URL, anon key, and bucket name in environment variables

## File Structure

```
nihongo_learning/
├── src/
│   ├── components/
│   │   ├── AssetLoader.tsx      # Smart image loader component
│   │   ├── AssetLoader.css      # Styles for asset loader
│   │   └── Kanji.tsx            # Updated to use remote URLs
│   ├── hooks/
│   │   └── useKanji.ts          # Updated with new asset methods
│   ├── services/
│   │   └── AssetService.ts      # Cloud storage service
│   ├── data/
│   │   ├── kanjiDatabase.ts     # Kanji data with URL fields
│   │   └── assetManifest.ts     # Asset metadata mapping
│   └── ...
├── kanji_data/                  # Local GIF files (now in .gitignore)
│   ├── kanji_001.gif
│   ├── kanji_002.gif
│   └── ...
├── scripts/
│   ├── upload-assets.mjs        # Migration script
│   └── package.json
├── .env.example
├── .gitignore                   # Now excludes kanji_data/
└── ASSET_MANAGEMENT.md          # This file
```

## Migration Guide

### Step 1: Prepare Local Files

Ensure all your GIF files are in the `kanji_data/` directory with the naming convention:
- `kanji_001.gif` (for 一)
- `kanji_002.gif` (for 二)
- etc.

### Step 2: Upload to Cloud Storage

Run the upload script:

```bash
# For Cloudflare R2
VITE_ASSET_STORAGE_TYPE=r2 \
  VITE_R2_ACCOUNT_ID=your_account_id \
  VITE_R2_BUCKET_NAME=nihongo-assets \
  node scripts/upload-assets.mjs

# For AWS S3
VITE_ASSET_STORAGE_TYPE=s3 \
  VITE_S3_REGION=us-east-1 \
  VITE_S3_BUCKET_NAME=nihongo-assets \
  node scripts/upload-assets.mjs

# For Supabase Storage
VITE_ASSET_STORAGE_TYPE=supabase \
  VITE_SUPABASE_URL=https://your-project.supabase.co \
  VITE_SUPABASE_ANON_KEY=your_anon_key \
  node scripts/upload-assets.mjs
```

### Step 3: Generate Manifest Only (No Upload)

If you want to generate the manifest without uploading:

```bash
node scripts/upload-assets.mjs --generate-manifest
```

### Step 4: Update Environment Variables

Set your production environment variables in your deployment platform (Docker, Vercel, Netlify, etc.)

### Step 5: Remove Local Files from Git

```bash
# Add kanji_data to .gitignore (already done)
git rm -r --cached kanji_data/
git add .gitignore
git commit -m "Remove local GIF files, use cloud storage"
git push
```

## Usage in Code

### In Kanji Component

```tsx
import { AssetLoader } from './AssetLoader';

// Using the AssetLoader component
<AssetLoader
  src={animationUrl}
  alt="Stroke animation"
  fallbackUrls={[webpUrl, mp4Url]}
  onLoad={() => console.log('Loaded')}
  onError={(error) => console.error('Failed', error)}
  lazyLoad={true}
  showLoading={true}
  showError={true}
/>
```

### Using AssetService Directly

```typescript
import * as AssetService from '../services/AssetService';

// Generate URL for a kanji
const url = AssetService.getStrokeAnimationUrl('kanji_001', '一', 'gif');

// Check if using remote storage
const isRemote = AssetService.isUsingRemoteStorage();

// Preload an asset
AssetService.preloadAsset(url);
```

### Using the Hook

```typescript
import { useKanji } from '../hooks/useKanji';

const { getAnimationUrl, getAnimationUrlSync, hasAnimation } = useKanji();

// Synchronous URL (immediate)
const url = getAnimationUrlSync(kanjiItem);

// Async URL (can validate)
const url = await getAnimationUrl(kanjiItem);

// Check if animation exists
const available = hasAnimation(kanjiItem);
```

## Performance Optimization

### CDN Caching

Configure your CDN with these recommended settings:

```
Cache-Control: public, max-age=31536000, immutable
```

This caches assets for 1 year since GIF files are immutable (each update gets a new URL).

### Browser Caching

The AssetService automatically generates URLs that can be cached by browsers.

### Lazy Loading

All images use native lazy loading:
- `loading="lazy"` for images below the fold
- `fetchPriority="low"` for non-critical images
- Intersection Observer for dynamic loading

### Format Fallback

The system tries multiple formats in order:
1. GIF (widest compatibility)
2. WebP (better compression, modern browsers)
3. MP4 (best compression for animations, where supported)

## Development Mode

In development (`VITE_ASSET_STORAGE_TYPE=local`), the app will serve GIFs from `/assets/gifs/` path. You need to:

1. Create a `public/assets/gifs/` directory
2. Copy your GIF files there
3. Or use a local server to serve from `kanji_data/`

## Production Deployment

### Docker

The Docker image is now much smaller since it doesn't include GIF files. Update your Dockerfile:

```dockerfile
# Copy only necessary files
COPY . .
# Exclude kanji_data
COPY .dockerignore .dockerignore

# Build app
RUN npm run build

# Serve from nginx or other server
COPY --from=builder /app/dist /usr/share/nginx/html
```

### Vercel / Netlify

Just deploy as normal. The build will be faster and the deployment package smaller.

## Monitoring and Analytics

You can track asset usage by:

1. **CDN Analytics**: Most CDNs provide usage statistics
2. **Custom Tracking**: Add tracking pixels or use Google Analytics events
3. **Error Monitoring**: The AssetLoader component emits error events

## Troubleshooting

### GIFs Not Loading

1. Check environment variables are set correctly
2. Verify CORS configuration on your storage bucket
3. Test URLs directly in browser
4. Check browser console for errors

### Slow Loading

1. Ensure CDN caching is configured
2. Verify images are optimized (consider WebP/MP4)
3. Check network latency to your storage provider
4. Use lazy loading for below-the-fold images

### Build Errors

1. Ensure `kanji_data/` is in `.gitignore`
2. Check that all imports are correct
3. Verify TypeScript types are properly defined

## API Reference

### AssetService

```typescript
// Configuration
getStorageConfig(): StorageConfig

// URL Generation
generateAssetUrl(kanjiId: string, format: string): string
getStrokeAnimationUrl(kanjiId: string, kanjiChar: string, format: string): string
getOptimizedAssetUrl(kanjiId: string, kanjiChar: string): string

// Manifest
loadAssetManifest(): Promise<AssetManifest>
getAssetMetadata(kanjiId: string): Promise<AssetMetadata | null>
getAssetUrl(kanjiId: string, kanjiChar: string): Promise<string>

// Validation
validateUrl(url: string): Promise<boolean>
getValidAssetUrl(kanjiId: string, kanjiChar: string): Promise<string | null>

// Performance
preloadAsset(url: string): void
prefetchAsset(url: string): void

// Utilities
isUsingRemoteStorage(): boolean
getCdnUrl(url: string): string
```

### AssetLoader Component

Props:
```typescript
{
  src: string;                    // Primary URL
  fallbackUrls?: string[];        // Fallback URLs to try
  alt: string;                    // Accessibility alt text
  className?: string;             // CSS class
  style?: React.CSSProperties;   // Inline styles
  onLoad?: () => void;           // Load callback
  onError?: (error: Error) => void; // Error callback
  lazyLoad?: boolean;            // Enable lazy loading (default: true)
  showLoading?: boolean;          // Show loading spinner (default: true)
  showError?: boolean;           // Show error state (default: true)
  fallbackContent?: React.ReactNode; // Custom fallback
  preload?: boolean;             // Preload the image (default: false)
}
```

### useKanji Hook

Returns:
```typescript
{
  // ... existing methods ...
  getAnimationUrl: (kanji: KanjiData) => Promise<string | null>;
  getAnimationUrlSync: (kanji: KanjiData) => string | null;
  hasAnimation: (kanji: KanjiData) => boolean;
}
```

## Security Considerations

1. **CORS**: Ensure your storage bucket has CORS enabled for your domain
2. **Authentication**: For private assets, use signed URLs or authentication tokens
3. **HTTPS**: Always use HTTPS for asset URLs
4. **Input Validation**: Validate all user inputs when generating URLs

## Future Enhancements

1. **Automated Optimization**: Automatically convert GIFs to WebP/MP4 on upload
2. **Versioning**: Add version hashes to URLs for cache busting
3. **A/B Testing**: Test different formats (GIF vs WebP vs MP4)
4. **Analytics**: Track which formats are most commonly used
5. **Compression**: Add on-the-fly compression based on device capabilities

## License

This asset management system is part of Nihongo Learning and is licensed under the MIT License.
