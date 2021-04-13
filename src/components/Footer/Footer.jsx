import React, { useReducer } from 'react';
import classnames from 'classnames';

export const Footer = React.memo(
  ({ itemsLength, filterData, clearAllCompleted }) => {
    const reducer = (isActive, actions) => {
      switch (actions) {
        case 'all':
          return 'all';

        case 'active':
          return 'active';

        case 'completed':
          return 'completed';

        default:
          return '';
      }
    };

    const [isActive, dispatch] = useReducer(reducer, '');

    const selectAll = () => {
      dispatch('all');
      filterData();
    };

    const selectActive = () => {
      dispatch('active');
      filterData(false);
    };

    const selectComplited = () => {
      dispatch('completed');
      filterData(true);
    };

    return (
      <footer className="footer">
        <span className="todo-count">
          {`${itemsLength} items left`}
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              onClick={selectAll}
              className={classnames({ selected: isActive === 'all' })}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              onClick={selectActive}
              className={classnames({ selected: isActive === 'active' })}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              onClick={selectComplited}
              className={classnames({ selected: isActive === 'completed' })}
            >
              Completed
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="clear-completed"
          onClick={() => {
            clearAllCompleted();
          }}
        >
          Clear completed
        </button>
      </footer>
    );
  },
);
