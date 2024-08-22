import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';
import { Filter } from '../types/Filter';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  activeTodos: Todo[];
};

export const Footer: React.FC<Props> = ({ activeTodos }) => {
  const { todos, setTodos, filter, setFilter } = useContext(TodosContext);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(filterValue => (
          <a
            key={filterValue}
            href={`#/${filterValue}`}
            className={classNames('filter__link', {
              selected: filter === filterValue,
            })}
            data-cy={`FilterLink${filterValue}`}
            onClick={() => setFilter(filterValue)}
          >
            {filterValue}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={activeTodos.length === todos.length}
        onClick={() => setTodos(activeTodos)}
      >
        Clear completed
      </button>
    </footer>
  );
};
