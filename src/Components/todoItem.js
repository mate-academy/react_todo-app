import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const TodoItem = ({ item, handleRemove, handleCheck }) => (

  <li
    className={!item.completed
      ? ''
      : 'completed'}
  >
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={item.id}
        checked={item.completed}
        onChange={() => {
          handleCheck(item.id);
        }}
      />
      <label
        htmlFor="todo-1"
      >
        {item.note}
      </label>
      <button
        type="button"
        className="destroy"
        onClick={() => {
          handleRemove(item.id);
        }}
      />
    </div>
  </li>
);

TodoItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.date,
  ])),
  handleRemove: PropTypes.func.isRequired,
};

TodoItem.defaultProps = {
  item: '',
};

export default TodoItem;
