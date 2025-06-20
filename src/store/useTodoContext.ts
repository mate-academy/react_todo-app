/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from 'react';
import { Todo } from '../types/todo/Todo';
import { StatusFilter } from '../enums/statusFilter';

const emptyFunction = () => {};

type TodoContextType = {
  todos: Todo[];
  isThereAlLeastOneTodo: boolean;
  isAllTodosCompleted: boolean;
  onAddTodo: (todoTitle: string) => void;
  onTodoDelete: (todoId: Todo['id']) => void;
  onClearCompletedTodos: () => void;
  onTodoUpdate: (todoId: Todo['id'], todoDataToUpdate: Partial<Todo>) => void;
  onToggleTodos: () => void;
  statusFilter: StatusFilter;
  setStatusFilter: (statusFilter: StatusFilter) => void;
  filteredTodos: Todo[];
  activeTodosCount: number;
  isThereAtLeastOneCompletedTodo: boolean;
};

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  isThereAlLeastOneTodo: false,
  isAllTodosCompleted: false,
  onAddTodo: emptyFunction,
  onTodoDelete: emptyFunction,
  onClearCompletedTodos: emptyFunction,
  onTodoUpdate: emptyFunction,
  onToggleTodos: emptyFunction,
  statusFilter: StatusFilter.All,
  setStatusFilter: emptyFunction,
  filteredTodos: [],
  activeTodosCount: 0,
  isThereAtLeastOneCompletedTodo: false,
});

export const useTodoContext = () => useContext(TodoContext);
