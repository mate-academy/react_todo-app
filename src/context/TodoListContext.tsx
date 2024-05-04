import { Filters } from '../types/Filters';
import { TodoListContextType } from '../types/TodoListContext';
import React from 'react';

// CONTEXT FOR TODOLIST
export const TodoListContext = React.createContext<TodoListContextType>({
  todoList: [],
  addTask: () => {},
  deleteTask: () => {},
  completeTask: () => {},
  editTask: () => {},
  clearCompletedTasks: () => {},
  completeAllTasks: () => {},
  uncompletedCount: 0,
  completedCount: 0,
  allCompletedTasks: false,
  currentFilter: Filters.All,
  setCurrentFilter: () => {},
  globalTodoList: [],
});
