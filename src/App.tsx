/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { TodoProvider } from './context/TodoContext';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodoProvider>
        <div className="todoapp__content">
          <Header />
          <TodoList />
          <Footer />
        </div>
      </TodoProvider>
    </div>
  );
};
