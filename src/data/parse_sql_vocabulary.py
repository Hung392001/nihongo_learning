#!/usr/bin/env python3
"""
Parse the SQL vocabulary seed file and generate TypeScript data.
Run this script to update the vocabulary data from the SQL migration file.
"""

import re
import json
import ast

# Read the SQL file
with open('/home/hung/nihongo_learning/db/migrations/0002_seed_vocabulary.sql', 'r', encoding='utf-8') as f:
    sql_content = f.read()

# Parse INSERT statements
pattern = r"INSERT INTO vocabulary \(([^)]+)\) VALUES \(([^)]+)\)"
matches = re.findall(pattern, sql_content, re.DOTALL)

vocabulary_items = []

for columns_str, values_str in matches:
    # Parse column names
    columns = [col.strip().strip('"') for col in columns_str.split(',')]
    
    # Parse values - this is tricky because of nested quotes and commas
    # We'll use a more robust approach
    pass

# Alternative approach: match each complete INSERT statement
insert_pattern = r"INSERT INTO vocabulary[^;]+;"
insert_statements = re.findall(insert_pattern, sql_content)

print(f"Found {len(insert_statements)} INSERT statements")

# Let's try a different approach - parse the VALUES more carefully
# Split by parentheses and handle nested structures

def parse_sql_value(value_str):
    """Parse a SQL value string into a Python value."""
    value_str = value_str.strip()
    
    if value_str == 'NULL' or value_str is None:
        return None
    
    # Remove surrounding quotes if present
    if (value_str.startswith("'") and value_str.endswith("'")) or \
       (value_str.startswith('"') and value_str.endswith('"')):
        # Remove outer quotes
        value_str = value_str[1:-1]
        
        # Handle escaped quotes
        value_str = value_str.replace("\\'", "'").replace('\\"', '"')
        
        # Try to parse as JSON if it looks like JSON
        if value_str.startswith('{') and value_str.endswith('}'):
            try:
                # Convert SQL array syntax to Python list
                # SQL: {"a", "b", "c"} -> Python: ["a", "b", "c"]
                return json.loads(value_str.replace('"', '"'))
            except:
                # Try to parse manually
                try:
                    # Remove braces and split by commas
                    inner = value_str[1:-1]
                    parts = [p.strip().strip('"').strip("'") for p in inner.split(',')]
                    return parts
                except:
                    return value_str
        
        return value_str
    
    # Try to parse as number
    try:
        return int(value_str)
    except ValueError:
        pass
    
    try:
        return float(value_str)
    except ValueError:
        pass
    
    # Try boolean
    if value_str.lower() == 'true':
        return True
    if value_str.lower() == 'false':
        return False
    
    return value_str


def parse_insert_statement(stmt):
    """Parse a single INSERT statement and return a dictionary."""
    # Extract the VALUES part
    values_match = re.search(r"VALUES \((.*?)\);?\s*$", stmt, re.DOTALL | re.IGNORECASE)
    if not values_match:
        return None
    
    values_str = values_match.group(1)
    
    # Split values while respecting quoted strings and parentheses
    # This is complex, let's use a different approach
    # We know the columns from the first INSERT
    return None


# Better approach: Use ast.literal_eval after some preprocessing
# But first, let's extract all the data between parentheses in VALUES

# Find all VALUES (...) sections
values_sections = re.findall(r"VALUES \((.*?)\);?\s*$", sql_content, re.MULTILINE | re.DOTALL)

print(f"Found {len(values_sections)} VALUES sections")

# The columns from the INSERT statement
columns = [
    'id', 'hiragana', 'kanji', 'vietnamese', 'category', 'tags',
    'example_sentence', 'example_sentence_hiragana', 'example_translation_vi',
    'unit', 'difficulty', 'romaji', 'audio_url', 'is_favorite', 'note', 'is_built_in'
]

items = []
for vs in values_sections:
    # Split by commas, but not within quotes
    parts = []
    current = ""
    in_quotes = False
    quote_char = None
    depth = 0
    
    for char in vs:
        if char in ("'", '"') and (depth == 0):
            if in_quotes:
                if char == quote_char:
                    in_quotes = False
                    quote_char = None
                current += char
            else:
                in_quotes = True
                quote_char = char
                current += char
        elif char == '(' and not in_quotes:
            depth += 1
            current += char
        elif char == ')' and not in_quotes:
            depth -= 1
            current += char
        elif char == ',' and not in_quotes and depth == 0:
            parts.append(current.strip())
            current = ""
        else:
            current += char
    
    if current.strip():
        parts.append(current.strip())
    
    if len(parts) != len(columns):
        continue
    
    item = {}
    for col, val in zip(columns, parts):
        parsed = parse_sql_value(val)
        item[col] = parsed
    
    items.append(item)

print(f"Parsed {len(items)} vocabulary items")

# Convert to TypeScript format
# Map SQL column names to TypeScript property names
name_map = {
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
}

ts_items = []
for item in items:
    ts_item = {
        'id': item['id'],
        'vietnamese': item['vietnamese'],
        'hiragana': item['hiragana'],
        'kanji': item['kanji'],
        'romaji': item['romaji'],
        'category': item['category'],
        'tags': item['tags'],
        'exampleSentence': item['example_sentence'],
        'exampleSentenceHiragana': item['example_sentence_hiragana'],
        'exampleTranslationVi': item['example_translation_vi'],
        'unit': item['unit'],
        'difficulty': item['difficulty'],
        'audioUrl': item['audio_url'],
        'isFavorite': item['is_favorite'],
        'note': item['note'],
        'isBuiltIn': item['is_built_in'],
    }
    ts_items.append(ts_item)

# Generate TypeScript file
ts_content = """import { VocabularyItem } from '../types/vocabulary';

/**
 * Vocabulary data from SQL migration 0002_seed_vocabulary.sql
 * This contains all 236 vocabulary items for Units 1-5
 * Generated from the PostgreSQL migration file
 */
export const migrationVocabulary: Omit<VocabularyItem, 'createdAt' | 'updatedAt'>[] = [
"""

for i, item in enumerate(ts_items):
    ts_item_str = json.dumps(item, ensure_ascii=False, indent=4)
    # Replace true/false with TypeScript true/false
    ts_item_str = ts_item_str.replace(': true', ': true').replace(': false', ': false')
    ts_item_str = ts_item_str.replace(': null', ': null')
    
    # Format the tags if it's a list
    if isinstance(item['tags'], list):
        tags_str = json.dumps(item['tags'], ensure_ascii=False)
        ts_item_str = re.sub(r"'tags': \[.*?\]", f"'tags': {tags_str}", ts_item_str)
    
    ts_content += f"  {ts_item_str}" + ("," if i < len(ts_items) - 1 else "") + "\n"

ts_content += """];

/**
 * Create full VocabularyItem objects from migration data
 */
export function createMigrationVocabulary(): VocabularyItem[] {
  const timestamp = Date.now();
  return migrationVocabulary.map((item, index) => ({
    ...item,
    id: item.id || `migrated-${index}`,
    createdAt: timestamp - (migrationVocabulary.length - index) * 1000,
    updatedAt: timestamp - (migrationVocabulary.length - index) * 1000,
  }));
}

/**
 * Seed the storage with migration vocabulary data
 */
export async function seedMigrationData(storage: any): Promise<void> {
  const migrationData = createMigrationVocabulary();
  
  // Clear existing data first
  if (storage.clear) {
    await storage.clear();
  } else if (storage.deleteAll) {
    await storage.deleteAll();
  }
  
  // Insert new data
  for (const item of migrationData) {
    await storage.create({
      vietnamese: item.vietnamese,
      hiragana: item.hiragana,
      kanji: item.kanji || null,
      romaji: item.romaji,
      category: item.category,
      tags: item.tags,
      exampleSentence: item.exampleSentence,
      exampleSentenceHiragana: item.exampleSentenceHiragana,
      exampleTranslationVi: item.exampleTranslationVi,
      unit: item.unit,
      difficulty: item.difficulty,
      audioUrl: item.audioUrl,
      isFavorite: item.isFavorite || false,
      note: item.note,
      isBuiltIn: item.isBuiltIn || true,
    });
  }
  
  console.log(`✅ Seeded ${migrationData.length} vocabulary items from migration`);
}
"""

# Write the output
with open('/home/hung/nihongo_learning/src/data/migrationVocabulary.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("✅ Generated migrationVocabulary.ts")
print(f"   Total items: {len(ts_items)}")
