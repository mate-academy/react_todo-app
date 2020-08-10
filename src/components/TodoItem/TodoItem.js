import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../context';

function TodoItem({ text, id, isDone }) {
  const { toggleTodo, removeTodo } = useContext(Context);

  return (
    <li>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={id}
          onChange={() => toggleTodo(id)}
          checked={isDone}
        />
        <label htmlFor={id}>{text}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => {
            removeTodo(id);
          }}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
}

TodoItem.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isDone: PropTypes.bool.isRequired,
};

export default TodoItem;
