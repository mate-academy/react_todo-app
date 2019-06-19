import React from 'react';

const TodoListItem = props => {
  const {
    todo: { title, completed },
    deleteTodo,
    toggleTodo,
  } = props;
  return (
    <li className="">
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={() => toggleTodo(title)} />
        <label>{title}</label>
        <button
          className="destroy"
          type="button"
          onClick={() => {
            deleteTodo(title);
          }}
        ></button>
      </div>
    </li>
  );
};

export default TodoListItem;
