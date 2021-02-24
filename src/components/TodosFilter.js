import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const TodosFilter = ({
  handleShowAll,
  handleShowActive,
  handleShowCompleted,
}) => {
  const [isAllSelected, setIsAllSelected] = useState(true);
  const [isActiveSelected, setIsActiveSelected] = useState(false);
  const [isCompletedSelected, setIsCompletedSelected] = useState(false);

  const showAll = () => {
    setIsAllSelected(true);
    setIsActiveSelected(false);
    setIsCompletedSelected(false);
    handleShowAll();
  };

  const showActive = () => {
    setIsActiveSelected(true);
    setIsAllSelected(false);
    setIsCompletedSelected(false);
    handleShowActive();
  };

  const showCompleted = () => {
    setIsCompletedSelected(true);
    setIsActiveSelected(false);
    setIsAllSelected(false);
    handleShowCompleted();
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={isAllSelected ? 'selected' : ''}
          onClick={showAll}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={isActiveSelected ? 'selected' : ''}
          onClick={showActive}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={isCompletedSelected ? 'selected' : ''}
          onClick={showCompleted}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

TodosFilter.propTypes = {
  handleShowAll: PropTypes.func.isRequired,
  handleShowActive: PropTypes.func.isRequired,
  handleShowCompleted: PropTypes.func.isRequired,
};
