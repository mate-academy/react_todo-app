/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { StateContex } from './Store';

export const App: React.FC = () => {
  const { todos } = useContext(StateContex);

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
