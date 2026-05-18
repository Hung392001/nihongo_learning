/**
 * Database Reset Script
 * Clears all data and reseeds with sample data
 * Usage: npm run db:reset
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { vocabulary, customList, listItem } from './schema';
import { sampleVocabulary } from '../src/data/sampleVocabulary';
import { generateId, getCurrentTimestamp } from '../src/utils/flashcardHelpers';

// Database connection
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/simstudio';
const client = postgres(connectionString);
const db = drizzle(client);

async function reset() {
  console.log('🔄 Resetting database...');
  
  try {
    // Clear all tables
    await db.delete(listItem);
    await db.delete(customList);
    await db.delete(vocabulary);
    console.log('🗑️  Cleared all tables');
    
    // Reseed with sample data
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
    
    console.log(`✅ Reseeded ${sampleVocabulary.length} vocabulary items`);
    
    // Count by unit
    const units = await db.select({
      unit: vocabulary.unit,
      count: db.count(),
    }).from(vocabulary).groupBy(vocabulary.unit).orderBy(vocabulary.unit);
    
    console.log('\n📊 Vocabulary by Unit:');
    for (const u of units) {
      console.log(`  Unit ${u.unit || 'N/A'}: ${u.count} words`);
    }
    
  } catch (error) {
    console.error('❌ Reset failed:', error);
    process.exit(1);
  } finally {
    client.end();
  }
}

reset();
