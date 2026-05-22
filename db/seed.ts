/**
 * Seed Script - Load all vocabulary from SQL migration file
 * This clears existing data and seeds with all vocabulary items from 0002_seed_vocabulary.sql
 *
 * Usage:
 *   DATABASE_URL=your_connection_string npm run db:seed
 *
 * Example:
 *   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nihongo_learning npm run db:seed
 */

import { drizzle } from "drizzle-orm/postgres-js";
import { count } from "drizzle-orm";
import postgres from "postgres";
import { vocabulary, customList, listItem } from "./schema";
import { generateId } from "../src/utils/flashcardHelpers";
import fs from 'fs';
import path from 'path';

// Database connection
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/nihongo_learning";
const client = postgres(connectionString);
const db = drizzle(client);

// SQL column names
const columns = [
  'id', 'hiragana', 'kanji', 'vietnamese', 'category', 'tags',
  'example_sentence', 'example_sentence_hiragana', 'example_translation_vi',
  'unit', 'difficulty', 'romaji', 'audio_url', 'is_favorite', 'note', 'is_built_in'
];

// Map SQL column names to TypeScript property names
const columnMap: Record<string, string> = {
  'id': 'id',
  'hiragana': 'hiragana',
  'kanji': 'kanji',
  'vietnamese': 'vietnamese',
  'category': 'category',
  'tags': 'tags',
  'example_sentence': 'exampleSentence',
  'example_sentence_hiragana': 'exampleSentenceHiragana',
  'example_translation_vi': 'exampleTranslationVi',
  'unit': 'unit',
  'difficulty': 'difficulty',
  'romaji': 'romaji',
  'audio_url': 'audioUrl',
  'is_favorite': 'isFavorite',
  'note': 'note',
  'is_built_in': 'isBuiltIn',
};

// Parse a SQL value
function parseValue(value: string): any {
  value = value.trim();
  
  if (value === 'NULL' || value === null || value === '') {
    return null;
  }
  
  // Remove surrounding single quotes
  if (value.startsWith("'") && value.endsWith("'")) {
    value = value.slice(1, -1);
    
    // Handle escaped quotes
    value = value.replace(/\\'/g, "'").replace(/\\\\/g, '\\');
    
    // Check if it's a SQL array (e.g., {"a", "b", "c"})
    if (value.startsWith('{') && value.endsWith('}')) {
      const inner = value.slice(1, -1).trim();
      const parts: string[] = [];
      let current = '';
      let inQuotes = false;
      let quoteChar: string | null = null;
      
      for (let i = 0; i < inner.length; i++) {
        const char = inner[i];
        
        if ((char === "'" || char === '"') && !inQuotes) {
          inQuotes = true;
          quoteChar = char;
          current += char;
        } else if (char === quoteChar && inQuotes) {
          inQuotes = false;
          current += char;
        } else if (char === ',' && !inQuotes) {
          parts.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      
      if (current.trim()) {
        parts.push(current.trim());
      }
      
      return parts.map(p => {
        p = p.trim();
        if (p.startsWith("'") && p.endsWith("'")) return p.slice(1, -1);
        if (p.startsWith('"') && p.endsWith('"')) return p.slice(1, -1);
        return p;
      });
    }
    
    return value;
  }
  
  // Boolean
  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false;
  
  // Number
  if (/^-?\d+$/.test(value)) return parseInt(value, 10);
  if (/^-?\d+\.\d+$/.test(value)) return parseFloat(value);
  
  return value;
}

// Parse SQL file and extract vocabulary items
function parseSqlVocabulary(sqlPath: string): any[] {
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  const projectRoot = path.join(__dirname, '..');
  const fullPath = path.join(projectRoot, sqlPath);
  
  const sqlContent = fs.readFileSync(fullPath, 'utf8');
  
  // Extract all INSERT statements
  const insertRegex = /INSERT INTO vocabulary\s*\([^)]+\)\s*VALUES\s*\([^)]+\);?/gi;
  const inserts = sqlContent.match(insertRegex) || [];
  
  const items: any[] = [];
  
  for (const insert of inserts) {
    // Extract the VALUES part
    const valuesMatch = insert.match(/VALUES\s*\((.*)\);?/i);
    if (!valuesMatch) continue;
    
    const valuesStr = valuesMatch[1];
    
    // Split values by commas, handling quoted strings and nested structures
    const parts: string[] = [];
    let current = '';
    let inQuotes = false;
    let quoteChar: string | null = null;
    let depth = 0;
    let inArray = 0; // Track PostgreSQL array braces {}
    
    for (let i = 0; i < valuesStr.length; i++) {
      const char = valuesStr[i];
      
      // Handle quotes - always process quotes regardless of array state
      if ((char === "'" || char === '"') && !inQuotes) {
        inQuotes = true;
        quoteChar = char;
        current += char;
      } else if (char === quoteChar && inQuotes) {
        inQuotes = false;
        quoteChar = null;
        current += char;
      }
      // Handle parentheses (only when not in quotes)
      else if (char === '(' && !inQuotes) {
        depth++;
        current += char;
      } else if (char === ')' && !inQuotes) {
        depth--;
        current += char;
      }
      // Handle PostgreSQL array braces (only when not in quotes)
      else if (char === '{' && !inQuotes) {
        inArray++;
        current += char;
      } else if (char === '}' && !inQuotes) {
        inArray--;
        current += char;
      }
      // Split by comma only if not in quotes and at depth 0 and not in array
      else if (char === ',' && !inQuotes && depth === 0 && inArray === 0) {
        parts.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    if (current.trim()) {
      parts.push(current.trim());
    }
    
    // Must have the right number of parts
    if (parts.length !== columns.length) {
      console.log(`Skipping malformed INSERT (expected ${columns.length} values, got ${parts.length})`);
      continue;
    }
    
    // Build item object
    const item: Record<string, any> = {};
    for (let i = 0; i < columns.length; i++) {
      const col = columns[i];
      const tsCol = columnMap[col] || col;
      item[tsCol] = parseValue(parts[i]);
    }
    
    items.push(item);
  }
  
  return items;
}

async function migrateAll() {
  const sqlPath = path.join('db', 'migrations', '0002_seed_vocabulary.sql');
  const migrationVocabulary = parseSqlVocabulary(sqlPath);
  
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
