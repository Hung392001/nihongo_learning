-- Drizzle Kit Migration
-- Flashcard Tables for PostgreSQL Storage
-- Created for flashcard deck functionality

-- Flashcard Decks table
CREATE TABLE flashcard_deck (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    source_type TEXT,
    source_id TEXT,
    vocabulary_list_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indexes for flashcard_deck
CREATE INDEX flashcard_deck_user_id_idx ON flashcard_deck (user_id);
CREATE INDEX flashcard_deck_name_idx ON flashcard_deck (name);
CREATE INDEX flashcard_deck_source_type_idx ON flashcard_deck (source_type);
CREATE INDEX flashcard_deck_source_id_idx ON flashcard_deck (source_id);
CREATE INDEX flashcard_deck_created_at_idx ON flashcard_deck (created_at);

-- Flashcards table (standalone flashcards)
CREATE TABLE flashcard_item (
    id TEXT PRIMARY KEY,
    front TEXT NOT NULL,
    back TEXT NOT NULL,
    kana TEXT,
    note TEXT,
    tags TEXT[] DEFAULT '{}',
    difficulty INTEGER,
    is_favorite BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indexes for flashcard_item
CREATE INDEX flashcard_item_tag_idx ON flashcard_item USING GIN (tags);
CREATE INDEX flashcard_item_difficulty_idx ON flashcard_item (difficulty);
CREATE INDEX flashcard_item_is_favorite_idx ON flashcard_item (is_favorite);
CREATE INDEX flashcard_item_created_at_idx ON flashcard_item (created_at);

-- Deck Items table (cards belonging to decks)
CREATE TABLE deck_item (
    id TEXT PRIMARY KEY,
    deck_id TEXT NOT NULL REFERENCES flashcard_deck(id) ON DELETE CASCADE,
    front TEXT NOT NULL,
    back TEXT NOT NULL,
    furigana TEXT,
    example TEXT,
    example_furigana TEXT,
    example_translation TEXT,
    level INTEGER DEFAULT 1,
    type TEXT DEFAULT 'vocabulary',
    unit_id TEXT,
    tags TEXT[] DEFAULT '{}',
    last_reviewed_at TIMESTAMP WITH TIME ZONE,
    review_count INTEGER DEFAULT 0,
    correctness INTEGER DEFAULT 0,
    note TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indexes for deck_item
CREATE INDEX deck_item_deck_id_idx ON deck_item (deck_id);
CREATE INDEX deck_item_unit_id_idx ON deck_item (unit_id);
CREATE INDEX deck_item_type_idx ON deck_item (type);
CREATE INDEX deck_item_level_idx ON deck_item (level);
CREATE INDEX deck_item_created_at_idx ON deck_item (created_at);
CREATE INDEX deck_item_order_idx ON deck_item (deck_id, display_order);
