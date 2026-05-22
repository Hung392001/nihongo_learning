#!/bin/bash

# Startup script for server
# Wait for database to be ready, run migrations, then start the server

echo "🚀 Starting server..."
echo "⏳ Waiting for database to be ready..."

# Wait for PostgreSQL to be ready
MAX_RETRIES=30
RETRY_COUNT=0
while ! pg_isready -h db -p 5432 -U postgres 2>/dev/null; do
  RETRY_COUNT=$((RETRY_COUNT + 1))
  if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
    echo "❌ Database not ready after $MAX_RETRIES attempts"
    exit 1
  fi
  sleep 1
done

echo "✅ Database is ready!"

# Run migrations
echo "📥 Running database migrations..."
cd /app && npm run db:push
if [ $? -ne 0 ]; then
  echo "⚠️  Migration push failed, trying migrate..."
  npm run db:migrate
fi

echo "✅ Migrations complete!"

# Start the server
echo "🎯 Starting server..."
cd /app/server && npm run dev
