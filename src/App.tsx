/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useMemo, useState } from 'react';

import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Todo, IsActiveTab } from './types';
import { TodosContext } from './Store';

function filterTodos(todos: Todo[], activeTab: string) {
  return todos.filter((todo: Todo) => {
    if (activeTab === IsActiveTab.Active) {
      return !todo.completed;
    }

    if (activeTab === IsActiveTab.Completed) {
      return todo.completed;
    }

    return todo;
  });
}

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const [isActive, setIsActiveTab] = useState(IsActiveTab.All);

  const visibleTodos = useMemo(
    () => filterTodos(todos, isActive),
    [todos, isActive],
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
