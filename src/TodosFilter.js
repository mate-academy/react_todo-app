import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TodosFilter = (props) => {
  const { item, handlFilter, filter, deleteCompleted, completed } = props;
  const all = classNames({ selected: filter === 'All' });
  const active = classNames({ selected: filter === 'Active' });
  const done = classNames({ selected: filter === 'Completed' });

  return (
    <footer className="footer">
      <span className="todo-count">
        {item}
        {' '}
        items left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={all}
            onClick={() => handlFilter('All')}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={active}
            onClick={() => handlFilter('Active')}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={done}
            onClick={() => handlFilter('Completed')}
          >
            Completed
          </a>
        </li>
      </ul>
      {completed && (
        <button
          type="button"
          className="clear-completed"
          onClick={deleteCompleted}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};

TodosFilter.propTypes = {
  completed: PropTypes.func.isRequired,
  item: PropTypes.number.isRequired,
  handlFilter: PropTypes.func.isRequired,
  deleteCompleted: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default TodosFilter;
