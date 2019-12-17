import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todos }) => (
  <div>
    {todos.map(todo => (
      <li className="">
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="todos-1"
            checked={todo.status}
            onClick={() => this.props.changeStatus(todo.id)}
          />
          <label htmlFor="todos-1">{todo.title}</label>
          <button
            type="button"
            className="destroy"
            onClick={() => this.props.deleteTodo(todo.id)}
          />
        </div>
      </li>
    ))}
  </div>
);

TodoItem.propTypes = {
  todos: PropTypes.shape({
    status: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default TodoItem;
