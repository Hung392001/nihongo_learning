/**
 * Database Migration Script
 * Applies migrations to update database schema
 * Usage: npm run db:migrate
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

// Database connection
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/simstudio';
const client = postgres(connectionString);
const db = drizzle(client);

async function runMigration() {
  console.log('🚀 Running database migrations...');
  
  try {
    await migrate(db, {
      migrationsFolder: './migrations',
    });
    
    console.log('✅ Migrations applied successfully');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    client.end();
  }
}

runMigration();
