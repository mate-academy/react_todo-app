import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';

export function TodoList({ todos }) {
  const { pathname } = useLocation();

  console.log(pathname);

  return (
    <section className="main">
      <input type="checkbox" id="toggle-all" className="toggle-all" />
      <label htmlFor="toggle-all">Mark all as complete</label>

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
              <input type="checkbox" className="toggle" />
              <label>{todo.title}</label>
              <button type="button" className="destroy" />
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
};

TodoList.defaultProps = {
  todos: [],
};
