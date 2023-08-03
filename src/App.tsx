/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoApp } from './components/todo_app/TodoApp';
import { TodoList } from './components/todo_lilst/TodoList';
import { TodosProvider } from './providers/TodosContext';
import { TodosFilter } from './components/todo_filter/TodosFilter';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <div className="todoapp">
        <TodoApp />
        <TodoList />
        <TodosFilter />
      </div>
    </TodosProvider>
  );
};
