import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  data:Todo[];
  setData:(data: Todo[]) => void;
  setFilteredTodos: (data: Todo[]) => void;
};

export const Footer: React.FC<Props>
= ({
  data, setData, setFilteredTodos,
}) => {
  const [chousenButton, setChousenButton] = useState('All');

  const todoFilter = (status:string) => {
    if (status === 'All') {
      setFilteredTodos(data);
    }

    if (status === 'Active') {
      setFilteredTodos(data.filter(todo => !todo.completed));
      setChousenButton('Active');
    }

    if (status === 'Completed') {
      setFilteredTodos(data.filter(todo => todo.completed));
      setChousenButton('Completed');
    }
  };

  const filterNotCompletedTodos = data.filter(todo => todo.completed === false);
  const filterCompletedTodos = data.filter(todo => todo.completed);

  const handleClearCompleted = () => {
    const updatedTodoList = data.filter(todo => !todo.completed);

    setData(updatedTodoList);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {filterNotCompletedTodos.length === 1 ? '1 item left' : `${filterNotCompletedTodos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({ selected: chousenButton === 'All' })}
            onClick={() => todoFilter('All')}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({ selected: chousenButton === 'Active' })}
            onClick={() => todoFilter('Active')}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({ selected: chousenButton === 'Completed' })}
            onClick={() => todoFilter('Completed')}
          >
            Completed
          </a>
        </li>
      </ul>

      {filterCompletedTodos.length > 0 && (
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
