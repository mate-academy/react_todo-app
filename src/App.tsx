/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef } from 'react';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';
import { TODOS_KEY } from './utils/localStorage';
import { useTodosContext } from './context/useTodosContext';

export const App: React.FC = () => {
  const { state } = useTodosContext();
  const { todos } = state;

  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => inputRef.current?.focus();

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header inputRef={inputRef} focusInput={focusInput} />
        <TodoList focusInput={focusInput} />
        <Footer />
      </div>
    </div>
  );
};
