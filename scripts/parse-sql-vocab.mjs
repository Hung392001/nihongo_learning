/**
 * Parse SQL vocabulary file and generate TypeScript data
 * Usage: node scripts/parse-sql-vocab.mjs
 */

import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const projectRoot = path.join(__dirname, '..');

// Read the SQL file
const sqlPath = path.join(projectRoot, 'db/migrations/0002_seed_vocabulary.sql');
const sqlContent = fs.readFileSync(sqlPath, 'utf8');

// Columns in the SQL INSERT statement
const columns = [
  'id', 'hiragana', 'kanji', 'vietnamese', 'category', 'tags',
  'example_sentence', 'example_sentence_hiragana', 'example_translation_vi',
  'unit', 'difficulty', 'romaji', 'audio_url', 'is_favorite', 'note', 'is_built_in'
];

// Map SQL column names to TypeScript property names
const columnMap = {
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
function parseValue(value) {
  value = value.trim();
  
  if (value === 'NULL' || value === null || value === '') {
    return null;
  }
  
  // Remove surrounding single quotes
  if (value.startsWith("'") && value.endsWith("'")) {
    value = value.slice(1, -1);
    
    // Handle escaped quotes
    value = value.replace(/\\'/g, "'").replace(/\\\\/g, '\\');
    
    // Check if it's a JSON-like array (SQL array syntax: {"a", "b", "c"})
    if (value.startsWith('{') && value.endsWith('}')) {
      // Extract content between braces
      const inner = value.slice(1, -1).trim();
      
      // Split by commas, handling quoted strings
      const parts = [];
      let current = '';
      let inQuotes = false;
      let quoteChar = null;
      
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
      
      // Clean each part
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

// Extract all INSERT statements
const insertRegex = /INSERT INTO vocabulary\s*\([^)]+\)\s*VALUES\s*\([^)]+\);?/gi;
const inserts = sqlContent.match(insertRegex) || [];

console.log(`Found ${inserts.length} INSERT statements`);

// Parse each INSERT statement
const items = [];

for (const insert of inserts) {
  // Extract the VALUES part
  const valuesMatch = insert.match(/VALUES\s*\((.*)\);?/i);
  if (!valuesMatch) continue;
  
  const valuesStr = valuesMatch[1];
  
  // Split values by commas, handling quoted strings and nested structures
  const parts = [];
  let current = '';
  let inQuotes = false;
  let quoteChar = null;
  let depth = 0;
  
  for (let i = 0; i < valuesStr.length; i++) {
    const char = valuesStr[i];
    
    // Handle quotes
    if ((char === "'" || char === '"') && depth === 0) {
      if (inQuotes) {
        if (char === quoteChar) {
          inQuotes = false;
          quoteChar = null;
        }
        current += char;
      } else {
        inQuotes = true;
        quoteChar = char;
        current += char;
      }
    }
    // Handle parentheses
    else if (char === '(' && !inQuotes) {
      depth++;
      current += char;
    } else if (char === ')' && !inQuotes) {
      depth--;
      current += char;
    }
    // Split by comma only if not in quotes and at depth 0
    else if (char === ',' && !inQuotes && depth === 0) {
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
  const item = {};
  for (let i = 0; i < columns.length; i++) {
    const col = columns[i];
    const tsCol = columnMap[col] || col;
    item[tsCol] = parseValue(parts[i]);
  }
  
  items.push(item);
}

console.log(`Parsed ${items.length} vocabulary items`);

// Generate TypeScript file
const outputPath = path.join(projectRoot, 'src/data/migrationVocabulary.ts');

let tsContent = `/**\n * Vocabulary data from SQL migration 0002_seed_vocabulary.sql\n * This contains all 236 vocabulary items for Units 1-5\n * Generated from the PostgreSQL migration file\n *\n * Do not edit this file directly. Edit the SQL migration file and regenerate.\n */\n\nimport { VocabularyItem } from '../types/vocabulary';\n\n`;

tsContent += `export const migrationVocabulary: Omit<VocabularyItem, 'createdAt' | 'updatedAt'>[] = [\n`;

for (let i = 0; i < items.length; i++) {
  const item = items[i];
  
  // Format the object
  const formattedItem = Object.entries(item).map(([key, value]) => {
    if (value === null) return `    ${key}: null`;
    if (value === true) return `    ${key}: true`;
    if (value === false) return `    ${key}: false`;
    if (typeof value === 'number') return `    ${key}: ${value}`;
    if (typeof value === 'string') {
      // Escape special characters
      const escaped = value
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
      return `    ${key}: '${escaped}'`;
    }
    if (Array.isArray(value)) {
      const formattedArray = value.map(v => {
        if (typeof v === 'string') {
          const escaped = v
            .replace(/\\/g, '\\\\')
            .replace(/'/g, "\\'")
            .replace(/"/g, '\\"');
          return `'${escaped}'`;
        }
        return String(v);
      }).join(', ');
      return `    ${key}: [${formattedArray}]`;
    }
    return `    ${key}: ${JSON.stringify(value)}`;
  }).join(',\n');
  
  tsContent += `  {\n${formattedItem}\n  }`;
  
  if (i < items.length - 1) {
    tsContent += ',';
  }
  
  tsContent += '\n';
}

tsContent += `];\n\n`;

tsContent += `/**\n * Create full VocabularyItem objects from migration data\n */\nexport function createMigrationVocabulary(): VocabularyItem[] {\n  const timestamp = Date.now();\n  return migrationVocabulary.map((item, index) => ({\n    ...item,
    id: item.id || \`migrated-\${index}\`,\n    createdAt: timestamp - (migrationVocabulary.length - index) * 1000,\n    updatedAt: timestamp - (migrationVocabulary.length - index) * 1000,\n  }));\n}\n\n`;

tsContent += `/**\n * Seed the storage with migration vocabulary data\n */\nexport async function seedMigrationData(storage: any): Promise<void> {\n  const migrationData = createMigrationVocabulary();\n  \n  // Clear existing data first\n  if (storage.clear) {\n    await storage.clear();\n  } else if (storage.deleteAll) {\n    await storage.deleteAll();\n  }\n  \n  // Insert new data\n  for (const item of migrationData) {\n    await storage.create({\n      vietnamese: item.vietnamese,\n      hiragana: item.hiragana,\n      kanji: item.kanji || null,\n      romaji: item.romaji,\n      category: item.category,\n      tags: item.tags,\n      exampleSentence: item.exampleSentence,\n      exampleSentenceHiragana: item.exampleSentenceHiragana,\n      exampleTranslationVi: item.exampleTranslationVi,\n      unit: item.unit,\n      difficulty: item.difficulty,\n      audioUrl: item.audioUrl,\n      isFavorite: item.isFavorite || false,\n      note: item.note,\n      isBuiltIn: item.isBuiltIn || true,\n    });\n  }\n  \n  console.log(\`✅ Seeded \${migrationData.length} vocabulary items from migration\`);\n}\n`;

// Write the output
fs.writeFileSync(outputPath, tsContent, 'utf8');

console.log(`✅ Generated ${outputPath}`);
console.log(`   Total items: ${items.length}`);
