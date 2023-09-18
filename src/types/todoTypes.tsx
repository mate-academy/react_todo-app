/* eslint-disable */
import { ChangeEvent } from "react";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoItemProps = {
  todo: Todo;
};

export type TodoListProps = {
  todos: Todo[];
  toggleTodo: (id: number) => void;
};

export type TodosContextType = {
  todos: Todo[];
  title: string;
  completedTodos: Todo[];
  sortedTodos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  toggleAll: () => void;
  removeTodo: (id: number) => void;
  clearCompleted: () => void;
  editTodo: (id: number, newTitle: string) => void;
};

export enum FilterType {
  All = "all",
  Active = "active",
  Completed = "completed",
}

export type TodosFilterContextType = {
  currentFilter: FilterType;
  setCurrentFilter: (filter: FilterType) => void;
};
