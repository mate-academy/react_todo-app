/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { TodoProvider } from './Context/TodoContext';
import { Header } from './Components/Header/Header';
import { TodoList } from './Components/TodoList/TodoList';
import { Footer } from './Components/Footer/Footer';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoProvider>
          <Header />
          <TodoList />
          <Footer />
        </TodoProvider>
      </div>
    </div>
  );
};
