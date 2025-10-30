/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef } from 'react';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/Todolist';
import Footer from './components/Footer/Footer';
import { useGlobalState } from './GlobalProvider';

export const App: React.FC = () => {
  const { todos } = useGlobalState();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos.length])

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header inputRef={inputRef} />

        <TodoList />

        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
