import { Todo } from '../types/Todo';

/* eslint-disable @typescript-eslint/no-explicit-any */
const STORAGE_KEY = 'todos';

function loadFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
}

function saveToStorage(data: Todo | Todo[]) {
  if (Array.isArray(data)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } else {
    const todos = loadFromStorage();
    const updatedData = [...todos, data];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  }
}

function generateId() {
  return +new Date();
}

export const client = {
  get: (): Todo[] => {
    const data = loadFromStorage();

    return data as Todo[];
  },

  post: (newItem: Todo | []): Todo => {
    if (Array.isArray(newItem) && newItem.length === 0) {
      saveToStorage([]);

      return {} as Todo;
    }

    if (!Array.isArray(newItem)) {
      const itemWithId = { ...newItem, id: generateId() };

      saveToStorage(itemWithId);

      return itemWithId as Todo;
    }

    throw new Error('Invalid data passed to post');
  },

  patch: (changedId: number, changes: any): Todo => {
    if (!changedId) {
      throw new Error('ID is required for PATCH');
    }

    const data: Todo[] = loadFromStorage();
    const updated = data.map(item =>
      item.id === changedId ? { ...item, ...changes } : item,
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    const updatedItem = updated.find(item => item.id === changedId);

    return updatedItem as Todo;
  },

  delete: (url: string): void => {
    const id = url.split('/').pop();

    if (!id) {
      throw new Error('ID is required in URL for DELETE');
    }

    const data: Todo[] = loadFromStorage();
    const updated = data.filter(item => item.id !== +id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
};
