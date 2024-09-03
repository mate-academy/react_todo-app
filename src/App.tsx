/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { TodosStateContext } from './providers/TodosProvider';

export const App: React.FC = () => {
  const { state } = useContext(TodosStateContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList />
        {!!state?.todos.length && <Footer />}
      </div>
    </div>
  );
};
