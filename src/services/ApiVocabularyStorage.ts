import { VocabularyItem, CreateVocabularyDto, UpdateVocabularyDto } from '../types/vocabulary';
import { IVocabularyStorage } from './IVocabularyStorage';

/**
 * API-based implementation of vocabulary storage
 * Uses REST API with backend database (MongoDB, PostgreSQL, etc.)
 * 
 * Pros:
 * - Scalable to millions of records
 * - Cross-device synchronization
 * - Persistent and secure
 * - Multi-user support
 * - Advanced features (search, analytics)
 * 
 * Cons:
 * - Requires backend infrastructure
 * - Network latency
 * - More complex setup
 * - Requires authentication/authorization
 * 
 * API Endpoints (expected):
 * GET    /api/vocabulary       - Get all items
 * GET    /api/vocabulary/:id   - Get single item
 * POST   /api/vocabulary       - Create new item
 * PUT    /api/vocabulary/:id   - Update item
 * DELETE /api/vocabulary/:id   - Delete item
 */
export class ApiVocabularyStorage implements IVocabularyStorage {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor(baseUrl: string = '/api', authToken?: string) {
    this.baseUrl = baseUrl;
    this.headers = {
      'Content-Type': 'application/json',
      ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
    };
  }

  /**
   * Handle API response errors
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }
    return response.json();
  }

  async getAll(): Promise<VocabularyItem[]> {
    const response = await fetch(`${this.baseUrl}/vocabulary`, {
      method: 'GET',
      headers: this.headers,
    });
    return this.handleResponse<VocabularyItem[]>(response);
  }

  async getById(id: string): Promise<VocabularyItem | null> {
    try {
      const response = await fetch(`${this.baseUrl}/vocabulary/${id}`, {
        method: 'GET',
        headers: this.headers,
      });
      return await this.handleResponse<VocabularyItem>(response);
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return null;
      }
      throw error;
    }
  }

  async create(data: CreateVocabularyDto): Promise<VocabularyItem> {
    const response = await fetch(`${this.baseUrl}/vocabulary`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return this.handleResponse<VocabularyItem>(response);
  }

  async update(id: string, data: UpdateVocabularyDto): Promise<VocabularyItem> {
    const response = await fetch(`${this.baseUrl}/vocabulary/${id}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return this.handleResponse<VocabularyItem>(response);
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/vocabulary/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    });
    await this.handleResponse<void>(response);
  }

  async clear(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/vocabulary`, {
      method: 'DELETE',
      headers: this.headers,
    });
    await this.handleResponse<void>(response);
  }
}

/**
 * Example backend implementation (Node.js + Express + MongoDB)
 * 
 * ```typescript
 * import express from 'express';
 * import { MongoClient, ObjectId } from 'mongodb';
 * 
 * const app = express();
 * app.use(express.json());
 * 
 * const client = new MongoClient(process.env.MONGODB_URI);
 * const db = client.db('nihongo_learning');
 * const vocabulary = db.collection('vocabulary');
 * 
 * // GET all
 * app.get('/api/vocabulary', async (req, res) => {
 *   const items = await vocabulary.find().toArray();
 *   res.json(items);
 * });
 * 
 * // POST create
 * app.post('/api/vocabulary', async (req, res) => {
 *   const item = {
 *     ...req.body,
 *     createdAt: Date.now(),
 *     updatedAt: Date.now(),
 *   };
 *   const result = await vocabulary.insertOne(item);
 *   res.status(201).json({ ...item, id: result.insertedId });
 * });
 * 
 * // PUT update
 * app.put('/api/vocabulary/:id', async (req, res) => {
 *   const { id } = req.params;
 *   const update = { ...req.body, updatedAt: Date.now() };
 *   const result = await vocabulary.findOneAndUpdate(
 *     { _id: new ObjectId(id) },
 *     { $set: update },
 *     { returnDocument: 'after' }
 *   );
 *   res.json(result.value);
 * });
 * 
 * // DELETE
 * app.delete('/api/vocabulary/:id', async (req, res) => {
 *   await vocabulary.deleteOne({ _id: new ObjectId(req.params.id) });
 *   res.status(204).send();
 * });
 * 
 * app.listen(3000);
 * ```
 */
