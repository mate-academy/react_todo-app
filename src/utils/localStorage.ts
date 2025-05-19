/* eslint-disable no-console */

import { Todo } from '../types/types';

const STORAGE_KEY = 'todos';

export const storage = {
  load: (): Todo[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);

      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load todos from localStorage:', error);

      return [];
    }
  },

  save: (todos: Todo[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to localStorage:', error);
    }
  },
};
