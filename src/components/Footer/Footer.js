import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({
  todos, active, onButtonSelected, deleteSelectedTodo,
}) => {
  const isTodoActive = todos.some(todo => todo.isActive === false);

  return (
    <footer
      className="footer"
      style={todos.length > 0 ? { display: 'block' } : { display: 'none' }}
    >
      <span className="todo-count">
        {`${todos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            onClick={() => onButtonSelected('all')}
            href="#/"
            className={active === 'all' ? 'selected' : ''}
          >
            All
          </a>
        </li>

        <li>
          <a
            onClick={() => onButtonSelected('active')}
            href="#/active"
            className={active === 'active' ? 'selected' : ''}
          >
            Active
          </a>
        </li>

        <li>
          <a
            onClick={() => onButtonSelected('completed')}
            href="#/completed"
            className={active === 'completed' ? 'selected' : ''}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        style={isTodoActive ? { display: 'block' } : { display: 'none' }}
        onClick={deleteSelectedTodo}
      >
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    isActive: PropTypes.bool,
    task: PropTypes.string,
  })).isRequired,
  active: PropTypes.string.isRequired,
  onButtonSelected: PropTypes.func.isRequired,
  deleteSelectedTodo: PropTypes.func.isRequired,
};

export default Footer;
