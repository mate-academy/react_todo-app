/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { TodoContext } from './components/SetTodosContext';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    return null;
  }

  const { todos } = todoContext;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header inputRef={inputRef} />

        <TodoList />

        {todos.length > 0 && <Footer todos={todos} />}
      </div>
    </div>
  );
};
