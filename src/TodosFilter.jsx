import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { TodoContext } from './TodoContext';

export const TodosFilter = ({ setVisibleTodos }) => {
  const { todos } = useContext(TodoContext);
  const [value, setValue] = useState('All');

  const handleClick = (event) => {
    const newValue = event.target.innerText;

    setValue(newValue);

    let todosToBeShown;

    switch (newValue) {
      case 'All':
        todosToBeShown = todos;
        break;
      case 'Active':
        todosToBeShown = todos.filter(todo => !todo.completed);
        break;
      case 'Completed':
        todosToBeShown = todos.filter(todo => todo.completed);
        break;
      default:
        todosToBeShown = todos;
    }

    setVisibleTodos(todosToBeShown);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames({ selected: value === 'All' })}
          onClick={handleClick}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({ selected: value === 'Active' })}
          onClick={handleClick}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({ selected: value === 'Completed' })}
          onClick={handleClick}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

TodosFilter.propTypes = {
  setVisibleTodos: PropTypes.func.isRequired,
};
