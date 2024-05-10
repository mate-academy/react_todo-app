/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';

import { Header } from './components/Header/Header';
import { TodoProvider } from './TodoContext';

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
