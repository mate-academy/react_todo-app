import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Footer = ( props ) => {
    const {
      handleFilter,
      activeFilter,
      todos,
      handleTodoDeleteCompleted
          } = props;

  const activeTodos = todos.filter(todo => (!todo.completed)).length;
  const todoCompleted = todos.filter(todo => (todo.completed));
  return (
    <footer className="footer" style={{ display: 'block' }}>
      <span className="todo-count">
        {activeTodos} items left
      </span>
      <ul className="filters">
        <li>
          <a href="#/" className={classnames({
            selected: activeFilter === 'all',
          })}
          name='all'
          onClick={handleFilter}
          >All</a>
        </li>

        <li>
          <a href="#/active"
          className={classnames({
            selected: activeFilter === 'active',
          })}
          name='active'
          onClick={handleFilter}>Active</a>
        </li>

        <li>
          <a href="#/completed"
          className={classnames({
            selected: activeFilter === 'completed',
          })}
          name='completed'
          onClick={handleFilter}>Completed</a>
        </li>

        <li className={classnames({
            'hidden': todoCompleted.length === 0,
            'selected': todoCompleted.length > 0,
            'clear-completed': true,
          })}>
          <a href="#/deleted"
            className={classnames({
              'selected': activeFilter === 'deleted',

            })}
            name='deleted'
            onClick={() => handleTodoDeleteCompleted(todoCompleted)}>
              Clear completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        style={{ display: 'block' }}
      />
    </footer>

  )
};

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeFilter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
  handleTodoDeleteCompleted: PropTypes.func.isRequired,
};

export default Footer;
