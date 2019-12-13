import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos, toMark, toRemove }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li className="">
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            onClick={() => toMark(todo.id)}
            checked={todo.completed}
          />
          <label>{todo.title}</label>
          <button
            onClick={() => toRemove(todo.id)}
            type="button"
            className="destroy"
          />
        </div>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.oneOfType([PropTypes.object]).isRequired,
  toMark: PropTypes.func.isRequired,
  toRemove: PropTypes.func.isRequired,
};

export default TodoList;
