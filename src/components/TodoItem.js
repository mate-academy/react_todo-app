import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = (props) => {
  const { onDelete, todo, onToggleDone } = props;

  return (
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={todo.id}
        checked={todo.complete}
        onChange={onToggleDone}
        readOnly
      />
      <label
        htmlFor={todo.id}
      >
        {todo.title}
      </label>
      <button type="button" className="destroy" onClick={onDelete} />
    </div>
  );
};

TodoItem.propTypes = {

  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
