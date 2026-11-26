/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { useTodosContext } from './context/TodoContext';

export const App: React.FC = () => {
  const { todos } = useTodosContext();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
