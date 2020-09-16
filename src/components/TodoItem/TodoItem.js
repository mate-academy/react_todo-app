import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoItem = ({
  id,
  title,
  completed,
  changeCompleted,
  removeTodo,
}) => (
  <>
    <li className={classNames({ completed })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={() => changeCompleted(id)}
          checked={completed}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => removeTodo(id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>

    {/* <li className="completed">
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
  </>
);

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  changeCompleted: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};
