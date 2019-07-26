import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = (props) => {
  const {
    onDelete,
    todo,
    onToggleDone,
    handleEditabled,
  } = props;

  return (
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={todo.id}
        checked={todo.complete}
        onChange={onToggleDone}
      />
      <label
        contentEditable={todo.editabled}
        onDoubleClick={handleEditabled}
        suppressContentEditableWarning="true"
      >
        {todo.title}
      </label>
      <button type="button" className="destroy" onClick={onDelete} />
    </div>
  );
};

TodoItem.propTypes = {

  onDelete: PropTypes.func.isRequired,
  handleEditabled: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
    editabled: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
