/* eslint-disable */
import React from 'react';

const Todo = ({ todo, todoCheck, removeItem }) => (
  <li className="">
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id="todo-1"
        data-todoid={todo.id}
        checked={todo.completed}
        onChange={todoCheck}
      />
      <label htmlFor="todo-1"
             onClick={(event) => event.preventDefault()}
      >
        {todo.title}
      </label>
      <button
        onClick={removeItem}
        type="button"
        className="destroy"
        value={todo.id}
      />
    </div>
  </li>
);

export default Todo
