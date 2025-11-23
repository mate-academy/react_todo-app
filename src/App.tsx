/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useState } from 'react';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';
import { TodoStatus } from './types/TodoStatus';
import { filterTodos } from './helpers/filterTodos';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export const App: React.FC = () => {
  const [filter, setFilter] = useState(TodoStatus.ALL);

  const todos = useTodos();

  const preparedTodos = useMemo(
    () => filterTodos(todos, { filter }),
    [todos, filter],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length !== 0 && (
          <>
            <TodoList todos={preparedTodos} />

            <Footer status={filter} onChangeStatus={setFilter} />
          </>
        )}
      </div>
    </div>
  );
};
