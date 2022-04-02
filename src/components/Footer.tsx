import React from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';

import { Filter } from '../types/Filter';

type Props = {
  itemsLeft: number,
  clearCompleted: () => void,
};

export const Footer: React.FC<Props> = ({ itemsLeft, clearCompleted }) => {
  const { type = Filter.all } = useParams();

  return (
    <footer className="footer">
      <span className="todo-count">
        {itemsLeft}
        {' '}
        items left
      </span>

      <ul className="filters">
        <li>
          <Link
            to={`/${Filter.all}`}
            className={cn({ selected: type === Filter.all })}
          >
            All
          </Link>
        </li>

        <li>
          <Link
            to={`/${Filter.active}`}
            className={cn({ selected: type === Filter.active })}
          >
            Active
          </Link>
        </li>

        <li>
          <Link
            to={`/${Filter.completed}`}
            className={cn({ selected: type === Filter.completed })}
          >
            Completed
          </Link>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
