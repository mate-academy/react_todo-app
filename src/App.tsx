/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useMemo, useState } from 'react';
import { StateContext } from './GlobalProvider';
import { Filter } from './types/Filter';
import { getVisibleTodos } from './utils/getVisibleTodos';
import { Header } from './components/Header';
import { TodoItem } from './components/TodoItem';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);

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
