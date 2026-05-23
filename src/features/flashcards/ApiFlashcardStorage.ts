import type { IFlashcardStorage } from './IFlashcardStorage';
import type {
  FlashcardItem,
  FlashcardDeck,
  DeckItem,
  CreateFlashcardDto,
  UpdateFlashcardDto,
  CreateDeckDto,
  UpdateDeckDto,
  FlashcardExport,
} from './flashcard';

// API endpoint base URL
// @ts-ignore - import.meta.env is a Vite feature
const API_BASE = import.meta.env?.VITE_API_BASE || 'http://localhost:3001/api';

/**
 * API-based Flashcard Storage
 * Implements IFlashcardStorage using REST API calls to PostgreSQL backend
 */
export class ApiFlashcardStorage implements IFlashcardStorage {
  /**
   * Helper to make API requests with timeout
   */
  private async request<T>(method: string, path: string, body?: any, timeoutMs: number = 5000): Promise<T> {
    const url = `${API_BASE}${path}`;
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      options.signal = controller.signal;
      const response = await fetch(url, options);

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // ============ Flashcard Item Operations ============

  async getAllFlashcards(): Promise<FlashcardItem[]> {
    return this.request<FlashcardItem[]>('GET', '/flashcards/items');
  }

  async getFlashcardById(id: string): Promise<FlashcardItem | null> {
    try {
      return this.request<FlashcardItem>('GET', `/flashcards/items/${id}`);
    } catch (error) {
      if ((error as Error).message.includes('404')) {
        return null;
      }
      throw error;
    }
  }

  async createFlashcard(data: CreateFlashcardDto): Promise<FlashcardItem> {
    return this.request<FlashcardItem>('POST', '/flashcards/items', data);
  }

  async updateFlashcard(id: string, data: UpdateFlashcardDto): Promise<FlashcardItem> {
    return this.request<FlashcardItem>('PUT', `/flashcards/items/${id}`, data);
  }

  async deleteFlashcard(id: string): Promise<void> {
    await this.request('DELETE', `/flashcards/items/${id}`);
  }

  async deleteMultipleFlashcards(ids: string[]): Promise<void> {
    await this.request('POST', '/flashcards/items/delete-multiple', { ids });
  }

  // ============ Deck Operations ============

  async getAllDecks(): Promise<FlashcardDeck[]> {
    return this.request<FlashcardDeck[]>('GET', '/flashcards/decks');
  }

  async getDeckById(id: string): Promise<FlashcardDeck | null> {
    try {
      return this.request<FlashcardDeck>('GET', `/flashcards/decks/${id}`);
    } catch (error) {
      if ((error as Error).message.includes('404')) {
        return null;
      }
      throw error;
    }
  }

  async createDeck(data: CreateDeckDto): Promise<FlashcardDeck> {
    return this.request<FlashcardDeck>('POST', '/flashcards/decks', data);
  }

  async updateDeck(id: string, data: UpdateDeckDto): Promise<FlashcardDeck> {
    return this.request<FlashcardDeck>('PUT', `/flashcards/decks/${id}`, data);
  }

  async deleteDeck(id: string, deleteCards?: boolean): Promise<void> {
    await this.request('DELETE', `/flashcards/decks/${id}`, { deleteCards });
  }

  // ============ Deck Item Operations ============

  async addToDeck(deckId: string, flashcardId: string, note?: string, order?: number): Promise<DeckItem> {
    return this.request<DeckItem>('POST', `/flashcards/decks/${deckId}/items`, {
      flashcardId,
      note,
      order,
    });
  }

  async removeFromDeck(deckItemId: string): Promise<void> {
    await this.request('DELETE', `/flashcards/items/${deckItemId}`);
  }

  async getFlashcardsInDeck(deckId: string): Promise<FlashcardItem[]> {
    return this.request<FlashcardItem[]>('GET', `/flashcards/decks/${deckId}/flashcards`);
  }

  async getDeckItems(deckId: string): Promise<DeckItem[]> {
    return this.request<DeckItem[]>('GET', `/flashcards/decks/${deckId}/items`);
  }

  async isInDeck(deckId: string, flashcardId: string): Promise<boolean> {
    return this.request<boolean>('GET', `/flashcards/decks/${deckId}/items/${flashcardId}/check`);
  }

  async updateDeckItemOrder(deckItemId: string, newOrder: number): Promise<void> {
    await this.request('PUT', `/flashcards/items/${deckItemId}/order`, { order: newOrder });
  }

  async reorderDeckItems(deckId: string, itemIds: string[]): Promise<void> {
    await this.request('POST', `/flashcards/decks/${deckId}/items/reorder`, { itemIds });
  }

  // ============ Search & Filter Operations ============

  async searchFlashcards(query: string): Promise<FlashcardItem[]> {
    return this.request<FlashcardItem[]>('GET', `/flashcards/items/search?q=${encodeURIComponent(query)}`);
  }

  async getFlashcardsByTag(tag: string): Promise<FlashcardItem[]> {
    return this.request<FlashcardItem[]>('GET', `/flashcards/items/tag/${encodeURIComponent(tag)}`);
  }

  async getFlashcardsByDifficulty(difficulty: number): Promise<FlashcardItem[]> {
    return this.request<FlashcardItem[]>('GET', `/flashcards/items/difficulty/${difficulty}`);
  }

  async getFavoriteFlashcards(): Promise<FlashcardItem[]> {
    return this.request<FlashcardItem[]>('GET', '/flashcards/items/favorites');
  }

  // ============ Import/Export Operations ============

  async exportAll(): Promise<FlashcardExport> {
    return this.request<FlashcardExport>('GET', '/flashcards/export');
  }

  async exportDeck(deckId: string): Promise<FlashcardExport> {
    return this.request<FlashcardExport>('GET', `/flashcards/decks/${deckId}/export`);
  }

  async import(data: FlashcardExport): Promise<void> {
    await this.request('POST', '/flashcards/import', data);
  }

  async importDeck(data: FlashcardExport): Promise<string> {
    const result = await this.request<{ deckId: string }>('POST', '/flashcards/decks/import', data);
    return result.deckId;
  }

  // ============ Utility Operations ============

  async getStats(): Promise<{ totalCards: number; totalDecks: number; favoriteCards: number }> {
    return this.request<{ totalCards: number; totalDecks: number; favoriteCards: number }>('GET', '/flashcards/stats');
  }

  async clear(): Promise<void> {
    await this.request('DELETE', '/flashcards/clear');
  }

  // ============ Static Methods ============

  /**
   * Check if the API is available
   */
  static async isSupported(): Promise<boolean> {
    try {
      // Try to make a simple request to check API availability
      const response = await fetch(`${API_BASE}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Singleton instance
export const apiFlashcardStorage = new ApiFlashcardStorage();
