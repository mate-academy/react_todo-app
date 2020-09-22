import React from 'react';
import classNames from 'classnames';

export const Todo = ({ todos, id, completed, changeProcessTodo }) => {

  return (
    <li className={classNames({
      view: !completed,
      completed,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={() => changeProcessTodo(id)}
          checked={completed}
        />
        <label>{todos}</label>
        <button type="button" className="destroy" />
      </div>
      <input type="text" className="edit" />
      {/* <li>
      <div className="view">
        <input type="checkbox" className="toggle" />
        <label>asdfghj</label>
        <button type="button" className="destroy" />
      </div>
      <input type="text" className="edit" />
    </li>

    <li className="completed">
      <div className="view">
        <input type="checkbox" className="toggle" />
        <label>qwertyuio</label>
        <button type="button" className="destroy" />
      </div>
      <input type="text" className="edit" />
    </li>

    <li className="editing">
      <div className="view">
        <input type="checkbox" className="toggle" />
        <label>zxcvbnm</label>
        <button type="button" className="destroy" />
      </div>
      <input type="text" className="edit" />
    </li>

    <li>
      <div className="view">
        <input type="checkbox" className="toggle" />
        <label>1234567890</label>
        <button type="button" className="destroy" />
      </div>
      <input type="text" className="edit" />
    </li> */}
    </li>
  );
};
