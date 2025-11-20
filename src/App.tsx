/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { TodosProvider } from './context/TodosProvider';

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
