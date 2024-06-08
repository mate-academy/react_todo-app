/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useMemo, useState } from 'react';

import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Todo } from './types';
import { TodosContext } from './Store';

function filterTodos(todos: Todo[], tabActive: boolean, tabCompleted: boolean) {
  return todos.filter((todo: Todo) => {
    if (tabActive) {
      return todo.completed === false;
    }

    if (tabCompleted) {
      return todo.completed === true;
    }

    return todo;
  });
}

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const [isActive, setIsActiveTab] = useState({
    all: true,
    active: false,
    completed: false,
  });

  const visibleTodos = useMemo(
    () => filterTodos(todos, isActive.active, isActive.completed),
    [todos, isActive.active, isActive.completed],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && <Main filteredTodos={visibleTodos} />}

        {todos.length > 0 && (
          <Footer isActive={isActive} setIsActiveTab={setIsActiveTab} />
        )}
      </div>
    </div>
  );
};
