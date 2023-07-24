import React from 'react';
import classNames from 'classnames';
import { TodoContext } from '../../TodoContext';
import { FilterField } from '../../types/FilterField';

const TodoFilterBar = () => {
  const {
    todos,
    filterField,
    setFilterField,
    clearCompleted,
  } = React.useContext(TodoContext);

  const uncompletedTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedTodos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: filterField === FilterField.all,
            })}
            onClick={(event) => {
              event.preventDefault();
              setFilterField(FilterField.all);
            }}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({
              selected: filterField === FilterField.active,
            })}
            onClick={(event) => {
              event.preventDefault();
              setFilterField(FilterField.active);
            }}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: filterField === FilterField.completed,
            })}
            onClick={(event) => {
              event.preventDefault();
              setFilterField(FilterField.completed);
            }}
          >
            Completed
          </a>
        </li>
      </ul>

      {todos.some(todo => todo.completed)
        && (
          <button
            type="button"
            className="clear-completed"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        )}
    </footer>
  );
};

export const FooterBar = () => {
  const { todos } = React.useContext(TodoContext);

  return (
    <>
      {todos.length > 0 && <TodoFilterBar />}
    </>
  );
};
