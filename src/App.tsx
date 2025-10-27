/* eslint no-console: ["error", { allow: ["warn", "log"] }] */

import React from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { TodoProvider } from './context/TodoContext';

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <TodoProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header />
          <TodoList />
          <Footer />
        </div>
      </div>
    </TodoProvider>
  );
};
