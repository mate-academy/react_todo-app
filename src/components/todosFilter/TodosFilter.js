import React from 'react';
import PropTypes from 'prop-types';

function TodosFilter({ todosFilter, selectedPage }) {
  return (
    <ul className="filters">
      <li>
        {selectedPage === 'All'
          ? (<a onClick={todosFilter} href="#/" className="selected">
              All
            </a>)
          : (<a onClick={todosFilter} href="#/">
              All
            </a>)
        }
      </li>

      <li>
        {selectedPage === 'Active'
          ? (<a onClick={todosFilter} href="#/active" className="selected">
              Active
            </a>)
          : (<a onClick={todosFilter} href="#/active">
              Active
            </a>)
        }
      </li>

      <li>
        {selectedPage === 'Completed'
          ? (<a onClick={todosFilter} href="#/completed" className="selected">
              Completed
            </a>)
          : (<a onClick={todosFilter} href="#/completed">
              Completed
            </a>)
        }
      </li>
    </ul>
  );
}

TodosFilter.propTypes = {
  todosFilter: PropTypes.func.isRequired,
  selectedPage: PropTypes.string.isRequired,
};

export default TodosFilter;
