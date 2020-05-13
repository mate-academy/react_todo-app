import React from 'react';
import PropTypes from 'prop-types';

const Footer = (
  {
    todos,
    handleFilter,
    handleClearCompleted,
    isVisible,
    filterName,
  },
) => {
  const onFilter = (currentFilterName) => {
    handleFilter(currentFilterName);
  };

  const onCompleted = () => {
    handleClearCompleted();
  };

  return (
    <>
      {!!todos.length && (
        <footer className="footer">
          <span className="todo-count">
            {`${todos.filter(el => el.completed === false)
              .length} items left`}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={filterName === 'All' ? 'selected' : ''}
                onClick={() => onFilter('All')}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={filterName === 'Active' ? 'selected' : ''}
                onClick={() => onFilter('Active')}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={filterName === 'Completed' ? 'selected' : ''}
                onClick={() => onFilter('Completed')}
              >
                Completed
              </a>
            </li>
          </ul>
          {isVisible && (
            <button
              type="button"
              className="clear-completed"
              onClick={onCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )
      }
    </>
  );
};

export default Footer;

Footer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  handleFilter: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  filterName: PropTypes.string.isRequired,
};
