import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({
  todo, id, onDelete, toggleComplete,
}) => {
  console.log(todo);

  return (
    <li className="">
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={id}
          onClick={toggleComplete}
          checked={todo.complete ? 'checked' : ''}
        />
        <label
          style={todo.complete
            ? { textDecoration: 'line-through', color: '#D9D9D9' }
            : {}}
          htmlFor={id}
        >
          {todo.text}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={onDelete}
        />
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    text: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
