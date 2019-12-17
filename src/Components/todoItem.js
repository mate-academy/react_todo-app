import React from 'react';
import PropTypes from 'prop-types';

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
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ])),
  handleRemove: PropTypes.func.isRequired,
  handleCheck: PropTypes.func.isRequired,
};

TodoItem.defaultProps = {
  item: '',
};

export default TodoItem;
