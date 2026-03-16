/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../../contexts/TodoContext';
import {
  TODO_FILTER_STATUS,
  TodoFilterStatus,
} from '../../types/TodoFilterStatus';

export const TodoFooter: React.FC = () => {
  const { todos, clearCompleted, filterStatus, setFilterStatus } =
    useContext(TodoContext);

  const itemsLeft = todos.filter(todo => !todo.completed).length;

  const handleFilterClick =
    (status: TodoFilterStatus) =>
      (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setFilterStatus(status);
      };

  return (
    todos.length > 0 && (
      // {/* Hide the footer if there are no todos */}
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {itemsLeft} items left
        </span>

        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter">
          {Object.values(TODO_FILTER_STATUS).map(status => (
            <a
              key={status}
              href="#/"
              className={classNames('filter__link', {
                selected: status === filterStatus,
              })}
              onClick={handleFilterClick(status)}
              data-cy={`FilterLink${status}`}
            >
              {status}
            </a>
          ))}
        </nav>

        {/* this button should be disabled if there are no completed todos */}
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={clearCompleted}
          disabled={itemsLeft === todos.length}
        >
          Clear completed
        </button>
      </footer>
    )
  );
};
