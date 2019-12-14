import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, toggleTodoCompleted, removeTodo }) => {
  const currentClass = todo.completed ? 'completed' : '';

  return (
    <li className={currentClass}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="todo-1"
          onClick={() => toggleTodoCompleted(todo.id)}
          checked={todo.completed}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => removeTodo(todo.id)}
        />
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.string.isRequired,
  toggleTodoCompleted: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

export default TodoItem;
