import React from 'react';

const TodoList = ({ todo, isChecked }) => {
  const handleClick = () => isChecked(todo.id);

  return (
    <ul className="todo-list">
      <li className="">
        <div className="view">
          <input type="checkbox" className="toggle" id={todo.id} onClick={handleClick} />
          <label htmlFor={todo.id}>{todo.value}</label>
          <button type="button" className="destroy" />
        </div>
      </li>
    </ul>
  );
};

export default TodoList;
