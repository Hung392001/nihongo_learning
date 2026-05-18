/**
 * Database Seed Script
 * Seeds the database with sample vocabulary data
 * Usage: npm run db:seed
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { vocabulary } from './schema';
import { sampleVocabulary } from '../src/data/sampleVocabulary';
import { generateId, getCurrentTimestamp } from '../src/utils/flashcardHelpers';

// Database connection
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/simstudio';
const client = postgres(connectionString);
const db = drizzle(client);

async function seed() {
  console.log('🌱 Seeding database with sample vocabulary...');
  
  try {
    // Clear existing data
    await db.delete(vocabulary);
    console.log('🗑️  Cleared existing vocabulary');
    
    // Insert sample data
    const timestamp = getCurrentTimestamp();
    const now = new Date(timestamp);
    
    for (const item of sampleVocabulary) {
      await db.insert(vocabulary).values({
        id: generateId(),
        hiragana: item.hiragana,
        kanji: item.kanji || null,
        vietnamese: item.vietnamese,
        romaji: item.romaji || null,
        category: item.category || null,
        tags: item.tags || null,
        exampleSentence: item.exampleSentence || null,
        exampleSentenceHiragana: item.exampleSentenceHiragana || null,
        exampleTranslationVi: item.exampleTranslationVi || null,
        unit: item.unit || null,
        difficulty: item.difficulty || null,
        audioUrl: item.audioUrl || null,
        isFavorite: false,
        note: null,
        isBuiltIn: true,
        createdAt: now,
        updatedAt: now,
      });
    }
    
    console.log(`✅ Seeded ${sampleVocabulary.length} vocabulary items`);
    
    // Count by unit
    const units = await db.select({
      unit: vocabulary.unit,
      count: db.count(),
    }).from(vocabulary).groupBy(vocabulary.unit).orderBy(vocabulary.unit);
    
    console.log('\n📊 Vocabulary by Unit:');
    for (const u of units) {
      console.log(`  Unit ${u.unit}: ${u.count} words`);
    }
    
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  } finally {
    client.end();
  }
}

seed();
