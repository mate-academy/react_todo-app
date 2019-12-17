import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos, changeCompleted, deleteTodo, filter }) => (
  <div>
    {todos
      .filter((todo) => {
        if (filter === 'Active') {
          return (!todo.completed);
        }

        if (filter === 'Completed') {
          return (todo.completed);
        }

        return (todo.completed || !todo.completed);
      })
      .map(todo => (
        <li className="" key={todo.id}>
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={`todos-${todo.id}`}
              checked={todo.completed}
              onClick={() => changeCompleted(todo.id)}
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

TodoList.propTypes = {
  todos: PropTypes.arrayOf({
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  changeCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default TodoList;
