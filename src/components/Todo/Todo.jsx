import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function Todo({
  todo,
  onAddChecked,
  onRemoveTodo,
  onEditTitle,
}) {
  const { title, completed, id } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(todo.title);

  const changeTitle = (event) => {
    setValue(event.target.value);
  };

  const modifyTodo = () => {
    if (!value) {
      setValue(title);
      setIsEditing(false);

      return;
    }

    const modifiedTodo = {
      ...todo,
      title: value,
    };

    onEditTitle(modifiedTodo);
    setIsEditing(false);
  };

  const checkPressedButton = (event) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
    }
  };

  const undoChanges = (e) => {
    if (e.key === 'Escape') {
      setValue(title);
      setIsEditing(false);
    }
  };

  const switchStateTodo = () => {
    onAddChecked({
      ...todo,
      completed: !completed,
    });
  };

  return (
    <li className={classNames({
      completed,
      editing: isEditing,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          checked={completed}
          onChange={switchStateTodo}
          className="toggle"
        />
        <label onDoubleClick={() => setIsEditing(true)}>
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => onRemoveTodo(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={value}
        onChange={changeTitle}
        onBlur={modifyTodo}
        onKeyPress={checkPressedButton}
        onKeyDown={undoChanges}
      />
    </li>

  );
}

Todo.propTypes = {
  onAddChecked: PropTypes.func.isRequired,
  onEditTitle: PropTypes.func.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
