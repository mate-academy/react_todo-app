import React from 'react';

const TodoItem = (props) => {
  const {
    todo,
    handleDelete,
    handleComplete
        } = props;

  return (
    <ul className="todo-list">
      <li  className={todo.completed ? 'completed' : ''}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={todo.id}
            onChange={() => handleComplete(todo.id)}
            checked={todo.completed}

          />
          <label htmlFor="todo">
            {todo.text}
          </label>
            <button
              type="button"
              className="destroy"
              onClick={() => handleDelete(todo.id)}
            />
        </div>
      </li>
    </ul>
  )
};

export default TodoItem;
