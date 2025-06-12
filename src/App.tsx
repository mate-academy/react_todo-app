/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect } from 'react';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { TodosContext } from './context/TodosContext';
import { getTodos } from './api/localStorageFunctions';

export const App: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  useEffect(() => {
    const storedTodos = getTodos();

    setTodos(storedTodos);
  }, [setTodos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />

        <TodoList />

        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
