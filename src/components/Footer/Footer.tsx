import React, { useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Context } from '../context';

import { deleteTodos } from '../../api';

import { getSearchWith } from '../../utils/searchHelper';

interface Props {
  searchParams: URLSearchParams;
  sort: string | null;
  to: string | null;
  text: string;
}

const SortLink: React.FC<Props> = ({
  searchParams,
  sort,
  to,
  text,
}) => (
  <Link
    to={{
      search: getSearchWith(
        searchParams,
        { sort: to },
      ),
    }}
    className={classNames(
      { selectedLink: sort === to },
    )}
  >
    {text}
  </Link>
);

export const Footer: React.FC = () => {
  const {
    todos,
    setTodos,
    setLoaderTodos,
    error,
  } = useContext(Context);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');

  const clearCompletedTodos = () => {
    todos.forEach(todo => {
      if (todo.completed) {
        setLoaderTodos(todosId => [...todosId, todo.id]);
        deleteTodos(todo.id)
          .then(() => {
            setTodos(todos.filter(todoItem => !todoItem.completed));
          })
          .catch(() => {
            setLoaderTodos([]);
            error('Server error');
          });
      }
    });
    setTodos(todos);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {todos.length}
        {' '}
        items left
      </span>

      <ul className="filters">
        <li>
          <SortLink
            searchParams={searchParams}
            sort={sort}
            to={null}
            text="All"
          />
        </li>

        <li>
          <SortLink
            searchParams={searchParams}
            sort={sort}
            to="active"
            text="Active"
          />
        </li>

        <li>
          <SortLink
            searchParams={searchParams}
            sort={sort}
            to="completed"
            text="Completed"
          />
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={clearCompletedTodos}
        style={{
          opacity: todos.some(todo => todo.completed) ? '1' : '0',
          cursor: todos.some(todo => todo.completed) ? 'pointer' : 'auto',
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
