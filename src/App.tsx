/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { TodosFilter } from './components/TodosFilter';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodoApp>
        <Header />
        <Main />
        <TodosFilter />
      </TodoApp>
    </div>
  );
};
