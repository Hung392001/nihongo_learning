# 💾 Persistence Strategy Guide

This document explains the different storage approaches for the Nihongo Learning application, their trade-offs, and implementation details.

---

## Overview

The application uses a **Repository Pattern** to abstract storage implementation, allowing easy swapping between different persistence strategies.

```typescript
interface IVocabularyStorage {
  getAll(): Promise<VocabularyItem[]>;
  getById(id: string): Promise<VocabularyItem | null>;
  create(data: CreateVocabularyDto): Promise<VocabularyItem>;
  update(id: string, data: UpdateVocabularyDto): Promise<VocabularyItem>;
  delete(id: string): Promise<void>;
  clear(): Promise<void>;
}
```

---

## Approach 1: localStorage (MVP - Current Implementation)

### Description

Uses browser's localStorage API to persist data as JSON strings.

### Implementation

```typescript
// src/services/LocalStorageVocabularyStorage.ts
export class LocalStorageVocabularyStorage implements IVocabularyStorage {
  private loadFromStorage(): VocabularyItem[] {
    const data = localStorage.getItem('nihongo_vocabulary');
    return data ? JSON.parse(data) : [];
  }

  private saveToStorage(items: VocabularyItem[]): void {
    localStorage.setItem('nihongo_vocabulary', JSON.stringify(items));
  }

  // ... CRUD methods
}
```

### Pros ✅

- **Zero backend required** - Perfect for MVP and prototypes
- **Instant access** - No network latency
- **Simple implementation** - Just JSON serialization
- **Free** - No server costs
- **Works offline** - Data available without internet
- **Easy debugging** - Can inspect data in DevTools

### Cons ❌

- **Limited storage** - ~5-10MB depending on browser
- **Single device** - No cross-device synchronization
- **Data loss risk** - Cleared if user clears browser data
- **No backup** - Data only exists on client
- **Single user** - No multi-user support
- **No advanced queries** - Must load all data to filter/search

### Best For

- MVP/Prototype development
- Personal learning tools
- Offline-first applications
- Small datasets (<1000 items)
- Single-user scenarios

### Storage Limits by Browser

| Browser | Storage Limit |
|---------|---------------|
| Chrome | ~10 MB |
| Firefox | ~10 MB |
| Safari | ~5 MB |
| Edge | ~10 MB |

### Example Usage

```typescript
import { LocalStorageVocabularyStorage } from './services/LocalStorageVocabularyStorage';

const storage = new LocalStorageVocabularyStorage();

// Create
await storage.create({ 
  vietnamese: 'Xin chào', 
  hiragana: 'こんにちは',
  kanji: '今日は'
});

// Read
const allWords = await storage.getAll();
const word = await storage.getById('some-id');

// Update
await storage.update('some-id', { vietnamese: 'Chào bạn' });

// Delete
await storage.delete('some-id');
```

---

## Approach 2: REST API + Database (Production)

### Description

Client communicates with backend API, which persists data in a database (MongoDB, PostgreSQL, etc.)

### Architecture

```
┌──────────────┐      HTTP/REST      ┌──────────────┐
│   React      │ ◄──────────────────► │   Backend    │
│   Frontend   │     JSON Payloads    │   (Node.js)  │
└──────────────┘                      └──────┬───────┘
                                             │
                                             │
                                      ┌──────▼───────┐
                                      │   Database   │
                                      │  (MongoDB/   │
                                      │  PostgreSQL) │
                                      └──────────────┘
```

### Implementation

#### Frontend (Client)

```typescript
// src/services/ApiVocabularyStorage.ts
export class ApiVocabularyStorage implements IVocabularyStorage {
  constructor(private baseUrl: string = '/api', private authToken?: string) {}

  async getAll(): Promise<VocabularyItem[]> {
    const response = await fetch(`${this.baseUrl}/vocabulary`);
    return response.json();
  }

  async create(data: CreateVocabularyDto): Promise<VocabularyItem> {
    const response = await fetch(`${this.baseUrl}/vocabulary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  // ... other methods
}
```

#### Backend (Node.js + Express + MongoDB)

```typescript
import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('nihongo_learning');
const vocabulary = db.collection('vocabulary');

// GET all vocabulary
app.get('/api/vocabulary', async (req, res) => {
  const items = await vocabulary.find().toArray();
  res.json(items);
});

// POST create vocabulary
app.post('/api/vocabulary', async (req, res) => {
  const item = {
    ...req.body,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  const result = await vocabulary.insertOne(item);
  res.status(201).json({ ...item, id: result.insertedId });
});

// PUT update vocabulary
app.put('/api/vocabulary/:id', async (req, res) => {
  const update = { ...req.body, updatedAt: Date.now() };
  const result = await vocabulary.findOneAndUpdate(
    { _id: new ObjectId(req.params.id) },
    { $set: update },
    { returnDocument: 'after' }
  );
  res.json(result.value);
});

// DELETE vocabulary
app.delete('/api/vocabulary/:id', async (req, res) => {
  await vocabulary.deleteOne({ _id: new ObjectId(req.params.id) });
  res.status(204).send();
});

app.listen(3000);
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vocabulary` | Get all vocabulary items |
| GET | `/api/vocabulary/:id` | Get single item |
| POST | `/api/vocabulary` | Create new item |
| PUT | `/api/vocabulary/:id` | Update existing item |
| DELETE | `/api/vocabulary/:id` | Delete item |

### Pros ✅

- **Scalable** - Handle millions of records
- **Cross-device sync** - Access from any device
- **Persistent** - Data safely stored on server
- **Multi-user** - Support multiple users
- **Advanced features** - Search, analytics, recommendations
- **Backup/restore** - Regular database backups
- **Security** - Authentication, authorization
- **Data integrity** - ACID transactions

### Cons ❌

- **Requires backend** - More complex infrastructure
- **Network dependency** - Requires internet connection
- **Latency** - Network delays for operations
- **Server costs** - Hosting and database fees
- **Maintenance** - Server monitoring and updates
- **More complex** - Authentication, deployment, scaling

### Best For

- Production applications
- Multi-user platforms
- Large datasets (>1000 items)
- Cross-device synchronization
- Team/collaborative features

### Database Options

#### MongoDB (NoSQL)

```javascript
// Document structure
{
  _id: ObjectId("..."),
  vietnamese: "Xin chào",
  hiragana: "こんにちは",
  kanji: "今日は",
  createdAt: ISODate("2024-01-01T00:00:00Z"),
  updatedAt: ISODate("2024-01-01T00:00:00Z")
}
```

**Pros**: Flexible schema, easy to scale, good for JSON data  
**Cons**: No transactions (older versions), less structured

#### PostgreSQL (SQL)

```sql
CREATE TABLE vocabulary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vietnamese VARCHAR(255) NOT NULL,
  hiragana VARCHAR(255) NOT NULL,
  kanji VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Pros**: ACID compliant, powerful queries, relational data  
**Cons**: Requires schema migrations, slightly more complex

---

## Approach 3: IndexedDB (Advanced Client-Side)

### Description

Browser's IndexedDB API for structured data storage (more powerful than localStorage).

### Implementation

```typescript
export class IndexedDBVocabularyStorage implements IVocabularyStorage {
  private db: IDBDatabase;

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('nihongo_learning', 1);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('vocabulary')) {
          db.createObjectStore('vocabulary', { keyPath: 'id' });
        }
      };
      
      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db);
      };
      
      request.onerror = () => reject(request.error);
    });
  }

  async getAll(): Promise<VocabularyItem[]> {
    const transaction = this.db.transaction(['vocabulary'], 'readonly');
    const store = transaction.objectStore('vocabulary');
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // ... other methods
}
```

### Pros ✅

- **Larger storage** - 50MB+ (can request more)
- **Structured data** - Indexes and queries
- **Offline capable** - Works without network
- **Asynchronous** - Non-blocking operations
- **No backend** - Client-side only

### Cons ❌

- **More complex** - Verbose API compared to localStorage
- **Browser support** - Not all features universally supported
- **No cross-device sync** - Still client-only
- **Migration complexity** - Schema changes are tricky

### Best For

- Large client-side datasets
- Offline-first PWAs
- Complex queries on client
- When localStorage is too small

---

## Migration Strategy

### localStorage → API

1. **Export existing data**:
```typescript
const localData = await localStorageStorage.getAll();
```

2. **Import to API**:
```typescript
const apiStorage = new ApiVocabularyStorage('/api');
for (const item of localData) {
  await apiStorage.create({
    vietnamese: item.vietnamese,
    hiragana: item.hiragana,
    kanji: item.kanji,
  });
}
```

3. **Switch storage implementation**:
```typescript
// In App.tsx
const storage = new ApiVocabularyStorage('/api', authToken);
```

---

## Hybrid Approach (Best of Both Worlds)

Combine API with client-side caching:

```typescript
export class CachedApiStorage implements IVocabularyStorage {
  private cache: Map<string, VocabularyItem> = new Map();
  
  constructor(private api: ApiVocabularyStorage) {}

  async getAll(): Promise<VocabularyItem[]> {
    // Try cache first
    if (this.cache.size > 0) {
      return Array.from(this.cache.values());
    }
    
    // Fallback to API
    const items = await this.api.getAll();
    items.forEach(item => this.cache.set(item.id, item));
    return items;
  }

  async create(data: CreateVocabularyDto): Promise<VocabularyItem> {
    const item = await this.api.create(data);
    this.cache.set(item.id, item);
    return item;
  }

  // ... other methods with cache invalidation
}
```

---

## Recommendation

### For MVP (Current)
✅ **Use localStorage** - Simple, fast, no backend needed

### For Production
✅ **Use REST API + Database** - Scalable, cross-device, multi-user

### For PWA/Offline
✅ **Use IndexedDB + Service Worker** - Large storage, offline-first

### For Enterprise
✅ **Use GraphQL + PostgreSQL + Redis** - Maximum flexibility and performance
