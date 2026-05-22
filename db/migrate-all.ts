/**
 * Migration Script - Load all vocabulary from migrationVocabulary.ts
 * This clears existing data and seeds with all 272+ vocabulary items from Units 1-21
 *
 * Usage:
 *   DATABASE_URL=your_connection_string npm run db:migrate-all
 *
 * Example:
 *   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/simstudio npm run db:migrate-all
 */

import { drizzle } from "drizzle-orm/postgres-js";
import { count } from "drizzle-orm";
import postgres from "postgres";
import { vocabulary, customList, listItem } from "./schema";
import { migrationVocabulary } from "../src/data/migrationVocabulary";
import { generateId } from "../src/utils/flashcardHelpers";

// Database connection
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/simstudio";
const client = postgres(connectionString);
const db = drizzle(client);

async function migrateAll() {
  console.log("🔄 Migrating all vocabulary data...");
  console.log(`📦 Total items to migrate: ${migrationVocabulary.length}`);

  try {
    // Clear all related tables
    await db.delete(listItem);
    await db.delete(customList);
    await db.delete(vocabulary);
    console.log("🗑️  Cleared all vocabulary and related data");

    // Seed with migration data
    const now = new Date();
    let successCount = 0;

    for (const item of migrationVocabulary) {
      await db.insert(vocabulary).values({
        id: generateId(),
        hiragana: item.hiragana,
        kanji: item.kanji || null,
        vietnamese: item.vietnamese,
        romaji: item.romaji || null,
        category: item.category || null,
        tags: item.tags || [],
        exampleSentence: item.exampleSentence || null,
        exampleSentenceHiragana: item.exampleSentenceHiragana || null,
        exampleTranslationVi: item.exampleTranslationVi || null,
        unit: item.unit || null,
        difficulty: item.difficulty || null,
        audioUrl: item.audioUrl || null,
        isFavorite: item.isFavorite || false,
        note: item.note || null,
        isBuiltIn: true,
        createdAt: now,
        updatedAt: now,
      });
      successCount++;
    }

    console.log(`✅ Successfully migrated ${successCount} vocabulary items`);

    // Show summary
    const units = await db
      .select({
        unit: vocabulary.unit,
        count: count(),
      })
      .from(vocabulary)
      .groupBy(vocabulary.unit)
      .orderBy(vocabulary.unit);

    console.log("\n📊 Vocabulary by Unit:");
    for (const u of units) {
      console.log(`  Unit ${u.unit || "N/A"}: ${u.count} words`);
    }

    const total = await db.select().from(vocabulary);
    console.log(`\n✨ Total: ${total.length} vocabulary items migrated`);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    client.end();
  }
}

migrateAll();
