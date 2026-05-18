-- Drizzle Kit Migration
-- Generated on: 2026-05-15T15:30:00.000Z

CREATE TABLE vocabulary (
    id TEXT PRIMARY KEY,
    hiragana TEXT NOT NULL,
    kanji TEXT,
    vietnamese TEXT NOT NULL,
    category TEXT,
    tags TEXT[],
    example_sentence TEXT,
    example_sentence_hiragana TEXT,
    example_translation_vi TEXT,
    unit INTEGER,
    difficulty INTEGER,
    romaji TEXT,
    audio_url TEXT,
    is_favorite BOOLEAN NOT NULL DEFAULT false,
    note TEXT,
    is_built_in BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX vocabulary_unit_idx ON vocabulary (unit);
CREATE INDEX vocabulary_category_idx ON vocabulary (category);
CREATE INDEX vocabulary_is_favorite_idx ON vocabulary (is_favorite);

CREATE TABLE custom_list (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    color TEXT,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX custom_list_created_at_idx ON custom_list (created_at);

CREATE TABLE list_item (
    id TEXT PRIMARY KEY,
    list_id TEXT NOT NULL REFERENCES custom_list(id) ON DELETE CASCADE,
    vocabulary_id TEXT NOT NULL REFERENCES vocabulary(id) ON DELETE CASCADE,
    note TEXT,
    added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX list_item_list_id_idx ON list_item (list_id);
CREATE INDEX list_item_vocabulary_id_idx ON list_item (vocabulary_id);
CREATE UNIQUE INDEX list_item_list_vocabulary_unique ON list_item (list_id, vocabulary_id);
