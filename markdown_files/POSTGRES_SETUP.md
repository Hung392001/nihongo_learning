# PostgreSQL Setup Guide for Nihongo Learning

This guide explains how to set up PostgreSQL with pgvector for the Nihongo Learning application.

## Quick Start with Docker Compose

The easiest way to get started is using Docker Compose (with automatic migrations):

```bash
# Start the services (PostgreSQL + Server + Frontend)
docker-compose up -d

# Stop the services
docker-compose down

# View logs
docker-compose logs -f
```

## Database Configuration

The application uses the following PostgreSQL configuration:

| Variable            | Default Value                                             | Description            |
| ------------------- | --------------------------------------------------------- | ---------------------- |
| `DATABASE_URL`      | `postgresql://postgres:postgres@localhost:5432/simstudio` | Full connection string |
| `POSTGRES_HOST`     | `localhost`                                               | PostgreSQL host        |
| `POSTGRES_PORT`     | `5432`                                                    | PostgreSQL port        |
| `POSTGRES_USER`     | `postgres`                                                | PostgreSQL username    |
| `POSTGRES_PASSWORD` | `postgres`                                                | PostgreSQL password    |
| `POSTGRES_DB`       | `simstudio`                                               | Database name          |
| `SERVER_PORT`       | `3001`                                                    | API server port        |

## Manual Setup

If you want to run PostgreSQL manually without Docker:

### 1. Install PostgreSQL

**On Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**On macOS (using Homebrew):**

```bash
brew install postgresql
brew services start postgresql
```

### 2. Create Database and User

```bash
# Connect to PostgreSQL
sudo -u postgres psql

-- Create database
CREATE DATABASE simstudio;

-- Create user
CREATE USER postgres WITH PASSWORD 'postgres';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE simstudio TO postgres;

-- Exit
\q
```

Or using command line:

```bash
createdb simstudio -U postgres
```

### 3. Install pgvector Extension

```bash
# Connect to the database
psql -U postgres -d simstudio

-- Install pgvector extension
CREATE EXTENSION vector;

-- Exit
\q
```

### 4. Set Up Environment

```bash
# Create .env file
echo "DATABASE_URL=postgresql://postgres:postgres@localhost:5432/simstudio" > /app/.env
echo "POSTGRES_HOST=localhost" >> /app/.env
echo "POSTGRES_PORT=5432" >> /app/.env
echo "POSTGRES_USER=postgres" >> /app/.env
echo "POSTGRES_PASSWORD=postgres" >> /app/.env
echo "POSTGRES_DB=simstudio" >> /app/.env
```

### 5. Install Dependencies and Run Migrations

```bash
# Install all workspace dependencies
npm install --workspaces

# Run database migrations (Drizzle ORM)
npm run db:push --workspace=@sim/db
```

### 6. Start the Server

```bash
# Navigate to server directory
cd /app/server

# Start the server with hot-reload (development)
npm run dev

# Or build and run production version
npm run build
npm start
```

The server will start on port 3001 by default and automatically initialize with built-in vocabulary on first run.

### 7. Run the Frontend

```bash
# In the root directory
npm run dev
```

The frontend will start on port 5173 (or as configured in Vite).

## Database Migrations

This project uses **Drizzle ORM** for database management. Migrations are automatically handled:

### Automatic Migrations (Docker)

Migrations run automatically when containers start via:

```bash
npm run db:push --workspace=@sim/db
```

### Manual Migration

```bash
cd /app/db
npm run db:push
```

### View Migration Status

```bash
cd /app/db
npm run db:studio  # Opens Drizzle Studio UI for visual inspection
```

## API Endpoints

### Vocabulary

- `GET /api/vocabulary` - Get all vocabulary
- `GET /api/vocabulary/:id` - Get vocabulary by ID
- `POST /api/vocabulary` - Create new vocabulary
- `PUT /api/vocabulary/:id` - Update vocabulary
- `DELETE /api/vocabulary/:id` - Delete vocabulary
- `GET /api/vocabulary/unit/:unit` - Get vocabulary by unit
- `GET /api/vocabulary/search?q=query` - Search vocabulary

### Custom Lists

- `GET /api/lists` - Get all custom lists
- `POST /api/lists` - Create new custom list
- `PUT /api/lists/:id` - Update custom list
- `DELETE /api/lists/:id` - Delete custom list
- `GET /api/lists/:listId/vocabulary` - Get vocabulary in a list
- `POST /api/lists/:listId/items` - Add vocabulary to list
- `DELETE /api/lists/items/:itemId` - Remove vocabulary from list
- `GET /api/lists/:listId/contains/:vocabularyId` - Check if vocabulary is in list

### Health

- `GET /api/health` - Health check

### Initialization

- `POST /api/init` - Initialize database with built-in vocabulary

## Storage Priority

The application uses the following storage priority:

1. **PostgreSQL (via API)** - Primary storage when server is available
2. **IndexedDB** - Fallback for client-side storage
3. **LocalStorage** - Final fallback for basic browsers

## Environment Variables

### Frontend (React)

Create a `.env` file in the root directory:

```env
VITE_API_BASE=http://localhost:3001/api
```

### Backend (Server)

Create a `.env` file in the `server` directory:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=simstudio
SERVER_PORT=3001
NODE_ENV=development
```

## Database Schema

### vocabulary Table

| Column                    | Type      | Description                          |
| ------------------------- | --------- | ------------------------------------ |
| id                        | TEXT      | Primary key                          |
| hiragana                  | TEXT      | Hiragana representation (required)   |
| kanji                     | TEXT      | Kanji representation (optional)      |
| vietnamese                | TEXT      | Vietnamese translation (required)    |
| category                  | TEXT      | Category (e.g., pronoun, noun, verb) |
| tags                      | TEXT[]    | Array of tags for filtering          |
| example_sentence          | TEXT      | Example sentence in Japanese         |
| example_sentence_hiragana | TEXT      | Example sentence in hiragana         |
| example_translation_vi    | TEXT      | Vietnamese translation of example    |
| unit                      | INTEGER   | Unit number (1-5)                    |
| difficulty                | INTEGER   | Difficulty level                     |
| romaji                    | TEXT      | Romaji pronunciation                 |
| audio_url                 | TEXT      | URL to audio pronunciation           |
| is_favorite               | BOOLEAN   | Whether marked as favorite           |
| note                      | TEXT      | User notes                           |
| is_built_in               | BOOLEAN   | Whether this is built-in vocabulary  |
| created_at                | TIMESTAMP | Creation timestamp                   |
| updated_at                | TIMESTAMP | Last update timestamp                |

### custom_lists Table

| Column      | Type      | Description           |
| ----------- | --------- | --------------------- |
| id          | TEXT      | Primary key           |
| name        | TEXT      | List name (required)  |
| description | TEXT      | List description      |
| color       | TEXT      | Display color         |
| icon        | TEXT      | Display icon          |
| created_at  | TIMESTAMP | Creation timestamp    |
| updated_at  | TIMESTAMP | Last update timestamp |

### list_items Table

| Column        | Type      | Description                     |
| ------------- | --------- | ------------------------------- |
| id            | TEXT      | Primary key                     |
| list_id       | TEXT      | Foreign key to custom_lists     |
| vocabulary_id | TEXT      | Foreign key to vocabulary       |
| note          | TEXT      | Notes for this item in the list |
| added_at      | TIMESTAMP | When item was added             |

## Troubleshooting

### Connection Issues

If you get connection errors:

1. Check that PostgreSQL is running: `pg_isready`
2. Verify the connection settings in `.env`
3. Check the PostgreSQL logs: `/var/log/postgresql/postgresql-*.log`

### pgvector Not Found

If you get errors about pgvector:

```sql
-- Connect to the database and install
CREATE EXTENSION IF NOT EXISTS vector;
```

### Permission Issues

If you get permission errors:

```bash
# Grant all privileges to the user
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE simstudio TO postgres;"
```

## Development

### Run Server in Development Mode

```bash
cd server
npm run dev
```

This uses nodemon to automatically restart the server on file changes.

### Run Frontend in Development Mode

```bash
npm run dev
```

This uses Vite to run the React app with hot module replacement.

## Production Deployment

### Using Docker (Recommended)

```bash
# Build and run
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

### Manual Deployment

1. Build the frontend: `npm run build`
2. Deploy the built files from `dist/` directory
3. Run the server: `node server/index.js`
4. Use a process manager like PM2 for production

```bash
# Install PM2 globally
npm install -g pm2

# Start the server with PM2
pm2 start server/index.js --name nihongo-server

# Save and startup
pm2 save
pm2 startup
```
