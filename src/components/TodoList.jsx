import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';

import { TodoItem } from './TodoItem';

export function TodoList({
  todos, allToggled, handleToggle, handleToggleAll, handleDelete,
}) {
  return (
    <section className="main">
      {todos.length > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={allToggled}
            onChange={handleToggleAll}
          />
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>
        </>
      )}

      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            {...todo}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
          />
        ))}
      </ul>
    </section>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
  handleToggle: PropTypes.func,
  handleDelete: PropTypes.func,
  handleToggleAll: PropTypes.func,
};

TodoList.defaultProps = {
  todos: [],
  handleToggle: () => {},
  handleDelete: () => {},
  handleToggleAll: () => {},
};
