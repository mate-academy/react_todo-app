import React from 'react';

export default props => (
  <li className="">
    <div className="view">
      <input
        name="status"
        type="checkbox"
        className="toggle"
        id="todo-1"
        // eslint-disable-next-line react/prop-types
        onChange={props.toggleComplete}
      />
      {/* <label htmlFor="todo-1">{props.text}</label> */}
      <button
        type="button"
        className="destroy"
        // eslint-disable-next-line react/prop-types
        onClick={props.toDelete}
      />
    </div>
  </li>
);
