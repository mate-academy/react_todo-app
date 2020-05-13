import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const TodoList = ({ todos, handleCompleted, deleteTodo }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li
        key={todo.id}
        className={classNames({ completed: todo.completed })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`todo-${todo.id}`}
            name={todo.id}
            checked={todo.completed}
            onChange={handleCompleted}
          />
          <label htmlFor={`todo-${todo.id}`}>
            {todo.title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => deleteTodo(todo.id)}
          />
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
  handleCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
