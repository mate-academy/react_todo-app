import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`todo-${todo.id}`}
          />
          <label htmlFor={`todo-${todo.id}`}>
            {todo.title}
          </label>
          <button type="button" className="destroy" />
        </div>
        <input type="text" className="edit" />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
};

export default TodoList;
