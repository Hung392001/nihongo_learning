# Database Migration Setup

## Overview

The vocabulary database has been migrated from raw SQL/pg client to **Drizzle ORM**. This provides:

- ✅ Type-safe database queries
- ✅ Shared database layer with other services
- ✅ Automatic migration management
- ✅ Better performance and maintainability

## Project Structure

```
/app/db/
├── schema.ts                 # Database schema definitions (Drizzle ORM)
├── db.ts                     # Drizzle client initialization
├── drizzle.config.ts         # Drizzle configuration
├── migrations/               # Auto-generated SQL migrations
│   └── 0001_add_vocabulary_tables.sql  # Vocabulary tables migration
└── package.json

/app/server/
├── index.ts                  # Express server with Drizzle ORM queries
├── package.json              # Dependencies (includes drizzle-orm)
└── tsconfig.json

.devcontainer/
├── docker-compose.dev.yml    # Development container setup
└── run-migrations.sh         # Migration runner script
```

## Tables

### vocabulary

- `id` (text, PK)
- `hiragana`, `kanji`, `vietnamese` - Word content
- `category`, `tags`, `unit`, `difficulty`
- `exampleSentence`, `exampleSentenceHiragana`, `exampleTranslationVi`
- `romaji`, `audioUrl`
- `isFavorite`, `note`
- `isBuiltIn` - Marks built-in vocabulary
- `createdAt`, `updatedAt` - Timestamps

**Indexes:**

- `vocabulary_unit_idx` - For unit-based queries
- `vocabulary_category_idx` - For category filtering
- `vocabulary_is_favorite_idx` - For favorites

### custom_list

- `id` (text, PK)
- `name`, `description`, `color`, `icon`
- `createdAt`, `updatedAt`

**Indexes:**

- `custom_list_created_at_idx`

### list_item

- `id` (text, PK)
- `listId` → references `custom_list.id`
- `vocabularyId` → references `vocabulary.id`
- `note`, `addedAt`

**Indexes & Constraints:**

- `list_item_list_id_idx`
- `list_item_vocabulary_id_idx`
- `list_item_list_vocabulary_unique` - Prevents duplicates

## Running Migrations

### In Development Container

The migrations run automatically when the dev container starts:

```bash
# Docker Compose runs this command in the server service
npm run db:push --workspace=@sim/db
```

### Manual Migration

```bash
# From project root
cd /app/db
npm install
npm run db:push
```

### View Migration Status

```bash
# In /app/db
npm run db:studio  # Opens Drizzle Studio UI
```

## Server Setup

### Development

```bash
# Install all workspace dependencies
npm install --workspaces

# Run migrations
npm run db:push --workspace=@sim/db

# Start server with hot reload
cd /app/server
npm run dev
```

### Production

```bash
# Build Docker image
docker build -f Dockerfile.server -t nihongo-server .

# Image automatically runs migrations on startup
```

## API Endpoints

All endpoints remain the same:

```
GET    /api/vocabulary              # Get all vocabulary
GET    /api/vocabulary/:id          # Get by ID
POST   /api/vocabulary              # Create
PUT    /api/vocabulary/:id          # Update
DELETE /api/vocabulary/:id          # Delete
GET    /api/vocabulary/unit/:unit   # Get by unit
GET    /api/vocabulary/search       # Search

GET    /api/lists                   # Get all lists
POST   /api/lists                   # Create list
PUT    /api/lists/:id               # Update list
DELETE /api/lists/:id               # Delete list

POST   /api/lists/:listId/items     # Add item to list
GET    /api/lists/:listId/items     # Get list items
DELETE /api/lists/items/:itemId     # Remove item from list
GET    /api/lists/:listId/vocabulary # Get vocabulary in list
GET    /api/lists/:listId/contains/:vocabularyId # Check membership

POST   /api/init                    # Initialize with built-in vocabulary
GET    /api/health                  # Health check
```

## Removed Files

The following legacy files have been removed as they're no longer needed:

- ❌ `/app/src/services/PostgresVocabularyStorage.ts` - Direct PostgreSQL implementation (replaced by Drizzle)
- ❌ `/app/server/index.js` - Old JavaScript server (replaced by TypeScript version)

## Environment Variables

Required in `.env`:

```bash
# Database
DATABASE_URL=postgresql://user:password@host:port/database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=simstudio

# Server
SERVER_PORT=3001
NODE_ENV=development
```

## Troubleshooting

### Migration Failed

```bash
# Check database connection
psql postgresql://user:password@host:5432/database

# Check Drizzle config
cat /app/db/drizzle.config.ts

# Review migration SQL
cat /app/db/migrations/0001_add_vocabulary_tables.sql
```

### Server Won't Start

```bash
# Check dependencies are installed
npm install --workspaces

# Verify TypeScript compilation
npm run build --workspace=nihongo-learning-server

# Check .env file in server directory
cat /app/server/.env
```

### Database Empty After Migration

```bash
# Initialize with built-in vocabulary
curl -X POST http://localhost:3001/api/init
```

## Next Steps

- Frontend continues to use `ApiVocabularyStorage` (works with new server)
- `IndexedDBVocabularyStorage` works for offline mode
- All storage services are compatible with the new Drizzle ORM backend
