/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';
import { TODOS_KEY } from './utils/localStorage';
import { useTodosContext } from './context/useTodosContext';

export const App: React.FC = () => {
  const { state } = useTodosContext();
  const { todos } = state;

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  }, [todos]);

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
