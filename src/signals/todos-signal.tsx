import { effect, signal } from '@preact/signals-react';
import {
  getTodosFromLocalStorage,
  setTodosToLocalStorage,
} from '../local-storage';
import { Todo } from '../types';

export const todos = signal<Todo[]>(getTodosFromLocalStorage());

effect(() => {
  if (todos.value) {
    setTodosToLocalStorage(todos.value);
  }
});
