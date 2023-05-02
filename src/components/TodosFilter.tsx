import React, { useMemo } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { filters } from '../constants';
import { Todo } from '../types/todo';

type Props = {
  todos: Todo[];
  setTodos: (value: Todo[]) => void;
};

export const TodosFilter: React.FC<Props> = ({ todos, setTodos }) => {
  const activeTodos = useMemo(() => (
    todos.filter(todo => !todo.completed)
  ), [todos]);

  const hasCompletedTodos = todos.length !== activeTodos.length;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        {filters.map(filter => (
          <li key={filter.name}>
            <NavLink
              to={filter.link}
              className={({ isActive }) => classNames({ selected: isActive })}
            >
              {filter.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {hasCompletedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => setTodos(activeTodos)}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
