export interface Storage {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  clear(): void;
  readonly length: number;
  key(index: number): string | null;
}

type StorageKey = string;
type StorageValue = string;

class StorageClient {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  public setItem(key: StorageKey, value: StorageValue): void {
    this.storage.setItem(key, value);
  }

  public getItem(key: StorageKey): StorageValue | null {
    return this.storage.getItem(key);
  }

  public removeItem(key: StorageKey): void {
    this.storage.removeItem(key);
  }

  public clear(): void {
    this.storage.clear();
  }
}

export const storageClient = new StorageClient();
