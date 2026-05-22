#!/bin/bash
# Database migration and seed script for development

set -e

echo "🔄 Running database migrations..."

# Set environment variables (defaults for nihongo_learning project)
export POSTGRES_USER=${POSTGRES_USER:-postgres}
export POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-postgres}
export POSTGRES_HOST=${POSTGRES_HOST:-db}
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

# Apply schema migrations using Drizzle Kit
echo "🗄️  Applying database schema migrations..."
npm run db:migrate

# Seed with vocabulary data
echo "🌱 Seeding database with vocabulary data..."
npm run db:seed

echo "✅ Database setup completed successfully!"
