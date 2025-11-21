// Storage interface for backend
// Note: This todo app uses frontend LocalStorage, so no backend storage is needed

export interface IStorage {
  // Add backend storage methods here if needed
}

export class MemStorage implements IStorage {
  constructor() {
    // Initialize storage here if needed
  }
}

export const storage = new MemStorage();
