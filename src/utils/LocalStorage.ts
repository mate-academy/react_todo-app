import { Todo } from '../types/Todo';

export const LocalStorage = {
  key: 'todos',
  get(): Todo[] {
    const data = localStorage.getItem(this.key);

    try {
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  set(todos: Todo[]) {
    try {
      localStorage.setItem(this.key, JSON.stringify(todos));

      return this.get;
    } catch {
      return [];
    }
  },

  clear() {
    localStorage.clear();
  },
};
