import { Todo } from '../types/Todo';

/* eslint-disable @typescript-eslint/no-explicit-any */
const STORAGE_KEY = 'todos';

// returns a promise resolved after a given delay
function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function loadFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
}

function saveToStorage(data: Todo | Todo[]) {
  if (Array.isArray(data)) {
    // полная перезапись
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
  get: async (): Promise<Todo[]> => {
    await wait(100);
    const data = loadFromStorage();

    return data as Todo[];
  },

  post: async (newItem: Todo | []): Promise<Todo> => {
    await wait(100);

    if (Array.isArray(newItem) && newItem.length === 0) {
      saveToStorage([]);

      return {} as Todo;
    }

    // сюда попадём только если передан объект Todo
    if (!Array.isArray(newItem)) {
      const itemWithId = { ...newItem, id: generateId() };

      saveToStorage(itemWithId);

      return itemWithId as Todo;
    }

    throw new Error('Invalid data passed to post');
  },

  patch: async (changedId: number, changes: any): Promise<Todo> => {
    await wait(100);

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

  delete: async (url: string): Promise<void> => {
    await wait(100);
    const id = url.split('/').pop();

    if (!id) {
      throw new Error('ID is required in URL for DELETE');
    }

    const data: Todo[] = loadFromStorage();
    const updated = data.filter(item => item.id !== +id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
};
