import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

export const Footer = (props) => {
  const {
    todos,
    setFilter,
    handleClearComplited,
  } = props;

  const todosLeftCount = todos.filter(todo => !todo.completed);
  let todosLeftCountText = '';

  if (todosLeftCount.length === 1) {
    todosLeftCountText = `1 item left`;
  } else {
    todosLeftCountText = `${todosLeftCount.length} items left`;
  }

  return (
    <footer
      className="footer"
    >
      <span
        className="todo-count"
      >
        { todosLeftCountText }
      </span>

      <ul
        className="filters"
      >
        <li>
          <button
            type="button"
            className="footer__button"
            onClick={() => setFilter('all')}
          >
                    All
          </button>
        </li>

        <li>
          <button
            type="button"
            className="footer__button"
            onClick={() => setFilter('active')}
          >
                    Active
          </button>
        </li>

        <li>
          <button
            type="button"
            className="footer__button"
            onClick={() => setFilter('completed')}
          >
                    Completed
          </button>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={handleClearComplited}
      >
                Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,

  setFilter: PropTypes.func.isRequired,
  handleClearComplited: PropTypes.func.isRequired,
};
