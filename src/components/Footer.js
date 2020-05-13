import React from 'react';
import propTypes from 'prop-types';
import TodosFilter from './TodosFilter';

const Footer = (
  { tasks,
    clearCompleted,
    filteringBtns,
    tasksToShow,
    toggleActiveTasks,
    countActiveTAsks },
) => (
  <footer
    className="footer"
    hidden={tasks.length === 0}
  >
    <span className="todo-count">
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      {countActiveTAsks()} items left
    </span>

    <ul className="filters">
      {filteringBtns.map(filter => (
        <TodosFilter
          tasksToShow={tasksToShow}
          key={filter}
          actualFilter={filter}
          toggleActiveTasks={toggleActiveTasks}
        />
      ))}
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

Footer.propTypes = {
  tasks: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    completed: propTypes.bool.isRequired,
  })).isRequired,
  filteringBtns: propTypes.arrayOf(propTypes.string).isRequired,
  tasksToShow: propTypes.string.isRequired,
  toggleActiveTasks: propTypes.func.isRequired,
  clearCompleted: propTypes.func.isRequired,
  countActiveTAsks: propTypes.func.isRequired,
};

export default Footer;
