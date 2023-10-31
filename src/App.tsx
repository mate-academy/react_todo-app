import React from 'react';
import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { TodosProvider } from './components/TodosContext';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosProvider>
        <TodoApp />

        <TodoList />

        <TodosFilter />
      </TodosProvider>
    </div>
  );
};
