/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { Footer } from './Footer';
import { TodosProvider } from './TodosContext';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodosProvider>
          <Header />
          <TodoList />
          <Footer />
        </TodosProvider>
      </div>
    </div>
  );
};
