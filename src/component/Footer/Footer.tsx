import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoFilter } from '../../types/TodoFilter';

interface FooterProps {
  todos: Todo[]
  filteredBy: string;
  setFilteredBy: (option: TodoFilter) => void;
  deleteCompletedTodo: () => void,
}
export const Footer: React.FC<FooterProps> = ({
  todos,
  filteredBy,
  setFilteredBy,
  deleteCompletedTodo,
}) => {
  const todoCount = todos.filter((todo) => !todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todoCount} ${todoCount === 1
          ? 'item'
          : 'items'
        } left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filteredBy === TodoFilter.ALL },
          )}
          onClick={() => setFilteredBy(TodoFilter.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filteredBy === TodoFilter.ACTIVE },
          )}
          onClick={() => setFilteredBy(TodoFilter.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filteredBy === TodoFilter.COMPLETED },
          )}
          onClick={() => setFilteredBy(TodoFilter.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {todos.some((todo) => todo.completed) && (
        <button
          type="button"
          className="todoapp__clear-completed"
          onClick={deleteCompletedTodo}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
