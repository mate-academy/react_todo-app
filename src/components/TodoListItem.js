import React from 'react';

const TodoListItem = props => {
  const { todo } = props;
  return (
    <li className="">
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>{todo}</label>
        <button className="destroy"></button>
      </div>
    </li>
  );
};

export default TodoListItem;
