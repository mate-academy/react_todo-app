import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';

export function TodoList({
  todos, handleToggle, handleToggleAll, handleDelete,
}) {
  const { pathname } = useLocation();

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">
        Mark all as complete
      </label>

      {/* Switch - Route - filter todos */}
      <ul className="todo-list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={cn({
              completed: todo.completed,
              editing: false,
            })}
          >
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
              />
              <label>{todo.title}</label>
              <button
                type="button"
                className="destroy"
                onClick={() => handleDelete(todo.id)}
              />
            </div>
            <input type="text" className="edit" />
          </li>
        ))}
      </ul>
    </section>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      completed: PropTypes.bool,
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
