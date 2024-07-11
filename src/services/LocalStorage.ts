type StorageVariant = 'local' | 'session';
type StorageKey = 'todos';

class Storage {
  private storage;

  constructor(variant: StorageVariant) {
    this.storage = variant === 'local' ? localStorage : sessionStorage;
  }

  getItem = <TData>(key: StorageKey): TData | null => {
    const item = this.storage.getItem(key);

    if (!item) {
      return null;
    }

    const result = JSON.parse(item) as TData;

    return result;
  };

  setItem = (key: StorageKey, value: unknown) => {
    const stringified = JSON.stringify(value);

    return this.storage.setItem(key, stringified);
  };

  removeItem = (key: StorageKey) => {
    this.storage.removeItem(key);
  };
}

export const LocalStorage = new Storage('local');
export const SessionStorage = new Storage('session');
