import { computed, effect, signal } from '@preact/signals-react';
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

export const activeTodosCounter = computed<number>(() => {
  return todos.value.filter(todo => !todo.completed).length;
});
