import React from 'react';
import { Todo } from './Todo';

export interface TodoContext {
  todos: Todo[];
  addTodo: (todo: Todo, event: React.FormEvent<HTMLFormElement>) => void;
  setCompleted: (todoID: number) => void;
  setAllCompletedOrRemoveCompleted: (todos: Todo[]) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredTodosForList: Todo[];
  deleteCompletedTodos: () => void;
  deleteTodo: (id: number) => void;
  saveEditingTitle: (todoId: number, todoNewTitle: string) => void;
}
