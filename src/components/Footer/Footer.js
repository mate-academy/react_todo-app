import React from 'react';
import FilterItem from '../FilterItem/FilterItem';

const Footer = ({
  activeTodosLeft,
  changeFilter,
  filter,
  isSomeTodoCompleted,
  deleteAllCompletedTodoFromData
}) => (
  <footer className="footer">
    {!!activeTodosLeft &&
      <span className="todo-count">
        {`${activeTodosLeft} item left`}
      </span>
    }

    <ul className="filters">
      <FilterItem
        href="#/"
        dataFilter="all"
        onClick={changeFilter}
        anchor="All"
        filter={filter}
      />

      <FilterItem
        href="#/active"
        dataFilter="active"
        onClick={changeFilter}
        anchor="Active"
        filter={filter}
      />

      <FilterItem
        href="#/completed"
        dataFilter="completed"
        onClick={changeFilter}
        anchor="Completed"
        filter={filter}
      />
    </ul>
    {isSomeTodoCompleted &&
      <button
        type="button"
        className="clear-completed"
        onClick={deleteAllCompletedTodoFromData}
      >
        Clear completed
      </button>
    }
  </footer>
);

export default Footer;
