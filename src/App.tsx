/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useMemo, useState } from 'react';

import { Header } from './components/Header';
import { Main as TodoList } from './components/todoList';
import { Footer } from './components/Footer';
import { IsActiveTab } from './types';
import { TodosContext } from './Store';
import { filterTodos } from './utils/filterTodos';

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

        {todos.length > 0 && <TodoList filteredTodos={visibleTodos} />}

        {todos.length > 0 && (
          <Footer isActive={isActive} setIsActiveTab={setIsActiveTab} />
        )}
      </div>
    </div>
  );
};
