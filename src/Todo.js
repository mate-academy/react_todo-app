import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ todo, deleteTodo, changeTodoStatus }) => (
  <>
    <div className="view">
      <input
        onChange={() => changeTodoStatus(todo.id)}
        type="checkbox"
        className="toggle"
        id={todo.id}
        checked={todo.completed}
      />
      <label htmlFor={todo.id}>{todo.title}</label>
      <button
        onClick={() => deleteTodo(todo.id)}
        type="button"
        className="destroy"
      />
    </div>
    <input type="text" className="edit" />
  </>
);

export default Todo;

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTodoStatus: PropTypes.func.isRequired,
};
