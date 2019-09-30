import React from 'react';

const TodoItem = ({
  id,
  checked,
  todo,
  onDestroy,
  onChecked,
}) => {
  const handleCheck = () => {
    const idVal = id;

    onChecked(idVal);
  };

  const handleDestroy = () => {
    const idVal = id;

    onDestroy(idVal);
  };

  return (
    <li className={checked ? 'completed' : ''}>
      <div className="view">
        <input
          onChange={handleCheck}
          checked={checked}
          type="checkbox"
          className="toggle"
          id={id}
        />
        <label htmlFor={id}>
          {todo}
        </label>
        <button onClick={handleDestroy} type="button" className="destroy" />
      </div>
    </li>
  );
};

export default TodoItem;
