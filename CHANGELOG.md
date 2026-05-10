# Changelog

All notable changes to the Nihongo Learning application.

---

## [Version 1.3.0] - May 8, 2026

### 🎉 Major Features Update

#### 1. 🔍 Search & Filter

Powerful search functionality to find vocabulary instantly.

**Features:**
- Search box with real-time filtering
- Searches across Vietnamese, Hiragana, Kanji, notes, and categories
- Clear button to reset search
- Visual feedback (search icon)
- Case-insensitive matching

**Usage:**
- Type in search box at top of vocabulary list
- Results filter automatically
- Click × to clear

#### 2. 🔄 Sort Options

Multiple ways to organize your vocabulary list.

**Sort Options:**
- **Mới nhất** (Newest first) - Default
- **Cũ nhất** (Oldest first)
- **A → Z** (Alphabetical Vietnamese)
- **Z → A** (Reverse alphabetical)
- **Có Kanji trước** (Words with kanji first)
- **Yêu thích trước** (Favorites first)

**Usage:**
- Select from dropdown in vocabulary list
- Sorting persists while browsing
- Works with search and filters

#### 3. ⭐ Favorite/Star Words

Mark important or difficult words for quick access.

**Features:**
- Star icon (⭐/☆) on each vocabulary item
- Toggle favorite with one click
- "Chỉ yêu thích" filter checkbox
- Favorites highlighted with golden color
- Sort by favorites

**Usage:**
- Click star icon to favorite/unfavorite
- Check "⭐ Chỉ yêu thích" to show only favorites
- Use "Yêu thích trước" sort to see favorites at top

#### 4. 📊 Statistics Dashboard

Comprehensive overview of your vocabulary progress.

**Metrics Displayed:**
- **Total words** - Your vocabulary size
- **Words with Kanji** - Count of kanji-containing words
- **Favorite words** - Number of starred words
- **7 ngày qua** - Words added in last 7 days
- **Categories breakdown** - Distribution by category (if categorized)
- **Oldest word** - First word you added
- **Newest word** - Most recent addition

**Features:**
- Beautiful gradient card design
- Responsive grid layout
- Toggle on/off with button in header
- Auto-calculates from your data

**Usage:**
- Click "📊 Thống kê" button in header
- View your learning progress
- Click again to hide

#### 5. 🌙 Dark Mode

Easy on the eyes for night studying.

**Features:**
- Full dark theme across entire app
- Smooth transitions between themes
- Preserves preference in localStorage
- Optimized contrast for readability
- All components themed (cards, panels, buttons)

**Usage:**
- Click 🌙 (moon) icon in header to enable
- Click ☀️ (sun) icon to return to light mode
- Preference saved automatically

**Colors:**
- Dark background gradient
- Card backgrounds: #334155
- Text: Light gray for readability
- Accent: Purple maintained

#### 6. ▶️ Auto-Play Mode

Hands-free flashcard review.

**Features:**
- Automatically flips cards
- Auto-advances to next card
- 3-second delay between actions
- Pause/Resume anytime
- Stops at end of deck
- Visual active state

**Usage:**
- Click "▶️ Tự động" to start
- Cards flip and advance automatically
- Click "⏸️ Dừng" to pause
- Great for passive review

**Behavior:**
1. Shows front → waits 3s
2. Flips to back → waits 3s
3. Advances to next card → repeat
4. Stops at last card

---

## [Version 1.2.0] - May 8, 2026

### 🎉 New Features

#### 1. Clear All Vocabulary

Added "Clear All" button to delete all vocabulary at once with double confirmation.

**Features:**
- "Xóa Hết" (Clear All) button in Vocabulary Manager
- Double confirmation dialog for safety
- Warning message shows total count
- Cannot be undone - emphasizes caution
- Disabled when vocabulary list is empty

**Safety:**
- First confirmation with warning
- Second confirmation to prevent accidents
- Shows exact count of words to be deleted

#### 2. Bulk Delete with Checkboxes

Select individual words and delete them in batch.

**Features:**
- Checkbox for each vocabulary item
- "Chọn hết" (Select All) checkbox to select/deselect all
- Shows count of selected items
- "Xóa đã chọn" (Delete Selected) button appears when items are selected
- Visual highlight for selected items (purple border)
- Confirmation dialog shows count before deleting

**Usage:**
1. Check boxes next to words you want to delete
2. Click "Xóa đã chọn (X)" button
3. Confirm deletion
4. Selected words are removed

**UI Features:**
- Selected items have purple border and light purple background
- Counter shows how many items are selected
- Select All checkbox shows total count
- Delete button only appears when items are selected
- All selections clear after deletion

---

## [Version 1.1.0] - May 8, 2026

### 🎉 New Features

#### 1. New Learning Mode: Kanji → Hiragana

Added a third learning mode that shows Kanji on the front and Hiragana on the back, useful for practicing reading kanji.

**Available Modes:**
- Vietnamese → Hiragana (basic pronunciation)
- Hiragana → Kanji (character mastery)
- **Kanji → Hiragana (reading practice)** ✨ NEW

The mode selector automatically shows all available modes based on your vocabulary (kanji-related modes only appear if you have words with kanji).

#### 2. Import/Export Functionality

**Export Vocabulary:**
- Click "Export JSON" button in Vocabulary Manager
- Downloads your vocabulary as a JSON file
- Filename format: `nihongo-vocabulary-[timestamp].json`
- Includes all data: Vietnamese, Hiragana, Kanji, timestamps
- Disabled when vocabulary list is empty

**Import Vocabulary:**
- Click "Import JSON" button in Vocabulary Manager
- Select a previously exported JSON file
- Validation checks:
  - Verifies file is valid JSON
  - Checks array structure
  - Validates required fields (Vietnamese, Hiragana)
- Two import options:
  - **Replace**: Clears existing vocabulary and imports new data
  - **Add/Merge**: Keeps existing vocabulary and adds imported words
- Success notification shows how many words were imported

**Use Cases:**
- Backup your vocabulary
- Share vocabulary sets with friends
- Transfer between devices
- Create custom word lists offline

---

## [Version 1.0.0] - May 8, 2026

### Initial Release

#### Core Features
- Interactive flashcard system with 3D flip animation
- Vietnamese → Hiragana learning mode
- Hiragana → Kanji learning mode
- Vocabulary management (Add/Edit/Delete)
- localStorage persistence
- Keyboard shortcuts (Space, ←, →, S)
- Progress tracking
- Shuffle mode
- Responsive design (mobile + desktop)
- 20 sample vocabulary words

#### Technical Stack
- React 18 + TypeScript 5
- Vite build tool
- CSS Modules
- localStorage for data persistence
- Clean architecture (3 layers)

---

## Upcoming Features

See [EXTENSIONS.md](./EXTENSIONS.md) for planned enhancements:
- Spaced Repetition System (SRS)
- Quiz mode
- Audio pronunciation
- Dark mode
- Progress dashboard
- And many more!

---

## Migration Guide

### Updating from v1.0.0 to v1.1.0

No breaking changes! Simply:
1. Pull latest code
2. Run `npm install` (if dependencies changed)
3. Restart dev server

Your existing localStorage data will work seamlessly with the new version.

### Backing Up Your Data

Before updating, you can now:
1. Open the app
2. Go to Vocabulary Manager
3. Click "Export JSON"
4. Save the file for backup

---

## Bug Fixes

### v1.1.0
- Fixed mode availability detection for kanji-based modes
- Improved error handling for import operations
- Added validation for imported vocabulary structure

---

## Breaking Changes

None in v1.1.0

---

**For detailed documentation, see [README.md](./README.md)**
