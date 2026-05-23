-- Drizzle Kit Migration
-- Generated for dynamic vocabulary unit system
-- Created: 2026-05-22

-- Vocabulary Unit table - user-created groups of vocabulary items
CREATE TABLE vocabulary_unit (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indexes for vocabulary_unit
CREATE INDEX vocabulary_unit_name_idx ON vocabulary_unit (name);
CREATE INDEX vocabulary_unit_order_idx ON vocabulary_unit (display_order);
CREATE INDEX vocabulary_unit_created_at_idx ON vocabulary_unit (created_at);

-- Vocabulary Item table - individual vocabulary entries within units
CREATE TABLE vocabulary_item (
    id TEXT PRIMARY KEY,
    unit_id TEXT NOT NULL REFERENCES vocabulary_unit(id) ON DELETE CASCADE,
    hiragana TEXT NOT NULL,
    kanji TEXT,
    vietnamese TEXT NOT NULL,
    hiragana_sentence TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indexes for vocabulary_item
CREATE INDEX vocabulary_item_unit_id_idx ON vocabulary_item (unit_id);
CREATE INDEX vocabulary_item_unit_order_idx ON vocabulary_item (unit_id, display_order);
CREATE INDEX vocabulary_item_created_at_idx ON vocabulary_item (created_at);
