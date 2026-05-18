import { type SQL, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// ============ Vocabulary Tables ============

export const vocabulary = pgTable(
  "vocabulary",
  {
    id: text("id").primaryKey(),
    hiragana: text("hiragana").notNull(),
    kanji: text("kanji"),
    vietnamese: text("vietnamese").notNull(),
    category: text("category"),
    tags: text("tags").array(),
    exampleSentence: text("example_sentence"),
    exampleSentenceHiragana: text("example_sentence_hiragana"),
    exampleTranslationVi: text("example_translation_vi"),
    unit: integer("unit"),
    difficulty: integer("difficulty"),
    romaji: text("romaji"),
    audioUrl: text("audio_url"),
    isFavorite: boolean("is_favorite").notNull().default(false),
    note: text("note"),
    isBuiltIn: boolean("is_built_in").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    unitIdx: index("vocabulary_unit_idx").on(table.unit),
    categoryIdx: index("vocabulary_category_idx").on(table.category),
    isFavoriteIdx: index("vocabulary_is_favorite_idx").on(table.isFavorite),
  }),
);

export const customList = pgTable(
  "custom_list",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    color: text("color"),
    icon: text("icon"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    createdAtIdx: index("custom_list_created_at_idx").on(table.createdAt),
  }),
);

export const listItem = pgTable(
  "list_item",
  {
    id: text("id").primaryKey(),
    listId: text("list_id")
      .notNull()
      .references(() => customList.id, { onDelete: "cascade" }),
    vocabularyId: text("vocabulary_id")
      .notNull()
      .references(() => vocabulary.id, { onDelete: "cascade" }),
    note: text("note"),
    addedAt: timestamp("added_at").notNull().defaultNow(),
  },
  (table) => ({
    listIdIdx: index("list_item_list_id_idx").on(table.listId),
    vocabularyIdIdx: index("list_item_vocabulary_id_idx").on(
      table.vocabularyId,
    ),
    listVocabularyUnique: uniqueIndex("list_item_list_vocabulary_unique").on(
      table.listId,
      table.vocabularyId,
    ),
  }),
);
