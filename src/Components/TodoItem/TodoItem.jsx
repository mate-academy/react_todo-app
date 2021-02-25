import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoItem = ({
  id,
  title,
  completed,
  changeChecked,
  deleteTodo,
  changeTitle,
}) => {
  const [isEditingAllow, setIsEditingAllow] = useState(false);
  const [editingTitle, setEditingTitle] = useState(title);

  const handleKey = (event) => {
    const { key } = event;

    switch (key) {
      case 'Enter':
        if (editingTitle.length === 0) {
          setEditingTitle(title);
        } else {
          changeTitle(id, editingTitle);
        }

        setIsEditingAllow(false);
        break;

      case 'Escape':
        setEditingTitle(title);
        setIsEditingAllow(false);
        break;

      default:
        break;
    }
  };

  const handleBlur = () => {
    if (editingTitle.length === 0) {
      setEditingTitle(title);
    } else {
      changeTitle(id, editingTitle);
    }

    setIsEditingAllow(false);
  };

  return (
    <li
      className={classNames({ editing: isEditingAllow }, { completed })}
      onDoubleClick={() => setIsEditingAllow(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={() => changeChecked(id)}
          checked={completed}
        />
        <label>{title}</label>
        <button
          onClick={() => deleteTodo(id)}
          type="button"
          className="destroy"
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editingTitle}
        onChange={event => setEditingTitle(event.target.value.trim())}
        onKeyUp={handleKey}
        onBlur={handleBlur}
      />
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  changeChecked: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
};
