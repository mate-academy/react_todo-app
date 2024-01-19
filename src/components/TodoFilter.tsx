/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { TodosContext } from './Store';
import { FilterParams } from '../types/filterParams';
import { getFilteredTodos } from '../services/getFilteredTodos';

export const TodoFilter: React.FC = () => {
  const {
    todos,
    setTodos,
    setFilteredTodos,
  } = useContext(TodosContext);

  const [filter, setFilter] = useState(FilterParams.All);

  const filteredTodos = getFilteredTodos(todos, filter);

  let itemsLeft = todos.filter(todo => todo.complete === false).length;
  let hasCompletedItems = todos.some(todo => todo.complete === true);

  const handleClearCompleted = () => {
    const clearCompleted = todos.filter(todo => todo.complete === false);

    setTodos(clearCompleted);
  };

  useEffect(() => {
    setFilteredTodos(filteredTodos);
  }, [filter, todos]);

  useEffect(() => {
    itemsLeft = todos.filter(todo => todo.complete === false).length;
    hasCompletedItems = todos.some(todo => todo.complete === true);
  }, [todos]);

  return (
    <>
      <span className="todo-count" data-cy="todosCounter">
        {`${itemsLeft} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={cn({ selected: filter === FilterParams.All })}
            onClick={() => setFilter(FilterParams.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({ selected: filter === FilterParams.Active })}
            onClick={() => setFilter(FilterParams.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({ selected: filter === FilterParams.Completed })}
            onClick={() => setFilter(FilterParams.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {hasCompletedItems && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </>
  );
};
