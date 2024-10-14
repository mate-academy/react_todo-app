/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList />
        <Footer />
      </div>
    </div>
  );
};
