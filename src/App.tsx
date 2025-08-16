/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { TodoList } from './Components/TodoList';
import { Notifications } from './Components/Notifications';
import { TodoProvider } from './TodoContext';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header />

          <TodoList />

          <Footer />
        </div>

        <Notifications />
      </div>
    </TodoProvider>
  );
};
