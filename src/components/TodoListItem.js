import React from 'react';

const TodoListItem = props => {
  const {
    todo: { title, completed, id },
    deleteTodo,
    toggleTodo,
  } = props;
  return (
    <li className="">
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={() => toggleTodo(id)} />
        <label>{title}</label>
        <button
          className="destroy"
          type="button"
          onClick={() => {
            deleteTodo(id);
          }}
        ></button>
      </div>
    </li>
  );
};

export default TodoListItem;
