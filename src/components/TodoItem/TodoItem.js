import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoItem = ({
  item,
  changeStatus,
  removeTodo,
  changeTodo,
}) => {
  const { id, title, completed } = item;
  const [isEditMode, setIsEditMode] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState(title);

  const handleEditing = (event) => {
    switch (event.key) {
      case 'Enter':
        if (newTodoTitle) {
          changeTodo(id, newTodoTitle);
        } else {
          setNewTodoTitle(title);
        }

        setIsEditMode(false);
        break;

      case 'Escape':
        setNewTodoTitle(title);
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
            onChange={() => changeStatus(id)}
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
        {isEditMode && (
          <input
            type="text"
            className="edit"
            value={newTodoTitle}
            autoFocus
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
        )}

      </li>
    </>
  );
};

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  changeStatus: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  changeTodo: PropTypes.func.isRequired,
};
