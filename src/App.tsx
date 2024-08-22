/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useMemo } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { TodosContext } from './context/TodosContext';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);

  const activeTodos = useMemo(() => {
    return todos.filter(({ completed }) => !completed);
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header activeTodos={activeTodos} />

        <TodoList />

        {!!todos.length && <Footer activeTodos={activeTodos} />}
      </div>
    </div>
  );
};
