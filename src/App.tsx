/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useState } from 'react';
import cn from 'classnames';
import { useTodos } from './context/TodosContext';
import { Filter } from './types/Filter';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const { todos, toggleAll } = useTodos();
  const [filter, setFilter] = useState(Filter.All);

  const areAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;

      case Filter.Completed:
        return todo.completed;

      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: areAllCompleted,
              })}
              data-cy="ToggleAllButton"
              onClick={toggleAll}
            />
          )}

          <NewTodo />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer filter={filter} onFilterChange={setFilter} />
          </>
        )}
      </div>
    </div>
  );
};
