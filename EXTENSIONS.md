# 🚀 Future Enhancements & Extensions

This document outlines potential features and improvements for the Nihongo Learning application.

---

## 🎯 Priority 1: Core Learning Features

### 1.1 Spaced Repetition System (SRS)

Implement intelligent review scheduling based on memory retention.

**Algorithm**: Modified Leitner System or SM-2 (SuperMemo)

```typescript
interface SRSCard extends VocabularyItem {
  // SRS metadata
  level: number;              // Current box/level (0-5)
  lastReviewed: number;       // Timestamp of last review
  nextReview: number;         // When to show next
  ease: number;               // Ease factor (2.5 default)
  interval: number;           // Days until next review
  repetitions: number;        // Consecutive correct answers
}

// Review intervals by level
const INTERVALS = {
  0: 1,      // 1 minute
  1: 10,     // 10 minutes
  2: 1440,   // 1 day
  3: 4320,   // 3 days
  4: 10080,  // 1 week
  5: 43200,  // 1 month
};

function scheduleNextReview(card: SRSCard, quality: number): SRSCard {
  // quality: 0-5 (0=complete blackout, 5=perfect recall)
  
  if (quality < 3) {
    // Failed recall - reset to level 0
    return {
      ...card,
      level: 0,
      repetitions: 0,
      interval: INTERVALS[0],
      nextReview: Date.now() + INTERVALS[0] * 60 * 1000,
    };
  }
  
  // Successful recall - advance
  const newLevel = Math.min(card.level + 1, 5);
  const newInterval = INTERVALS[newLevel];
  
  return {
    ...card,
    level: newLevel,
    repetitions: card.repetitions + 1,
    interval: newInterval,
    lastReviewed: Date.now(),
    nextReview: Date.now() + newInterval * 60 * 1000,
    ease: card.ease + (quality - 3) * 0.1,
  };
}
```

**UI Components**:
- Review queue counter
- "Easy/Hard/Again" buttons after flip
- Progress visualization (heatmap calendar)
- Daily review notifications

### 1.2 Quiz Mode

Interactive testing with instant feedback.

**Types**:
- Multiple choice (select correct meaning)
- Fill in the blank (type hiragana/kanji)
- Matching pairs (drag and drop)

```typescript
interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'matching';
  question: string;
  correctAnswer: string;
  options?: string[];
  userAnswer?: string;
  isCorrect?: boolean;
}

interface QuizSession {
  questions: QuizQuestion[];
  currentIndex: number;
  score: number;
  startTime: number;
  endTime?: number;
}
```

**Features**:
- Configurable quiz length (5, 10, 20 questions)
- Random question generation
- Score tracking and statistics
- Immediate feedback
- Review incorrect answers

### 1.3 Audio Pronunciation

Add native speaker audio for each word.

**Implementation Options**:

1. **Pre-recorded audio files**:
```typescript
interface VocabularyItem {
  // ... existing fields
  audioUrl?: string;  // Link to MP3/OGG file
}

// Usage
<button onClick={() => playAudio(item.audioUrl)}>
  🔊 Play
</button>
```

2. **Text-to-Speech (TTS) API**:
```typescript
function speakJapanese(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = 0.8; // Slower for learning
  window.speechSynthesis.speak(utterance);
}
```

3. **Third-party APIs**:
- Google Cloud Text-to-Speech
- Amazon Polly
- Azure Cognitive Services

**UI Features**:
- Auto-play on flip (toggle setting)
- Slow/normal speed control
- Phonetic breakdown visualization

---

## 🎨 Priority 2: UX/UI Improvements

### 2.1 Romaji Support

Add romanized pronunciation for beginners.

```typescript
interface VocabularyItem {
  // ... existing fields
  romaji?: string;  // e.g., "konnichiwa"
}

// Auto-generate romaji from hiragana
function hiraganaToRomaji(hiragana: string): string {
  const map: Record<string, string> = {
    'こ': 'ko', 'ん': 'n', 'に': 'ni', 'ち': 'chi', 'は': 'wa',
    // ... full hiragana map
  };
  
  return hiragana.split('').map(char => map[char] || char).join('');
}
```

**New Mode**: Vietnamese → Romaji

### 2.2 Dark Mode

Theme switching for reduced eye strain.

```css
/* CSS Variables */
:root {
  --bg-primary: #ffffff;
  --text-primary: #1e293b;
  --accent: #667eea;
}

[data-theme="dark"] {
  --bg-primary: #1e293b;
  --text-primary: #f8fafc;
  --accent: #818cf8;
}
```

```typescript
function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

### 2.3 Progress Dashboard

Comprehensive learning statistics.

```typescript
interface LearningStats {
  totalWords: number;
  masteredWords: number;
  learningWords: number;
  newWords: number;
  studyStreak: number;        // Consecutive days studied
  totalStudyTime: number;     // Minutes
  accuracy: number;           // Percentage
  wordsPerDay: number;        // Average
  strongestCategory: string;
  weakestCategory: string;
}

function ProgressDashboard({ stats }: { stats: LearningStats }) {
  return (
    <div className="dashboard">
      <StatCard title="Mastered" value={stats.masteredWords} icon="✅" />
      <StatCard title="Learning" value={stats.learningWords} icon="📖" />
      <StatCard title="Streak" value={`${stats.studyStreak} days`} icon="🔥" />
      <StatCard title="Accuracy" value={`${stats.accuracy}%`} icon="🎯" />
      
      <Chart data={weeklyProgress} type="line" />
      <HeatmapCalendar data={studyHistory} />
    </div>
  );
}
```

**Charts**:
- Weekly progress line chart
- Category breakdown pie chart
- Study time heatmap
- Accuracy trend over time

### 2.4 Mobile App (PWA)

Convert to Progressive Web App for offline use and app-like experience.

```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Nihongo Learning',
        short_name: 'Nihongo',
        description: 'Japanese vocabulary flashcards',
        theme_color: '#667eea',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 300 },
            },
          },
        ],
      },
    }),
  ],
});
```

**Features**:
- Install to home screen
- Offline mode with service worker
- Push notifications for reviews
- Background sync

---

## 📚 Priority 3: Content & Organization

### 3.1 Categories & Tags

Organize vocabulary by topic.

```typescript
interface VocabularyItem {
  // ... existing fields
  category?: string;    // 'Greetings', 'Food', 'Travel', etc.
  tags?: string[];      // ['beginner', 'JLPT-N5', 'daily-use']
  difficulty?: 1 | 2 | 3 | 4 | 5;
}

function CategoryFilter({ onSelect }: { onSelect: (category: string) => void }) {
  const categories = [
    { name: 'Greetings', icon: '👋', count: 12 },
    { name: 'Food', icon: '🍜', count: 25 },
    { name: 'Travel', icon: '✈️', count: 18 },
    { name: 'Numbers', icon: '🔢', count: 30 },
  ];
  
  return (
    <div className="category-grid">
      {categories.map(cat => (
        <button onClick={() => onSelect(cat.name)}>
          <span className="icon">{cat.icon}</span>
          <span className="name">{cat.name}</span>
          <span className="count">{cat.count}</span>
        </button>
      ))}
    </div>
  );
}
```

### 3.2 Example Sentences

Add context with usage examples.

```typescript
interface VocabularyItem {
  // ... existing fields
  exampleSentence?: string;
  exampleTranslation?: string;
}

// Display in flashcard
function FlashcardWithExample({ item }: { item: VocabularyItem }) {
  return (
    <div>
      <div className="word">{item.kanji}</div>
      {item.exampleSentence && (
        <div className="example">
          <p className="sentence">{item.exampleSentence}</p>
          <p className="translation">{item.exampleTranslation}</p>
        </div>
      )}
    </div>
  );
}
```

### 3.3 JLPT Level Tagging

Tag words by Japanese Language Proficiency Test level.

```typescript
enum JLPTLevel {
  N5 = 'N5', // Beginner
  N4 = 'N4',
  N3 = 'N3', // Intermediate
  N2 = 'N2',
  N1 = 'N1', // Advanced
}

interface VocabularyItem {
  // ... existing fields
  jlptLevel?: JLPTLevel;
}

// Filter by JLPT level
function JLPTFilter({ onSelect }: { onSelect: (level: JLPTLevel) => void }) {
  return (
    <div className="jlpt-filter">
      {Object.values(JLPTLevel).map(level => (
        <button onClick={() => onSelect(level)}>
          {level}
        </button>
      ))}
    </div>
  );
}
```

### 3.4 Import/Export

Bulk data management.

```typescript
// Export to JSON
function exportVocabulary(items: VocabularyItem[]): void {
  const json = JSON.stringify(items, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `vocabulary-${Date.now()}.json`;
  a.click();
}

// Import from JSON
function importVocabulary(file: File): Promise<VocabularyItem[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const items = JSON.parse(e.target?.result as string);
        resolve(items);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.readAsText(file);
  });
}

// Export to CSV
function exportToCSV(items: VocabularyItem[]): void {
  const headers = ['Vietnamese', 'Hiragana', 'Kanji'];
  const rows = items.map(item => 
    [item.vietnamese, item.hiragana, item.kanji || ''].join(',')
  );
  const csv = [headers.join(','), ...rows].join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `vocabulary-${Date.now()}.csv`;
  a.click();
}
```

**Formats**:
- JSON (full data with metadata)
- CSV (simple import/export)
- Anki deck format (.apkg)

---

## 🤝 Priority 4: Social & Collaborative

### 4.1 Shared Decks

Share vocabulary sets with others.

```typescript
interface Deck {
  id: string;
  name: string;
  description: string;
  author: string;
  vocabulary: VocabularyItem[];
  downloads: number;
  rating: number;
  isPublic: boolean;
  createdAt: number;
}

function DeckMarketplace() {
  const [decks, setDecks] = useState<Deck[]>([]);
  
  return (
    <div className="marketplace">
      {decks.map(deck => (
        <DeckCard
          key={deck.id}
          deck={deck}
          onDownload={() => downloadDeck(deck.id)}
        />
      ))}
    </div>
  );
}
```

### 4.2 Leaderboards

Gamification with competitive elements.

```typescript
interface LeaderboardEntry {
  userId: string;
  username: string;
  score: number;
  wordsLearned: number;
  streak: number;
  rank: number;
}

function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  
  return (
    <div className="leaderboard">
      <h2>🏆 Weekly Leaderboard</h2>
      {entries.map(entry => (
        <div key={entry.userId} className="entry">
          <span className="rank">#{entry.rank}</span>
          <span className="username">{entry.username}</span>
          <span className="score">{entry.score} pts</span>
        </div>
      ))}
    </div>
  );
}
```

### 4.3 Study Groups

Collaborative learning spaces.

```typescript
interface StudyGroup {
  id: string;
  name: string;
  members: string[];
  sharedDecks: string[];
  chatMessages: Message[];
  challenges: Challenge[];
}

interface Challenge {
  id: string;
  name: string;
  goal: number;  // Words to learn
  deadline: number;
  participants: string[];
  progress: Record<string, number>;
}
```

---

## 🔧 Priority 5: Technical Improvements

### 5.1 Performance Optimization

- **Code splitting**: Lazy load components
- **Virtual scrolling**: Handle large vocabulary lists
- **Memoization**: Optimize re-renders
- **Service worker**: Aggressive caching

```typescript
// Lazy loading
const VocabularyManager = lazy(() => import('./components/VocabularyManager'));

// Virtual scrolling
import { FixedSizeList } from 'react-window';

function VocabularyList({ items }: { items: VocabularyItem[] }) {
  return (
    <FixedSizeList
      height={400}
      itemCount={items.length}
      itemSize={80}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          {items[index].vietnamese}
        </div>
      )}
    </FixedSizeList>
  );
}
```

### 5.2 Offline Support

Full offline functionality with sync.

```typescript
// Service worker for offline support
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-vocabulary') {
    event.waitUntil(syncVocabularyChanges());
  }
});
```

### 5.3 Internationalization (i18n)

Multi-language interface.

```typescript
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

i18n.init({
  resources: {
    en: {
      translation: {
        'app.title': 'Nihongo Learning',
        'flashcard.flip': 'Click to flip',
      },
    },
    vi: {
      translation: {
        'app.title': 'Học Tiếng Nhật',
        'flashcard.flip': 'Nhấp để lật',
      },
    },
  },
  lng: 'vi',
  fallbackLng: 'en',
});

function App() {
  const { t } = useTranslation();
  return <h1>{t('app.title')}</h1>;
}
```

### 5.4 Testing Suite

Comprehensive test coverage.

```typescript
// Unit tests
describe('FlashcardManager', () => {
  it('should flip card when flip() is called', () => {
    const { result } = renderHook(() => useFlashcardManager({ vocabulary }));
    
    act(() => {
      result.current.flip();
    });
    
    expect(result.current.state.isFlipped).toBe(true);
  });
});

// E2E tests (Playwright)
test('user can add vocabulary', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Manage Vocabulary');
  await page.fill('#vietnamese', 'Xin chào');
  await page.fill('#hiragana', 'こんにちは');
  await page.click('text=Add Word');
  
  await expect(page.locator('text=Xin chào')).toBeVisible();
});
```

---

## 📊 Priority 6: Analytics & Insights

### 6.1 Learning Analytics

Track detailed learning patterns.

```typescript
interface LearningEvent {
  type: 'card_viewed' | 'card_flipped' | 'answer_correct' | 'answer_wrong';
  vocabularyId: string;
  timestamp: number;
  duration?: number;
  mode: FlashcardMode;
}

// Track events
function trackEvent(event: LearningEvent) {
  // Send to analytics service
  analytics.track(event.type, {
    vocabularyId: event.vocabularyId,
    mode: event.mode,
  });
}

// Generate insights
function generateInsights(events: LearningEvent[]) {
  return {
    mostDifficultWords: getMostDifficult(events),
    bestStudyTime: getBestStudyTime(events),
    recommendedReviews: getRecommendedReviews(events),
  };
}
```

### 6.2 AI Recommendations

Personalized learning suggestions.

```typescript
interface Recommendation {
  type: 'review' | 'learn_new' | 'take_break';
  vocabularyIds?: string[];
  reason: string;
  priority: number;
}

function getRecommendations(user: User): Recommendation[] {
  const recommendations: Recommendation[] = [];
  
  // Check if user needs review
  const dueForReview = vocabulary.filter(item => 
    item.nextReview < Date.now()
  );
  
  if (dueForReview.length > 0) {
    recommendations.push({
      type: 'review',
      vocabularyIds: dueForReview.map(item => item.id),
      reason: `${dueForReview.length} words are due for review`,
      priority: 1,
    });
  }
  
  return recommendations;
}
```

---

## 🎮 Bonus: Gamification

### Game Modes

- **Speed Challenge**: Answer as many as possible in 60 seconds
- **Perfect Streak**: See how many you can get correct in a row
- **Daily Quest**: Complete specific tasks for rewards
- **Achievements**: Unlock badges for milestones

```typescript
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  progress: number;
  unlocked: boolean;
}

const achievements: Achievement[] = [
  {
    id: 'first_word',
    name: 'First Steps',
    description: 'Learn your first word',
    icon: '👶',
    requirement: 1,
    progress: 0,
    unlocked: false,
  },
  {
    id: 'century',
    name: 'Century',
    description: 'Learn 100 words',
    icon: '💯',
    requirement: 100,
    progress: 0,
    unlocked: false,
  },
  // ... more achievements
];
```

---

## Implementation Roadmap

### Phase 1 (1-2 months)
- [ ] Romaji support
- [ ] Dark mode
- [ ] Categories & tags
- [ ] Import/Export

### Phase 2 (2-3 months)
- [ ] Spaced Repetition System
- [ ] Audio pronunciation
- [ ] Quiz mode
- [ ] Progress dashboard

### Phase 3 (3-4 months)
- [ ] Mobile PWA
- [ ] Example sentences
- [ ] Shared decks
- [ ] Offline support

### Phase 4 (4-6 months)
- [ ] AI recommendations
- [ ] Learning analytics
- [ ] Gamification
- [ ] Study groups

---

**Note**: Features should be prioritized based on user feedback and usage analytics.
