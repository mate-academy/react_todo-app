/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { useDispatch, useStore } from './store';
import { INIT } from './utils/actionTypes';

export const App: React.FC = () => {
  const { todos } = useStore();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: INIT });
  }, []);

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
