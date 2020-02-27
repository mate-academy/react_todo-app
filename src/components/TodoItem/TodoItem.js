import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = (props) => {
  const {
    todo,
    deleteTodo,
    handleCompleted,
    handleDoubleEditing,
    handleChangingEditing,
  } = props;
  const { title, id, completed } = todo;

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    handleDoubleEditing(id);
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
        <label onDoubleClick={() => handleDoubleEditing(id)}>{title}</label>
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
    id: PropTypes.number,
    completed: PropTypes.bool,
    title: PropTypes.string,
  }).isRequired,
  deleteTodo: PropTypes.func,
  handleCompleted: PropTypes.func,
  handleDoubleEditing: PropTypes.func,
  handleChangingEditing: PropTypes.func,
};

TodoItem.defaultProps = {
  deleteTodo: () => {},
  handleCompleted: () => {},
  handleDoubleEditing: () => {},
  handleChangingEditing: () => {},
};
