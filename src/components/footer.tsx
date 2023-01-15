// import { toUnicode } from 'punycode';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  data:Todo[];
  setData:(data: Todo[]) => void;
  setFilterTodos: (data: Todo[]) => void;
};

export const Footer: React.FC<Props>
= ({
  data, setData, setFilterTodos,
}) => {
  const [isActiveAll, setIsActiveAll] = useState(true);
  const [isActiveActive, setIsActiveActive] = useState(false);
  const [isActiveCompleted, setIsActiveCompleted] = useState(false);

  const hasNotCompletedTodos = data.filter(todo => todo.completed === false);
  const hasCompleted = data.filter(todo => todo.completed);

  const handleClearCompleted = () => {
    const updatedTodoList = data.filter(todo => !todo.completed);

    setData(updatedTodoList);
  };

  const handleClickAll = () => {
    setFilterTodos(data);
    setIsActiveActive(false);
    setIsActiveCompleted(false);
    setIsActiveAll(true);
  };

  const handleClickActive = () => {
    setFilterTodos(data.filter(todo => !todo.completed));
    setIsActiveCompleted(false);
    setIsActiveAll(false);
    setIsActiveActive(true);
  };

  const handleClickCompleted = () => {
    setFilterTodos(data.filter(todo => todo.completed));
    setIsActiveAll(false);
    setIsActiveActive(false);
    setIsActiveCompleted(true);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {hasNotCompletedTodos.length === 1 ? '1 item left' : `${hasNotCompletedTodos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({ selected: isActiveAll })}
            onClick={handleClickAll}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({ selected: isActiveActive })}
            onClick={handleClickActive}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({ selected: isActiveCompleted })}
            onClick={handleClickCompleted}
          >
            Completed
          </a>
        </li>
      </ul>

      {hasCompleted.length > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};
