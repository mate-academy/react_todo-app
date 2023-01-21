// import { toUnicode } from 'punycode';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  data:Todo[];
  setData:(data: Todo[]) => void;
  setFilteredTodos: (data: Todo[]) => void;
  // todoFilter:(status: any) => void;
  // filteredTodos:any;
};

export const Footer: React.FC<Props>
= ({
  data, setData, setFilteredTodos,
}) => {
  // const [isActiveAll, setIsActiveAll] = useState(true);
  // const [isActiveActive, setIsActiveActive] = useState(false);
  // const [isActiveCompleted, setIsActiveCompleted] = useState(false);

  const [chousenButton, setChousenButton] = useState('All');

  const todoFilter = (status:any) => {
    if (status === 'All') {
      // setChousenButton(data);
      setFilteredTodos(data);
    }

    if (status === 'Active') {
      // setChousenButton(data.filter(todo => !todo.completed));
      setFilteredTodos(data.filter(todo => !todo.completed));
      setChousenButton('Active');
    }

    if (status === 'Completed') {
      setFilteredTodos(data.filter(todo => todo.completed));
      setChousenButton('Completed');
      // setChousenButton(data.filter(todo => todo.completed));
    }
  };

  const filterNotCompletedTodos = data.filter(todo => todo.completed === false);
  const filterCompletedTodos = data.filter(todo => todo.completed);

  const handleClearCompleted = () => {
    const updatedTodoList = data.filter(todo => !todo.completed);

    setData(updatedTodoList);
  };

  // const handleClickAll = () => {
  //   setFilteredTodos(data);
  //   setIsActiveActive(false);
  //   setIsActiveCompleted(false);
  //   setIsActiveAll(true);
  // };

  // const handleClickActive = () => {
  //   setFilteredTodos(data.filter(todo => !todo.completed));
  //   setIsActiveCompleted(false);
  //   setIsActiveAll(false);
  //   setIsActiveActive(true);
  // };

  // const handleClickCompleted = () => {
  //   setFilteredTodos(data.filter(todo => todo.completed));
  //   setIsActiveAll(false);
  //   setIsActiveActive(false);
  //   setIsActiveCompleted(true);
  // };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {filterNotCompletedTodos.length === 1 ? '1 item left' : `${filterNotCompletedTodos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            // className={classNames({ selected: isActiveAll })}
            // onClick={handleClickAll}
            className={classNames({ selected: chousenButton === 'All' })}
            onClick={() => todoFilter('All')}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            // className={classNames({ selected: isActiveActive })}
            // onClick={handleClickActive}
            className={classNames({ selected: chousenButton === 'Active' })}
            // onClick={() => todoFilter('Active')}
            onClick={() => todoFilter('Active')}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            // className={classNames({ selected: isActiveCompleted })}
            // onClick={handleClickCompleted}
            className={classNames({ selected: chousenButton === 'Completed' })}
            // onClick={() => todoFilter('Completed')}
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
