import React from 'react';
import { TodoApp } from './Components/TodoApp/TodoApp';
import { todos } from './api/todos';

export const App = () => (
  <TodoApp todosList={todos} />
);
