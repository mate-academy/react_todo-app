import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todos, changeStatus, deleteTodo, filter }) => (
  <div>
    {todos
      .filter((todo) => {
        if (filter === 'active') {
          return (todo.status === false);
        }

        if (filter === 'completed') {
          return (todo.status === true);
        }

        return (todo.status === false || todo.status === true);
      })
      .map(todo => (
        <li className="">
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={`todos-${todo.id}`}
              checked={todo.status}
              onClick={() => changeStatus(todo.id)}
            />
            <label htmlFor={`todos-${todo.id}`}>{todo.title}</label>
            <button
              type="button"
              className="destroy"
              onClick={() => deleteTodo(todo.id)}
            />
          </div>
        </li>
      ))}
  </div>
);

TodoItem.propTypes = {
  todos: PropTypes.arrayOf({
    status: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  changeStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default TodoItem;
