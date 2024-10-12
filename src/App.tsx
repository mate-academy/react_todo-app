/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { TodosContext } from './components/TodoAppContext/TodoAppContext';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);

  // console.log(todos.length);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList />

        {todos.length !== 0 && <Footer />}
      </div>
    </div>
  );
};
