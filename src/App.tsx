/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef } from 'react';
import './styles/filter.scss';
import './styles/todo.scss';
import './styles/todoapp.scss';
import 'classnames';

import { Header } from './components/Header';
import { ToDoList } from './components/ToDoList';
import { Dispatch, StateContext, ToDoProvider } from './components/ToDoContext';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const todosFromLocaleStorage: Todo[] = JSON.parse(
    localStorage.getItem('todos') || '[]',
  );

  const { todos } = useContext(StateContext);
  const dispatch = useContext(Dispatch);

  useEffect(() => {
    if (todos.length === 0) {
      dispatch({
        type: 'GET TODOS FROM STORAGE',
        todos: todosFromLocaleStorage,
      });
    }
  });

  const ref = useRef(true);

  useEffect(() => {
    if (ref.current) {
      ref.current = false;

      return;
    }

    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <ToDoProvider>
          <Header />
          <ToDoList />
          <Footer />
        </ToDoProvider>
      </div>
    </div>
  );
};
