/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { useTodos } from './Context/TodoContext';

export const App: React.FC = () => {
  const { state } = useTodos();

  const hasTodos = state.todos.length > 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList />
        {hasTodos && <Footer />}
      </div>
    </div>
  );
};
