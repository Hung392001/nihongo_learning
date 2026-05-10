# 🚀 Quick Start Guide

Get the Nihongo Learning application running in 5 minutes!

---

## Prerequisites

Make sure you have installed:
- **Node.js** 16 or higher ([download](https://nodejs.org/))
- **npm** or **yarn** package manager

Verify installation:
```bash
node --version   # Should be v16 or higher
npm --version    # Should be v8 or higher
```

---

## Installation Steps

### 1. Install Dependencies

```bash
cd nihongo_learning
npm install
```

This will install:
- React 18
- TypeScript 5
- Vite (build tool)
- ESLint (code quality)

### 2. Start Development Server

```bash
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### 3. Open in Browser

The app should automatically open at: **http://localhost:5173**

If not, manually open the URL in your browser.

---

## First Steps

### Add Your First Word

1. Click the **"Manage Vocabulary"** button at the bottom
2. Fill in the form:
   - Vietnamese: `Xin chào`
   - Hiragana: `こんにちは`
   - Kanji: `今日は` (optional)
3. Click **"Add Word"**

### Start Learning

1. Your flashcard appears automatically
2. Click the card (or press **Space**) to flip
3. Use **← →** arrows to navigate
4. Press **S** to shuffle

### Add More Words

Continue adding vocabulary through the **Manage Vocabulary** panel.

---

## Loading Sample Data (Optional)

Want to start with pre-loaded vocabulary? Add this to your `src/main.tsx`:

```typescript
import { LocalStorageVocabularyStorage } from './services/LocalStorageVocabularyStorage';
import { seedSampleData } from './data/sampleVocabulary';

// Seed sample data on first load
const storage = new LocalStorageVocabularyStorage();
seedSampleData(storage).then(() => {
  console.log('Sample data loaded!');
});
```

This will add 20 common Japanese words to get you started.

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` or `Enter` | Flip card |
| `←` | Previous card |
| `→` | Next card |
| `S` | Shuffle deck |

---

## Build for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

Preview the production build:
```bash
npm run preview
```

---

## Troubleshooting

### Port 5173 already in use

Change the port in `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    port: 3000, // Change to any available port
  },
})
```

### TypeScript errors

Run type checking:
```bash
npm run type-check
```

### Clear localStorage data

Open browser console and run:
```javascript
localStorage.removeItem('nihongo_vocabulary');
location.reload();
```

---

## Project Structure Overview

```
nihongo_learning/
├── src/
│   ├── components/       # UI components (Flashcard, Controls, etc.)
│   ├── hooks/            # React hooks (useFlashcardManager, useVocabulary)
│   ├── services/         # Storage implementations
│   ├── types/            # TypeScript types
│   ├── utils/            # Helper functions
│   ├── data/             # Sample vocabulary
│   ├── App.tsx           # Main application
│   └── main.tsx          # Entry point
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── vite.config.ts        # Vite config
└── index.html            # HTML template
```

---

## Next Steps

1. ✅ Run the app
2. ✅ Add vocabulary
3. ✅ Learn with flashcards
4. 📖 Read [README.md](./README.md) for full documentation
5. 🏗️ Check [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
6. 💾 Read [PERSISTENCE.md](./PERSISTENCE.md) for storage strategies
7. 🚀 Explore [EXTENSIONS.md](./EXTENSIONS.md) for future features

---

## Getting Help

- **Documentation**: See README.md for detailed docs
- **Issues**: Report bugs or request features on GitHub
- **Architecture**: Read ARCHITECTURE.md for system overview

---

**Happy Learning! 🇯🇵**
