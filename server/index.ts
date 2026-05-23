import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db, vocabulary, customList, listItem, vocabularyUnit, vocabularyItem, flashcardDeck, flashcardItem, deckItem } from "../db";
import { eq, ilike, and, desc, asc } from "drizzle-orm";

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.SERVER_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to generate IDs
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ============ Vocabulary Routes ============

// Get all vocabulary
app.get("/api/vocabulary", async (req: Request, res: Response) => {
  try {
    const results = await db
      .select()
      .from(vocabulary)
      .orderBy(desc(vocabulary.createdAt));
    res.json(results);
  } catch (error) {
    console.error("Error getting vocabulary:", error);
    res.status(500).json({ error: "Failed to get vocabulary" });
  }
});

// Get vocabulary by ID
app.get("/api/vocabulary/:id", async (req: Request, res: Response) => {
  try {
    const result = await db
      .select()
      .from(vocabulary)
      .where(eq(vocabulary.id, req.params.id));

    if (result.length === 0) {
      return res.status(404).json({ error: "Vocabulary not found" });
    }
    res.json(result[0]);
  } catch (error) {
    console.error("Error getting vocabulary by ID:", error);
    res.status(500).json({ error: "Failed to get vocabulary" });
  }
});

// Create vocabulary
app.post("/api/vocabulary", async (req: Request, res: Response) => {
  try {
    const {
      hiragana,
      kanji,
      vietnamese,
      category,
      tags,
      unit,
      difficulty,
      romaji,
      audioUrl,
      isFavorite,
      note,
    } = req.body;

    const id = generateId();

    const result = await db
      .insert(vocabulary)
      .values({
        id,
        hiragana,
        kanji: kanji || null,
        vietnamese,
        category: category || null,
        tags: tags || null,
        unit: unit || null,
        difficulty: difficulty || null,
        romaji: romaji || null,
        audioUrl: audioUrl || null,
        isFavorite: isFavorite || false,
        note: note || null,
        isBuiltIn: false,
      })
      .returning();

    res.status(201).json(result[0]);
  } catch (error) {
    console.error("Error creating vocabulary:", error);
    res.status(500).json({ error: "Failed to create vocabulary" });
  }
});

// Update vocabulary
app.put("/api/vocabulary/:id", async (req: Request, res: Response) => {
  try {
    const { hiragana, kanji, vietnamese, category, tags, isFavorite, note } =
      req.body;
    const id = req.params.id;

    const result = await db
      .update(vocabulary)
      .set({
        ...(hiragana && { hiragana }),
        kanji: kanji ?? undefined,
        ...(vietnamese && { vietnamese }),
        category: category ?? undefined,
        tags: tags ?? undefined,
        ...(isFavorite !== undefined && { isFavorite }),
        note: note ?? undefined,
        updatedAt: new Date(),
      })
      .where(eq(vocabulary.id, id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "Vocabulary not found" });
    }
    res.json(result[0]);
  } catch (error) {
    console.error("Error updating vocabulary:", error);
    res.status(500).json({ error: "Failed to update vocabulary" });
  }
});

// Delete vocabulary
app.delete("/api/vocabulary/:id", async (req: Request, res: Response) => {
  try {
    const result = await db
      .delete(vocabulary)
      .where(eq(vocabulary.id, req.params.id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "Vocabulary not found" });
    }
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting vocabulary:", error);
    res.status(500).json({ error: "Failed to delete vocabulary" });
  }
});

// Get vocabulary by unit
app.get("/api/vocabulary/unit/:unit", async (req: Request, res: Response) => {
  try {
    const result = await db
      .select()
      .from(vocabulary)
      .where(eq(vocabulary.unit, parseInt(req.params.unit)));
    res.json(result);
  } catch (error) {
    console.error("Error getting vocabulary by unit:", error);
    res.status(500).json({ error: "Failed to get vocabulary by unit" });
  }
});

// Search vocabulary
app.get("/api/vocabulary/search", async (req: Request, res: Response) => {
  try {
    const query = (req.query.q as string) || "";
    const searchPattern = `%${query}%`;

    const results = await db
      .select()
      .from(vocabulary)
      .where(
        query
          ? // Match against any of these fields
            ilike(vocabulary.hiragana, searchPattern) ||
              ilike(vocabulary.kanji ?? "", searchPattern) ||
              ilike(vocabulary.vietnamese, searchPattern)
          : undefined,
      )
      .orderBy(desc(vocabulary.createdAt));

    res.json(results);
  } catch (error) {
    console.error("Error searching vocabulary:", error);
    res.status(500).json({ error: "Failed to search vocabulary" });
  }
});

// ============ Custom Lists Routes ============

// Get all custom lists
app.get("/api/lists", async (req: Request, res: Response) => {
  try {
    const results = await db
      .select()
      .from(customList)
      .orderBy(desc(customList.createdAt));
    res.json(results);
  } catch (error) {
    console.error("Error getting custom lists:", error);
    res.status(500).json({ error: "Failed to get custom lists" });
  }
});

// Create custom list
app.post("/api/lists", async (req: Request, res: Response) => {
  try {
    const { name, description, color, icon } = req.body;
    const id = generateId();

    const result = await db
      .insert(customList)
      .values({
        id,
        name,
        description: description || null,
        color: color || null,
        icon: icon || null,
      })
      .returning();

    res.status(201).json(result[0]);
  } catch (error) {
    console.error("Error creating custom list:", error);
    res.status(500).json({ error: "Failed to create custom list" });
  }
});

// Update custom list
app.put("/api/lists/:id", async (req: Request, res: Response) => {
  try {
    const { name, description, color, icon } = req.body;
    const id = req.params.id;

    const updates: any = {};
    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (color !== undefined) updates.color = color;
    if (icon !== undefined) updates.icon = icon;
    updates.updatedAt = new Date();

    if (Object.keys(updates).length === 0) {
      return res.json({});
    }

    const result = await db
      .update(customList)
      .set(updates)
      .where(eq(customList.id, id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "Custom list not found" });
    }
    res.json(result[0]);
  } catch (error) {
    console.error("Error updating custom list:", error);
    res.status(500).json({ error: "Failed to update custom list" });
  }
});

// Delete custom list
app.delete("/api/lists/:id", async (req: Request, res: Response) => {
  try {
    await db.delete(customList).where(eq(customList.id, req.params.id));
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting custom list:", error);
    res.status(500).json({ error: "Failed to delete custom list" });
  }
});

// ============ List Items Routes ============

// Add vocabulary to custom list
app.post("/api/lists/:listId/items", async (req: Request, res: Response) => {
  try {
    const { vocabularyId, note } = req.body;
    const listId = req.params.listId;
    const id = generateId();

    const result = await db
      .insert(listItem)
      .values({
        id,
        listId,
        vocabularyId,
        note: note || null,
      })
      .returning();

    res.status(201).json(result[0]);
  } catch (error) {
    console.error("Error adding item to list:", error);
    res.status(500).json({ error: "Failed to add item to list" });
  }
});

// Get items in a list
app.get("/api/lists/:listId/items", async (req: Request, res: Response) => {
  try {
    const results = await db
      .select()
      .from(listItem)
      .where(eq(listItem.listId, req.params.listId));
    res.json(results);
  } catch (error) {
    console.error("Error getting list items:", error);
    res.status(500).json({ error: "Failed to get list items" });
  }
});

// Remove item from list
app.delete("/api/lists/items/:itemId", async (req: Request, res: Response) => {
  try {
    await db.delete(listItem).where(eq(listItem.id, req.params.itemId));
    res.status(204).end();
  } catch (error) {
    console.error("Error removing item from list:", error);
    res.status(500).json({ error: "Failed to remove item from list" });
  }
});

// Get vocabulary in a list
app.get(
  "/api/lists/:listId/vocabulary",
  async (req: Request, res: Response) => {
    try {
      const results = await db
        .select()
        .from(vocabulary)
        .innerJoin(listItem, eq(vocabulary.id, listItem.vocabularyId))
        .where(eq(listItem.listId, req.params.listId))
        .orderBy(desc(listItem.addedAt));

      res.json(results.map((r) => r.vocabulary));
    } catch (error) {
      console.error("Error getting vocabulary in list:", error);
      res.status(500).json({ error: "Failed to get vocabulary in list" });
    }
  },
);

// Check if vocabulary is in a list
app.get(
  "/api/lists/:listId/contains/:vocabularyId",
  async (req: Request, res: Response) => {
    try {
      const result = await db
        .select()
        .from(listItem)
        .where(
          and(
            eq(listItem.listId, req.params.listId),
            eq(listItem.vocabularyId, req.params.vocabularyId),
          ),
        );

      res.json({ isInList: result.length > 0 });
    } catch (error) {
      console.error("Error checking if vocabulary is in list:", error);
      res
        .status(500)
        .json({ error: "Failed to check if vocabulary is in list" });
    }
  },
);


// ============ Dynamic Vocabulary Unit Routes ============

// Get all vocabulary units
app.get("/api/units", async (req: Request, res: Response) => {
  try {
    const units = await db
      .select()
      .from(vocabularyUnit)
      .orderBy(asc(vocabularyUnit.displayOrder), asc(vocabularyUnit.name));
    res.json(units);
  } catch (error) {
    console.error("Error getting units:", error);
    res.status(500).json({ error: "Failed to get units" });
  }
});

// Get a single vocabulary unit by ID
app.get("/api/units/:id", async (req: Request, res: Response) => {
  try {
    const unit = await db
      .select()
      .from(vocabularyUnit)
      .where(eq(vocabularyUnit.id, req.params.id));
    
    if (unit.length === 0) {
      return res.status(404).json({ error: "Unit not found" });
    }
    res.json(unit[0]);
  } catch (error) {
    console.error("Error getting unit by ID:", error);
    res.status(500).json({ error: "Failed to get unit" });
  }
});

// Create a new vocabulary unit
app.post("/api/units", async (req: Request, res: Response) => {
  try {
    const { name, description, displayOrder } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    
    // Get the next display order (handle case where table doesn't exist yet)
    let nextOrder = 0;
    try {
      const maxOrder = await db
        .select({ maxOrder: db.max(vocabularyUnit.displayOrder) })
        .from(vocabularyUnit);
      nextOrder = (maxOrder[0]?.maxOrder || 0) + 1;
    } catch (error) {
      // Table might not exist yet, start at 0
      console.log("vocabulary_unit table not found, using default order 0");
      nextOrder = 0;
    }
    
    const id = generateId();
    const result = await db
      .insert(vocabularyUnit)
      .values({
        id,
        name,
        description: description || null,
        displayOrder: displayOrder || nextOrder,
      })
      .returning();
    
    res.status(201).json(result[0]);
  } catch (error) {
    console.error("Error creating unit:", error);
    // Provide more specific error message
    if (error instanceof Error) {
      if (error.message.includes('relation "vocabulary_unit" does not exist')) {
        return res.status(500).json({ 
          error: "Database tables not created. Please run: npm run db:migrate" 
        });
      }
    }
    res.status(500).json({ error: "Failed to create unit" });
  }
});

// Update a vocabulary unit
app.put("/api/units/:id", async (req: Request, res: Response) => {
  try {
    const { name, description, displayOrder } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    
    const unit = await db
      .update(vocabularyUnit)
      .set({
        name,
        description: description || null,
        displayOrder: displayOrder || 0,
        updatedAt: new Date(),
      })
      .where(eq(vocabularyUnit.id, req.params.id))
      .returning();
    
    if (unit.length === 0) {
      return res.status(404).json({ error: "Unit not found" });
    }
    
    res.json(unit[0]);
  } catch (error) {
    console.error("Error updating unit:", error);
    res.status(500).json({ error: "Failed to update unit" });
  }
});

// Delete a vocabulary unit (and all its items via cascade)
app.delete("/api/units/:id", async (req: Request, res: Response) => {
  try {
    const unit = await db
      .delete(vocabularyUnit)
      .where(eq(vocabularyUnit.id, req.params.id))
      .returning();
    
    if (unit.length === 0) {
      return res.status(404).json({ error: "Unit not found" });
    }
    
    res.json({ message: "Unit and all its items deleted successfully" });
  } catch (error) {
    console.error("Error deleting unit:", error);
    res.status(500).json({ error: "Failed to delete unit" });
  }
});

// Reorder vocabulary units
app.post("/api/units/reorder", async (req: Request, res: Response) => {
  try {
    const { unitIds } = req.body;
    
    if (!Array.isArray(unitIds)) {
      return res.status(400).json({ error: "unitIds must be an array" });
    }
    
    // Update display order for each unit
    for (let i = 0; i < unitIds.length; i++) {
      await db
        .update(vocabularyUnit)
        .set({ displayOrder: i })
        .where(eq(vocabularyUnit.id, unitIds[i]));
    }
    
    res.json({ message: "Units reordered successfully" });
  } catch (error) {
    console.error("Error reordering units:", error);
    res.status(500).json({ error: "Failed to reorder units" });
  }
});

// ============ Vocabulary Item Routes ============

// Get all vocabulary items for a unit
app.get("/api/units/:unitId/items", async (req: Request, res: Response) => {
  try {
    const items = await db
      .select()
      .from(vocabularyItem)
      .where(eq(vocabularyItem.unitId, req.params.unitId))
      .orderBy(asc(vocabularyItem.displayOrder));
    res.json(items);
  } catch (error) {
    console.error("Error getting unit items:", error);
    res.status(500).json({ error: "Failed to get unit items" });
  }
});

// Get a single vocabulary item by ID
app.get("/api/items/:id", async (req: Request, res: Response) => {
  try {
    const item = await db
      .select()
      .from(vocabularyItem)
      .where(eq(vocabularyItem.id, req.params.id));
    
    if (item.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item[0]);
  } catch (error) {
    console.error("Error getting item by ID:", error);
    res.status(500).json({ error: "Failed to get item" });
  }
});

// Create a new vocabulary item in a unit
app.post("/api/units/:unitId/items", async (req: Request, res: Response) => {
  try {
    const { hiragana, kanji, vietnamese, hiraganaSentence, displayOrder } = req.body;
    
    if (!hiragana || !vietnamese) {
      return res.status(400).json({ error: "hiragana and vietnamese are required" });
    }
    
    // Get the next display order for this unit (handle case where table doesn't exist yet)
    let nextOrder = 0;
    try {
      const maxOrder = await db
        .select({ maxOrder: db.max(vocabularyItem.displayOrder) })
        .from(vocabularyItem)
        .where(eq(vocabularyItem.unitId, req.params.unitId));
      nextOrder = (maxOrder[0]?.maxOrder || 0) + 1;
    } catch (error) {
      // Table might not exist yet, start at 0
      console.log("vocabulary_item table not found, using default order 0");
      nextOrder = 0;
    }
    
    const id = generateId();
    const result = await db
      .insert(vocabularyItem)
      .values({
        id,
        unitId: req.params.unitId,
        hiragana,
        kanji: kanji || null,
        vietnamese,
        hiraganaSentence: hiraganaSentence || null,
        displayOrder: displayOrder || nextOrder,
      })
      .returning();
    
    res.status(201).json(result[0]);
  } catch (error) {
    console.error("Error creating vocabulary item:", error);
    // Provide more specific error message
    if (error instanceof Error) {
      if (error.message.includes('relation "vocabulary_item" does not exist')) {
        return res.status(500).json({ 
          error: "Database tables not created. Please run: npm run db:migrate" 
        });
      }
    }
    res.status(500).json({ error: "Failed to create vocabulary item" });
  }
});

// Update a vocabulary item
app.put("/api/items/:id", async (req: Request, res: Response) => {
  try {
    const { hiragana, kanji, vietnamese, hiraganaSentence, displayOrder } = req.body;
    
    if (!hiragana || !vietnamese) {
      return res.status(400).json({ error: "hiragana and vietnamese are required" });
    }
    
    const item = await db
      .update(vocabularyItem)
      .set({
        hiragana,
        kanji: kanji || null,
        vietnamese,
        hiraganaSentence: hiraganaSentence || null,
        displayOrder: displayOrder || 0,
        updatedAt: new Date(),
      })
      .where(eq(vocabularyItem.id, req.params.id))
      .returning();
    
    if (item.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    
    res.json(item[0]);
  } catch (error) {
    console.error("Error updating vocabulary item:", error);
    res.status(500).json({ error: "Failed to update vocabulary item" });
  }
});

// Delete a vocabulary item
app.delete("/api/items/:id", async (req: Request, res: Response) => {
  try {
    const item = await db
      .delete(vocabularyItem)
      .where(eq(vocabularyItem.id, req.params.id))
      .returning();
    
    if (item.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting vocabulary item:", error);
    res.status(500).json({ error: "Failed to delete vocabulary item" });
  }
});

// Reorder vocabulary items within a unit
app.post("/api/units/:unitId/items/reorder", async (req: Request, res: Response) => {
  try {
    const { itemIds } = req.body;
    
    if (!Array.isArray(itemIds)) {
      return res.status(400).json({ error: "itemIds must be an array" });
    }
    
    // Update display order for each item
    for (let i = 0; i < itemIds.length; i++) {
      await db
        .update(vocabularyItem)
        .set({ displayOrder: i })
        .where(eq(vocabularyItem.id, itemIds[i]));
    }
    
    res.json({ message: "Items reordered successfully" });
  } catch (error) {
    console.error("Error reordering items:", error);
    res.status(500).json({ error: "Failed to reorder items" });
  }
});

// Get a unit with all its vocabulary items
app.get("/api/units/:id/with-items", async (req: Request, res: Response) => {
  try {
    const unit = await db
      .select()
      .from(vocabularyUnit)
      .where(eq(vocabularyUnit.id, req.params.id));
    
    if (unit.length === 0) {
      return res.status(404).json({ error: "Unit not found" });
    }
    
    const items = await db
      .select()
      .from(vocabularyItem)
      .where(eq(vocabularyItem.unitId, req.params.id))
      .orderBy(asc(vocabularyItem.displayOrder));
    
    res.json({
      ...unit[0],
      items,
    });
  } catch (error) {
    console.error("Error getting unit with items:", error);
    res.status(500).json({ error: "Failed to get unit with items" });
  }
});

app.get("/api/health", async (req: Request, res: Response) => {
  try {
    // Simple health check query - try to query an existing table
    // Use the original vocabulary table which should exist from migrations
    await db.select().from(vocabulary).limit(1);
    res.json({ status: "healthy", database: "connected" });
  } catch (error: any) {
    // If vocabulary table doesn't exist, try to check database connection
    try {
      const result = await db.execute(sql`SELECT 1`);
      res.json({ status: "healthy", database: "connected", tables: "pending_migration" });
    } catch (dbError: any) {
      res
        .status(500)
        .json({
          status: "unhealthy",
          database: "disconnected",
          error: dbError.message,
        });
    }
  }
});

// Flashcard API Endpoints

// Standalone Flashcard Item Endpoints (for backward compatibility)

// Get all standalone flashcard items
app.get("/api/flashcards/items", async (req: Request, res: Response) => {
  try {
    const items = await db
      .select()
      .from(flashcardItem)
      .orderBy(desc(flashcardItem.createdAt));
    res.json(items);
  } catch (error) {
    console.error("Error getting flashcard items:", error);
    res.status(500).json({ error: "Failed to get flashcard items" });
  }
});

// Get a specific standalone flashcard item
app.get("/api/flashcards/items/:itemId", async (req: Request, res: Response) => {
  try {
    const itemId = req.params.itemId;
    const item = await db
      .select()
      .from(flashcardItem)
      .where(eq(flashcardItem.id, itemId))
      .limit(1);
    if (!item.length) {
      return res.status(404).json({ error: "Flashcard item not found" });
    }
    res.json(item[0]);
  } catch (error) {
    console.error("Error getting flashcard item:", error);
    res.status(500).json({ error: "Failed to get flashcard item" });
  }
});

// Create a new standalone flashcard item
app.post("/api/flashcards/items", async (req: Request, res: Response) => {
  try {
    const { front, back, kana, note, tags, difficulty, isFavorite } = req.body;
    if (!front || !back) {
      return res.status(400).json({ error: "front and back are required" });
    }
    const itemId = generateId();
    const now = new Date();
    await db.insert(flashcardItem).values({
      id: itemId,
      front,
      back,
      kana: kana || null,
      note: note || null,
      tags: tags || [],
      difficulty: difficulty || null,
      isFavorite: isFavorite || false,
      createdAt: now,
      updatedAt: now,
    });
    const newItem = await db
      .select()
      .from(flashcardItem)
      .where(eq(flashcardItem.id, itemId))
      .limit(1);
    res.json(newItem[0]);
  } catch (error) {
    console.error("Error creating flashcard item:", error);
    res.status(500).json({ error: "Failed to create flashcard item" });
  }
});

// Update a standalone flashcard item
app.put("/api/flashcards/items/:itemId", async (req: Request, res: Response) => {
  try {
    const itemId = req.params.itemId;
    const { front, back, kana, note, tags, difficulty, isFavorite } = req.body;
    const updatedItem = await db
      .update(flashcardItem)
      .set({
        front,
        back,
        kana,
        note,
        tags,
        difficulty,
        isFavorite,
        updatedAt: new Date(),
      })
      .where(eq(flashcardItem.id, itemId))
      .returning();
    if (!updatedItem.length) {
      return res.status(404).json({ error: "Flashcard item not found" });
    }
    res.json(updatedItem[0]);
  } catch (error) {
    console.error("Error updating flashcard item:", error);
    res.status(500).json({ error: "Failed to update flashcard item" });
  }
});

// Delete a standalone flashcard item
app.delete("/api/flashcards/items/:itemId", async (req: Request, res: Response) => {
  try {
    const itemId = req.params.itemId;
    const deletedItem = await db
      .delete(flashcardItem)
      .where(eq(flashcardItem.id, itemId))
      .returning();
    if (!deletedItem.length) {
      return res.status(404).json({ error: "Flashcard item not found" });
    }
    res.json(deletedItem[0]);
  } catch (error) {
    console.error("Error deleting flashcard item:", error);
    res.status(500).json({ error: "Failed to delete flashcard item" });
  }
});

// Get all decks for a user
app.get("/api/flashcards/decks", async (req: Request, res: Response) => {
  try {
    const userId = (req.query.userId as string) || "default-user";
    const decks = await db
      .select()
      .from(flashcardDeck)
      .where(eq(flashcardDeck.userId, userId))
      .orderBy(desc(flashcardDeck.createdAt));
    res.json(decks);
  } catch (error) {
    console.error("Error getting decks:", error);
    res.status(500).json({ error: "Failed to get decks" });
  }
});

// Get a specific deck with its items
app.get("/api/flashcards/decks/:deckId", async (req: Request, res: Response) => {
  try {
    const deckId = req.params.deckId;
    const deck = await db
      .select()
      .from(flashcardDeck)
      .where(eq(flashcardDeck.id, deckId))
      .limit(1);
    if (!deck.length) {
      return res.status(404).json({ error: "Deck not found" });
    }
    const items = await db
      .select()
      .from(deckItem)
      .where(eq(deckItem.deckId, deckId))
      .orderBy(asc(deckItem.createdAt));
    res.json({ ...deck[0], items });
  } catch (error) {
    console.error("Error getting deck:", error);
    res.status(500).json({ error: "Failed to get deck" });
  }
});

// Create a new deck
app.post("/api/flashcards/decks", async (req: Request, res: Response) => {
  try {
    const { userId, name, description, sourceType, sourceId, vocabularyListId } = req.body;
    if (!name) {
      return res.status(400).json({ error: "name is required" });
    }
    // Use default user for single-user mode if not provided
    const effectiveUserId = userId || "default-user";
    const deckId = generateId();
    const now = new Date();
    await db.insert(flashcardDeck).values({
      id: deckId,
      userId: effectiveUserId,
      name,
      description: description || null,
      sourceType,
      sourceId,
      vocabularyListId,
      createdAt: now,
      updatedAt: now,
    });
    const newDeck = await db
      .select()
      .from(flashcardDeck)
      .where(eq(flashcardDeck.id, deckId))
      .limit(1);
    res.json(newDeck[0]);
  } catch (error) {
    console.error("Error creating deck:", error);
    res.status(500).json({ error: "Failed to create deck" });
  }
});

// Update a deck
app.put("/api/flashcards/decks/:deckId", async (req: Request, res: Response) => {
  try {
    const deckId = req.params.deckId;
    const { name, description } = req.body;
    const updatedDeck = await db
      .update(flashcardDeck)
      .set({ name, description, updatedAt: new Date() })
      .where(eq(flashcardDeck.id, deckId))
      .returning();
    if (!updatedDeck.length) {
      return res.status(404).json({ error: "Deck not found" });
    }
    res.json(updatedDeck[0]);
  } catch (error) {
    console.error("Error updating deck:", error);
    res.status(500).json({ error: "Failed to update deck" });
  }
});

// Delete a deck
app.delete("/api/flashcards/decks/:deckId", async (req: Request, res: Response) => {
  try {
    const deckId = req.params.deckId;
    await db.delete(deckItem).where(eq(deckItem.deckId, deckId));
    const deletedDeck = await db
      .delete(flashcardDeck)
      .where(eq(flashcardDeck.id, deckId))
      .returning();
    if (!deletedDeck.length) {
      return res.status(404).json({ error: "Deck not found" });
    }
    res.json(deletedDeck[0]);
  } catch (error) {
    console.error("Error deleting deck:", error);
    res.status(500).json({ error: "Failed to delete deck" });
  }
});

// Add an item to a deck
app.post("/api/flashcards/decks/:deckId/items", async (req: Request, res: Response) => {
  try {
    const deckId = req.params.deckId;
    const { flashcardId, front, back, furigana, example, exampleFurigana, exampleTranslation, level, type, tags, note, order } = req.body;
    
    // Support both flashcardId (reference existing flashcard) and direct front/back
    let itemData: any;
    
    if (flashcardId) {
      // Look up existing flashcard and copy its data
      const existingFlashcard = await db
        .select()
        .from(flashcardItem)
        .where(eq(flashcardItem.id, flashcardId))
        .limit(1);
      if (!existingFlashcard.length) {
        return res.status(404).json({ error: "Flashcard not found" });
      }
      itemData = { ...existingFlashcard[0] };
    } else if (front && back) {
      // Use direct front/back data
      itemData = { front, back, furigana, example, exampleFurigana, exampleTranslation, level, type, tags };
    } else {
      return res.status(400).json({ error: "Either flashcardId or front+back are required" });
    }
    
    const itemId = generateId();
    const now = new Date();
    await db.insert(deckItem).values({
      id: itemId,
      deckId,
      front: itemData.front,
      back: itemData.back,
      furigana: itemData.furigana || null,
      example: itemData.example || null,
      exampleFurigana: itemData.exampleFurigana || null,
      exampleTranslation: itemData.exampleTranslation || null,
      level: itemData.level || 1,
      type: itemData.type || "vocabulary",
      tags: itemData.tags || [],
      note: note || null,
      displayOrder: order || 0,
      createdAt: now,
      updatedAt: now,
    });
    const newItem = await db
      .select()
      .from(deckItem)
      .where(eq(deckItem.id, itemId))
      .limit(1);
    res.json(newItem[0]);
  } catch (error) {
    console.error("Error adding item to deck:", error);
    res.status(500).json({ error: "Failed to add item to deck" });
  }
});

// Update an item in a deck
app.put("/api/flashcards/items/:itemId", async (req: Request, res: Response) => {
  try {
    const itemId = req.params.itemId;
    const { front, back, furigana, example, exampleFurigana, exampleTranslation, level, type, tags, lastReviewedAt, reviewCount, correctness } = req.body;
    const updatedItem = await db
      .update(deckItem)
      .set({
        front,
        back,
        furigana,
        example,
        exampleFurigana,
        exampleTranslation,
        level,
        type,
        tags,
        lastReviewedAt,
        reviewCount,
        correctness,
        updatedAt: new Date(),
      })
      .where(eq(deckItem.id, itemId))
      .returning();
    if (!updatedItem.length) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(updatedItem[0]);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Failed to update item" });
  }
});

// Delete an item from a deck
app.delete("/api/flashcards/items/:itemId", async (req: Request, res: Response) => {
  try {
    const itemId = req.params.itemId;
    const deletedItem = await db
      .delete(deckItem)
      .where(eq(deckItem.id, itemId))
      .returning();
    if (!deletedItem.length) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(deletedItem[0]);
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Failed to delete item" });
  }
});

// Get flashcards for a specific unit
app.get("/api/flashcards/unit/:unitId", async (req: Request, res: Response) => {
  try {
    const unitId = req.params.unitId;
    const items = await db
      .select()
      .from(deckItem)
      .where(eq(deckItem.unitId, unitId))
      .orderBy(asc(deckItem.createdAt));
    res.json(items);
  } catch (error) {
    console.error("Error getting flashcards for unit:", error);
    res.status(500).json({ error: "Failed to get flashcards for unit" });
  }
});

// Create flashcards from vocabulary for a unit
app.post("/api/flashcards/from-vocabulary/:unitId", async (req: Request, res: Response) => {
  try {
    const unitId = req.params.unitId;
    const { deckName, userId } = req.body;
    const effectiveUserId = userId || "default-user";
    const vocabularyItems = await db
      .select()
      .from(vocabularyItem)
      .where(eq(vocabularyItem.unitId, unitId))
      .orderBy(asc(vocabularyItem.displayOrder));
    const deckId = generateId();
    const now = new Date();
    await db.insert(flashcardDeck).values({
      id: deckId,
      userId: effectiveUserId,
      name: deckName || `Unit ${unitId} Flashcards`,
      sourceType: "unit",
      sourceId: unitId,
      createdAt: now,
      updatedAt: now,
    });
    const flashcardItems = vocabularyItems.map((item) => ({
      id: generateId(),
      deckId,
      front: item.word,
      back: item.meaning,
      furigana: item.furigana,
      example: item.example,
      exampleFurigana: item.exampleFurigana,
      exampleTranslation: item.exampleTranslation,
      level: 1,
      type: "vocabulary" as const,
      unitId,
      tags: ["vocabulary", `unit-${unitId}`],
      createdAt: now,
      updatedAt: now,
    }));
    await db.insert(deckItem).values(flashcardItems);
    const newDeck = await db
      .select()
      .from(flashcardDeck)
      .where(eq(flashcardDeck.id, deckId))
      .limit(1);
    res.json({ deck: newDeck[0], items: flashcardItems });
  } catch (error) {
    console.error("Error creating flashcards from vocabulary:", error);
    res.status(500).json({ error: "Failed to create flashcards from vocabulary" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📝 API available at http://localhost:${PORT}/api`);
  console.log(`💡 Tip: Run database migration with: npm run db:migrate && npm run db:seed`);
});

