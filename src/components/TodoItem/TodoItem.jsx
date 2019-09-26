import React from 'react';

const TodoItem = (props) => {
  function handleCheck() {
    const idVal = props.id;
    const { onChecked } = props;

    onChecked(idVal);
  }

  function handleDestroy() {
    const idVal = props.id;
    const { onDestroy } = props;

    onDestroy(idVal);
  }

  return (
    <li className={props.checked ? 'completed' : ''}>
      <div className="view">
        <input
          onChange={handleCheck}
          checked={props.checked}
          type="checkbox"
          className="toggle"
          id={props.id}
        />
        <label htmlFor={props.id}>
          {props.todo}
        </label>
        <button onClick={handleDestroy} type="button" className="destroy" />
      </div>
    </li>
  );
};

export default TodoItem;
