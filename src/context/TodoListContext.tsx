import { TodoListContextType } from '../types/TodoListContext';
import React from 'react';

// CONTEXT FOR TODOLIST
export const TodoListContext = React.createContext<TodoListContextType>({
  todoList: [],
  addTask: () => {},
  deleteTask: () => {},
  completeTask: () => {},
  getFilter: () => {},
  editTask: () => {},
  clearCompletedTasks: () => {},
  completeAllTasks: () => {},
  uncompletedCount: 0,
  completedCount: 0,
  allCompletedTasks: false,
});
