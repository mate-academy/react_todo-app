import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = (props) => {
  const {
    todo,
    deleteTodo,
    handleCompleted,
    enterEditingMode,
    handleChangingEditing,
  } = props;
  const { title, id, completed } = todo;

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    if (title !== '') {
      enterEditingMode(id);
    }
  };

  const handleInputEdit = ({ target }) => {
    const { value } = target;

    handleChangingEditing(id, value);
  };

  return (
    <>
      <div className="view">
        <input
          onChange={() => handleCompleted(id)}
          type="checkbox"
          className="toggle"
          id={`todo-${id}`}
          checked={completed}
        />
        <label onDoubleClick={() => enterEditingMode(id)}>{title}</label>
        <button
          onClick={() => deleteTodo(id)}
          type="button"
          className="destroy"
        />
      </div>
      <form onSubmit={handleSubmitEdit}>
        <input
          onChange={handleInputEdit}
          value={title}
          type="text"
          className="edit"
        />
      </form>
    </>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    completed: PropTypes.bool,
    title: PropTypes.string,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  handleCompleted: PropTypes.func.isRequired,
  enterEditingMode: PropTypes.func.isRequired,
  handleChangingEditing: PropTypes.func.isRequired,
};
