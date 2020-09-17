import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoItem = ({
  id,
  title,
  completed,
  changeCompleted,
  removeTodo,
  changeTodo,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState(title);

  const handleEditing = (event) => {
    switch (event.key) {
      case 'Enter':
        if (newTodoTitle) {
          changeTodo(id, newTodoTitle);
        }

        setIsEditMode(false);
        break;

      case 'Escape':
        setIsEditMode(false);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <li
        className={classNames({
          completed,
          editing: isEditMode,
        })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            onChange={() => changeCompleted(id)}
            checked={completed}
          />
          <label
            onDoubleClick={() => setIsEditMode(true)}
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => removeTodo(id)}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={newTodoTitle}
          // autoFocus={isEditMode} doesn't work.
          // Finded in google a way to do it with ref
          ref={(component) => {
            if (component) {
              component.focus();
            }
          }}
          onChange={(event) => {
            setNewTodoTitle(event.target.value.trimLeft());
          }}
          onKeyUp={handleEditing}
          onFocus={e => e.currentTarget.select()}
          onBlur={() => {
            if (newTodoTitle) {
              changeTodo(id, newTodoTitle);
            }

            setIsEditMode(false);
          }}
        />
      </li>
    </>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  changeCompleted: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  changeTodo: PropTypes.func.isRequired,
};
