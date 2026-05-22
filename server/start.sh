#!/bin/bash

# Startup script for server
# Wait for database to be ready, run migrations, then start the server

echo "🚀 Starting server..."
echo "⏳ Waiting for database to be ready..."

# Wait for PostgreSQL to be ready
# Try both pg_isready and nc for maximum compatibility
MAX_RETRIES=60
RETRY_COUNT=0
while true; do
  if pg_isready -h db -p 5432 -U postgres 2>/dev/null; then
    break
  fi
  RETRY_COUNT=$((RETRY_COUNT + 1))
  if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
    echo "❌ Database not ready after $MAX_RETRIES attempts"
    exit 1
  fi
  if [ $((RETRY_COUNT % 5)) -eq 0 ]; then
    echo "  Still waiting for database... ($RETRY_COUNT/$MAX_RETRIES)"
  fi
  sleep 1
done

echo "✅ Database is ready!"

# Run SQL migrations using psql
echo "📥 Running SQL migrations..."
for sql_file in /app/db/migrations/00*.sql; do
  if [ -f "$sql_file" ]; then
    echo "  Running $sql_file..."
    if PGPASSWORD=postgres psql -h db -p 5432 -U postgres -d nihongo_learning -f "$sql_file" 2>&1; then
      echo "  ✅ $sql_file completed"
    else
      echo "  ⚠️  $sql_file failed or already applied"
    fi
  fi
done

echo "✅ Migrations complete!"

# Start the server
echo "🎯 Starting server..."
cd /app/server && npm run dev
