import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoFilter = ({
  isSelected,
  setIsSelected,
  filteredTodos,
  filters,
}) => {
  const handleClick = (text) => {
    setIsSelected(text);
    filteredTodos(text);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames({ selected: isSelected === filters.all })}
          onClick={({ target }) => handleClick(target.innerText)}
        >
          {filters.all}
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({ selected: isSelected === filters.active })}
          onClick={({ target }) => handleClick(target.innerText)}
        >
          {filters.active}
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({ selected: isSelected === filters.completed })}
          onClick={({ target }) => handleClick(target.innerText)}
        >
          {filters.completed}
        </a>
      </li>
    </ul>
  );
};

TodoFilter.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  setIsSelected: PropTypes.func.isRequired,
  filteredTodos: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    all: PropTypes.string.isRequired,
    active: PropTypes.string.isRequired,
    completed: PropTypes.string.isRequired,
  }).isRequired,
};
