/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useState } from 'react';
import { Filter } from './types/Filter';
import { getVisibleTodos } from './utils/getVisibleTodos';
import { Header } from './components/Header';
import { TodoItem } from './components/TodoItem';
import { Footer } from './components/Footer';
import { useTodos } from './hooks/useTodos';

export const App: React.FC = () => {
  const { todos } = useTodos();

  const [filter, setFilter] = useState<Filter>(Filter.All);
  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, filter),
    [todos, filter],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </section>

        {!!todos.length && (
          <Footer filter={filter} onFilterChange={setFilter} />
        )}
      </div>
    </div>
  );
};
