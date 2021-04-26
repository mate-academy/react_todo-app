import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TodosFilter.scss';

export const TodosFilter = ({ length, clearing, sortTodos }) => {
  const [classAll, setClassAll] = useState('selected');
  const [classActive, setClassActive] = useState('');
  const [classCompleted, setClassCompleted] = useState('');

  const handleClick = (event) => {
    setClassAll('');
    setClassActive('');
    setClassCompleted('');

    switch (event.target.name) {
      case 'All': setClassAll('selected'); break;
      case 'Active': setClassActive('selected'); break;
      default: setClassCompleted('selected');
    }

    sortTodos(event);
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${length} `}
        items left
      </span>

      <ul className="filters">
        <li>
          <button
            className={classAll}
            onClick={handleClick}
            type="button"
            name="All"
          >
            All
          </button>
        </li>

        <li>
          <button
            className={classActive}
            type="button"
            onClick={handleClick}
            name="Active"
          >
            Active
          </button>
        </li>

        <li>
          <button
            className={classCompleted}
            type="button"
            onClick={handleClick}
            name="Completed"
          >
            Completed
          </button>
        </li>
      </ul>

      {length > 0
        && (
          <button
            type="button"
            className="clear-completed"
            onClick={clearing}
          >
            Clear completed
          </button>
        )
      }

    </footer>
  );
};

TodosFilter.propTypes = {
  length: PropTypes.number.isRequired,
  clearing: PropTypes.func.isRequired,
  sortTodos: PropTypes.func.isRequired,
};
