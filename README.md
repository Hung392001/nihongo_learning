# 🇯🇵 Nihongo Learning - Japanese Vocabulary Flashcard System

A modern, interactive flashcard application for learning Japanese vocabulary with multiple learning modes and persistent storage.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎴 Interactive Flashcards
- **Smooth flip animations** with CSS 3D transforms
- **Click or keyboard** to flip cards
- **Visual feedback** for better UX
- **Auto-play mode** for hands-free review

### 📚 Multiple Learning Modes
- **Vietnamese → Hiragana**: Learn basic pronunciation
- **Hiragana → Kanji**: Master kanji characters
- **Kanji → Hiragana**: Practice reading kanji
- **Automatic mode detection** based on available vocabulary

### 💾 Persistent Storage
- **localStorage** for MVP (simple, no backend required)
- **API-ready architecture** for scalable production deployment
- **Automatic data persistence** across sessions
- **Import/Export** for backup and sharing

### ⚙️ Vocabulary Management
- **Add** new words with Vietnamese, Hiragana, and Kanji
- **Edit** existing vocabulary items
- **Delete** individual entries
- **Bulk Delete** - Select multiple words with checkboxes and delete together
- **Clear All** - Delete entire vocabulary list with safety confirmations
- **⭐ Favorite/Star** - Mark important words for priority review
- **🔍 Search** - Find words instantly by any field
- **🔄 Sort** - 6 different sorting options (newest, A-Z, favorites, etc.)
- **Import/Export** vocabulary as JSON files for backup and sharing
- **Full CRUD operations** with error handling

### 📊 Learning Insights
- **Statistics Dashboard** with comprehensive metrics
- Track total words, kanji coverage, favorites
- See words added recently (last 7 days)
- Category breakdown (if categorized)
- Oldest and newest word tracking

### 🌙 Customization
- **Dark Mode** - Easy on the eyes for night studying
- **Auto-play** - Hands-free flashcard review with configurable speed
- **Theme persistence** - Your preferences are saved

### 🎮 User Experience
- **Keyboard shortcuts** (Space, Arrow keys, S for shuffle)
- **Progress tracking** with visual progress bar
- **Shuffle mode** for randomized learning
- **Responsive design** for mobile and desktop
- **Accessibility features** (ARIA labels, keyboard navigation)

---

## 🏗️ Architecture

### System Design

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (React Components + CSS)               │
└──────────────┬──────────────────────────┘
               │
┌──────────────┴──────────────────────────┐
│         Business Logic Layer            │
│  (Hooks + State Management)             │
└──────────────┬──────────────────────────┘
               │
┌──────────────┴──────────────────────────┐
│         Data Access Layer               │
│  (Storage Interface + Implementations)  │
└─────────────────────────────────────────┘
```

### Key Components

1. **Flashcard Component**: Displays cards with flip animation
2. **FlashcardControls**: Navigation and shuffle controls
3. **ModeSelector**: Switch between learning modes
4. **VocabularyManager**: CRUD interface for vocabulary

### Hooks

- `useFlashcardManager`: Manages flashcard state and operations
- `useVocabulary`: Handles vocabulary CRUD operations

### Storage Layer

- `IVocabularyStorage`: Abstract storage interface
- `LocalStorageVocabularyStorage`: localStorage implementation (MVP)
- `ApiVocabularyStorage`: REST API implementation (production-ready)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- Modern web browser with ES6 support

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd nihongo_learning

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Building for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

---

## 📖 Usage Guide

### Adding Vocabulary

1. Click **"Manage Vocabulary"** button at the bottom
2. Fill in the form:
   - **Vietnamese**: Required (e.g., "Xin chào")
   - **Hiragana**: Required (e.g., "こんにちは")
   - **Kanji**: Optional (e.g., "今日は")
3. Click **"Add Word"**

### Learning with Flashcards

1. Select a **learning mode**:
   - Vietnamese → Hiragana
   - Hiragana → Kanji
   - Kanji → Hiragana
2. **Click the card** or press **Space** to flip
3. Use **← →** arrows to navigate between cards
4. Press **S** to shuffle the deck
5. Click **▶️ Tự động** for auto-play mode

### Search & Filter

**Search:**
1. Use search box at top of vocabulary list
2. Type Vietnamese, Hiragana, or Kanji
3. Results filter in real-time
4. Click × to clear search

**Filter by Favorites:**
1. Check **⭐ Chỉ yêu thích** checkbox
2. Only starred words shown
3. Uncheck to see all words

**Sort:**
- Select sort option from dropdown:
  - Mới nhất / Cũ nhất (by date)
  - A → Z / Z → A (alphabetical)
  - Có Kanji trước (kanji words first)
  - Yêu thích trước (favorites first)

### Favorite Words

1. Click **⭐** icon on any word to mark as favorite
2. Favorite words show filled star: ⭐
3. Use "Chỉ yêu thích" filter to review favorites
4. Sort by "Yêu thích trước" to see favorites at top

### View Statistics

1. Click **📊 Thống kê** button in header
2. View comprehensive metrics:
   - Total vocabulary size
   - Words with/without kanji
   - Favorite count
   - Recently added (7 days)
   - Category breakdown
   - Oldest/newest words
3. Click again to hide

### Theme & Display

**Dark Mode:**
1. Click **🌙** icon in header to enable dark mode
2. Click **☀️** to switch back to light mode
3. Preference saved automatically

**Auto-Play:**
1. Click **▶️ Tự động** button
2. Cards flip and advance automatically every 3 seconds
3. Click **⏸️ Dừng** to pause
4. Great for passive review

### Import/Export Vocabulary

**Export (Backup):**
1. Open **Manage Vocabulary** panel
2. Click **Export JSON** button
3. File downloads automatically as `nihongo-vocabulary-[timestamp].json`

**Import (Restore/Share):**
1. Open **Manage Vocabulary** panel
2. Click **Import JSON** button
3. Select a `.json` file
4. Choose to **Replace** existing vocabulary or **Add** to it
5. Confirmation shows how many words were imported

**Use Cases:**
- Backup before making changes
- Share vocabulary sets with study partners
- Transfer between devices
- Create custom word lists offline

### Bulk Delete & Clear All

**Bulk Delete (Select & Delete):**
1. Open **Manage Vocabulary** panel
2. Check boxes next to words you want to delete
3. Or click **"Chọn hết"** to select all words
4. Click **"Xóa đã chọn (X)"** button (X = number of selected items)
5. Confirm deletion
6. Selected words are removed

**Clear All (Delete Everything):**
1. Open **Manage Vocabulary** panel
2. Click **"Xóa Hết"** (Clear All) button (red button, far right)
3. Read warning and click OK
4. Confirm again (double confirmation for safety)
5. All vocabulary is deleted

**Features:**
- Selected items highlighted with purple border
- Counter shows number of selected items
- Double confirmation for Clear All prevents accidents
- Bulk actions disabled when list is empty

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` / `Enter` | Flip card |
| `←` | Previous card |
| `→` | Next card |
| `S` | Shuffle deck |

---

## 🗂️ Project Structure

```
nihongo_learning/
├── src/
│   ├── components/          # React components
│   │   ├── Flashcard.tsx
│   │   ├── Flashcard.css
│   │   ├── FlashcardControls.tsx
│   │   ├── FlashcardControls.css
│   │   ├── ModeSelector.tsx
│   │   ├── ModeSelector.css
│   │   ├── VocabularyManager.tsx
│   │   └── VocabularyManager.css
│   ├── hooks/               # Custom React hooks
│   │   ├── useFlashcardManager.ts
│   │   └── useVocabulary.ts
│   ├── services/            # Data access layer
│   │   ├── IVocabularyStorage.ts
│   │   ├── LocalStorageVocabularyStorage.ts
│   │   └── ApiVocabularyStorage.ts
│   ├── types/               # TypeScript types
│   │   └── vocabulary.ts
│   ├── utils/               # Helper functions
│   │   └── flashcardHelpers.ts
│   ├── data/                # Sample data
│   │   └── sampleVocabulary.ts
│   ├── App.tsx              # Main app component
│   ├── App.css              # Global styles
│   └── main.tsx             # Entry point
├── ARCHITECTURE.md          # Detailed architecture docs
├── PERSISTENCE.md           # Storage strategy guide
├── EXTENSIONS.md            # Future enhancement ideas
└── README.md                # This file
```

---

## 💾 Data Model

### VocabularyItem

```typescript
interface VocabularyItem {
  id: string;              // Unique identifier
  vietnamese: string;      // Vietnamese meaning
  hiragana: string;        // Hiragana representation
  kanji: string | null;    // Kanji (optional)
  createdAt: number;       // Creation timestamp
  updatedAt: number;       // Last update timestamp
}
```

### Extensibility

The data model is designed to be easily extended:

```typescript
// Future fields (commented in types/vocabulary.ts)
romaji?: string;           // Romanized pronunciation
exampleSentence?: string;  // Usage example
audioUrl?: string;         // Pronunciation audio
difficulty?: 1-5;          // Difficulty level
tags?: string[];           // Categorization
category?: string;         // Topic category
```

---

## 🔧 Configuration

### Storage Selection

The app uses localStorage by default. To switch to API storage:

```typescript
// In App.tsx
import { ApiVocabularyStorage } from './services/ApiVocabularyStorage';

// Replace localStorage with API storage
const storage = new ApiVocabularyStorage('/api', 'your-auth-token');
```

### Sample Data

To seed the app with sample vocabulary:

```typescript
import { seedSampleData } from './data/sampleVocabulary';

// In your initialization code
await seedSampleData(storage);
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Add new vocabulary item
- [ ] Edit existing vocabulary
- [ ] Delete vocabulary item
- [ ] Flip flashcard
- [ ] Navigate between cards
- [ ] Shuffle deck
- [ ] Switch learning modes
- [ ] Test keyboard shortcuts
- [ ] Test on mobile device

### Automated Tests (Future)

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e
```

---

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Japanese learning community
- React and TypeScript communities
- Open source contributors

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for Japanese language learners**
