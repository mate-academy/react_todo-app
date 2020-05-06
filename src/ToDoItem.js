
import React from 'react';
import PropTypes from 'prop-types';

const ToDoItem = (props) => {
  let liClassName = '';
  const { id, description, isActive, isEdited } = props.todo;
  const { handleIsActiveChange,
    handleEditFieldChange,
    deleteToDo,
    handleItemDoubleClick,
    handleEditEnter } = props;

  if (isActive) {
    liClassName = 'view';
  } else {
    liClassName = 'completed';
  }

  if (isEdited) {
    liClassName = 'editing';
  }

  return (
    <li key={id} className={liClassName} id={id}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={!isActive}
          id={`todo-${id}`}
          onChange={handleIsActiveChange}
        />
        <label
          onDoubleClick={handleItemDoubleClick}
          htmlFor={`todo-${id}`}
        >
          {description}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={deleteToDo}
        />
      </div>
      <input
        value={description}
        type="text"
        className="edit"
        onChange={handleEditFieldChange}
        onKeyDown={handleEditEnter}
        onBlur={handleEditEnter}
      />
    </li>
  );
};

ToDoItem.propTypes = {
  todo: PropTypes.shape({
    description: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    isEdited: PropTypes.bool.isRequired,
  }).isRequired,
  handleIsActiveChange: PropTypes.func.isRequired,
  deleteToDo: PropTypes.func.isRequired,
  handleItemDoubleClick: PropTypes.func.isRequired,
  handleEditEnter: PropTypes.func.isRequired,
  handleEditFieldChange: PropTypes.func.isRequired,
};

export default ToDoItem;
