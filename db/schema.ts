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

// ============ Dynamic Vocabulary Unit Tables ============

export const vocabularyUnit = pgTable(
  "vocabulary_unit",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    displayOrder: integer("display_order").default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    nameIdx: index("vocabulary_unit_name_idx").on(table.name),
    orderIdx: index("vocabulary_unit_order_idx").on(table.displayOrder),
    createdAtIdx: index("vocabulary_unit_created_at_idx").on(table.createdAt),
  }),
);

export const vocabularyItem = pgTable(
  "vocabulary_item",
  {
    id: text("id").primaryKey(),
    unitId: text("unit_id")
      .notNull()
      .references(() => vocabularyUnit.id, { onDelete: "cascade" }),
    hiragana: text("hiragana").notNull(),
    kanji: text("kanji"),
    vietnamese: text("vietnamese").notNull(),
    hiraganaSentence: text("hiragana_sentence"),
    displayOrder: integer("display_order").default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    unitIdIdx: index("vocabulary_item_unit_id_idx").on(table.unitId),
    unitOrderIdx: index("vocabulary_item_unit_order_idx").on(
      table.unitId,
      table.displayOrder,
    ),
    createdAtIdx: index("vocabulary_item_created_at_idx").on(table.createdAt),
  }),
);

// ============ Flashcard Tables ============

export const flashcardDeck = pgTable(
  "flashcard_deck",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    sourceType: text("source_type"),
    sourceId: text("source_id"),
    vocabularyListId: text("vocabulary_list_id"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index("flashcard_deck_user_id_idx").on(table.userId),
    nameIdx: index("flashcard_deck_name_idx").on(table.name),
    sourceTypeIdx: index("flashcard_deck_source_type_idx").on(table.sourceType),
    sourceIdIdx: index("flashcard_deck_source_id_idx").on(table.sourceId),
    createdAtIdx: index("flashcard_deck_created_at_idx").on(table.createdAt),
  }),
);

export const flashcardItem = pgTable(
  "flashcard_item",
  {
    id: text("id").primaryKey(),
    front: text("front").notNull(),
    back: text("back").notNull(),
    kana: text("kana"),
    note: text("note"),
    tags: text("tags").array().default([]),
    difficulty: integer("difficulty"),
    isFavorite: boolean("is_favorite").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    tagIdx: index("flashcard_item_tag_idx").on(table.tags),
    difficultyIdx: index("flashcard_item_difficulty_idx").on(table.difficulty),
    isFavoriteIdx: index("flashcard_item_is_favorite_idx").on(table.isFavorite),
    createdAtIdx: index("flashcard_item_created_at_idx").on(table.createdAt),
  }),
);

export const deckItem = pgTable(
  "deck_item",
  {
    id: text("id").primaryKey(),
    deckId: text("deck_id")
      .notNull()
      .references(() => flashcardDeck.id, { onDelete: "cascade" }),
    front: text("front").notNull(),
    back: text("back").notNull(),
    furigana: text("furigana"),
    example: text("example"),
    exampleFurigana: text("example_furigana"),
    exampleTranslation: text("example_translation"),
    level: integer("level").default(1),
    type: text("type").$type<"vocabulary" | "kanji" | "grammar">().default("vocabulary"),
    unitId: text("unit_id"),
    tags: text("tags").array().default([]),
    lastReviewedAt: timestamp("last_reviewed_at"),
    reviewCount: integer("review_count").default(0),
    correctness: integer("correctness").default(0),
    note: text("note"),
    displayOrder: integer("display_order").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    deckIdIdx: index("deck_item_deck_id_idx").on(table.deckId),
    unitIdIdx: index("deck_item_unit_id_idx").on(table.unitId),
    typeIdx: index("deck_item_type_idx").on(table.type),
    levelIdx: index("deck_item_level_idx").on(table.level),
    createdAtIdx: index("deck_item_created_at_idx").on(table.createdAt),
    orderIdx: index("deck_item_order_idx").on(table.deckId, table.displayOrder),
  }),
);
