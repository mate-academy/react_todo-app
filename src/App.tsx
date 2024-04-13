/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef } from 'react';
import { Todos } from './Todos/Todos';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { DispatchContext, StateContext } from './Store/Store';
import { Todo } from './types/Todo';

const getTodosFromLocalStorage: Todo[] = JSON.parse(
  localStorage.getItem('todos') || '[]',
);

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (todos.length === 0) {
      dispatch({ type: 'setTodos', tod: getTodosFromLocalStorage });
    }
  }, []);

  const temper = useRef(true);

  useEffect(() => {
    if (temper.current) {
      temper.current = false;

      return;
    }

    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        <Todos />
        <Footer />
      </div>
    </div>
  );
};
