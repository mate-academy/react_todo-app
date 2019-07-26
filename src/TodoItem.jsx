import React from 'react';

const TodoItem = ({ todo, onHandleDelete }) => {

  return (
    <ul className="todo-list">
      <li className="todo-list_li">
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="todo-3" />
          <label htmlFor="todo-3">
            {todo.text}
          </label>
            <button
              type="button"
              className="destroy"
              onClick={() => onHandleDelete(todo.id)}
            />
        </div>
      </li>
    </ul>
  )
}

export default TodoItem;
