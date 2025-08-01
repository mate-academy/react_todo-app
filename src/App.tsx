/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { useTodosContext } from './hooks/useTodosContext';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const { todos } = useTodosContext();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList />

        {!!todos.length && <Footer />}
      </div>
    </div>
  );
};
