import React from 'react';
import cx from 'classnames';

const TodoItem = ({todo, index, checkBoxClick, destroyClick}) => {
  const className = cx({
    '': true,
    'crossed-label': todo.completed,
  });

  return (
    <li className={className}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onClick={() => checkBoxClick(todo, index)}
          checked={todo.completed}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => destroyClick(todo, index)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};

export default TodoItem;
