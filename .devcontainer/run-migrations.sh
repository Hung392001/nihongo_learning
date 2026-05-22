#!/bin/bash
# Database migration script for development

set -e

echo "🔄 Running database migrations..."

# Set environment variables (defaults for nihongo_learning project)
export POSTGRES_USER=${POSTGRES_USER:-postgres}
export POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-postgres}
export POSTGRES_HOST=${POSTGRES_HOST:-localhost}
export POSTGRES_PORT=${POSTGRES_PORT:-5432}
export POSTGRES_DB=${POSTGRES_DB:-nihongo_learning}

export DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}"

# Navigate to db folder
cd /app/db

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing db dependencies..."
  npm install
fi

# Run migrations using drizzle-kit
echo "🗄️  Applying database schema migrations..."
npm run db:push

echo "🌱 Seeding database with vocabulary data..."
npm run db:migrate-all

echo "✅ Database setup completed successfully!"
