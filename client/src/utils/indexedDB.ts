import { openDB, IDBPDatabase } from 'idb';
import { CartItem } from '../context/CartContext';

// IndexedDB Utils as a backend backup database

// NOTE: This database is used as the standalone one for when users are not authenticated but want to save items to the cart. - To be used for guests.
const DB_NAME = 'QueenzTreatsDB';
const STORE_NAME = 'cart';
const DB_VERSION = 1;

export class CartStorage {
  private db: IDBPDatabase | null = null;

  async init() {
    this.db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      },
    });
  }

  async getAll(): Promise<CartItem[]> {
    if (!this.db) await this.init();
    return await this.db!.getAll(STORE_NAME);
  }

  async add(item: CartItem): Promise<void> {
    if (!this.db) await this.init();
    await this.db!.put(STORE_NAME, item);
  }

  async remove(id: string): Promise<void> {
    if (!this.db) await this.init();
    await this.db!.delete(STORE_NAME, id);
  }

  async clear(): Promise<void> {
    if (!this.db) await this.init();
    await this.db!.clear(STORE_NAME);
  }
}