/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { TodosFilter } from './components/TodosFilter/TodosFilter';
import { Header } from './components/TodoApp/Header';
import { TodoList } from './components/TodoList/TodoList';

import { TodosProvider } from './context/TodosContext';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosProvider>
        <Header />
        <TodoList />
        <TodosFilter />
      </TodosProvider>
    </div>
  );
};
