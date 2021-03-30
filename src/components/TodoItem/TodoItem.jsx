import React, { useCallback, useState } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import { updateTodo } from '../../utils/api';

export const TodoItem = React.memo(({ id, title,
  completed, onCompletedTodos, onRemoveTodo, onTitleChange }) => {
  const [isEditing, setEdit] = useState(false);
  const [newValue, setNewValue] = useState(title);

  const handleBlur = ({ value }) => {
    onTitleChange(value, id);
    updateTodo(id, { title: value });
    setEdit(false);
  };

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'Enter': {
        const { value } = e.target;

        onTitleChange(value, id);
        updateTodo(id, { title: value });
        setEdit(false);
        break;
      }

      case 'Escape': {
        setEdit(false);
        break;
      }

      default: {
        break;
      }
    }
  }, [isEditing]);

  return (
    <li
      key={id}
      className={classNames({ completed, editing: isEditing })}
      onDoubleClick={() => setEdit(currentState => !currentState)}
      onBlur={e => handleBlur(e.target)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={e => onCompletedTodos(e, id)}
        />
        <label>
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
        value={newValue}
        onChange={e => setNewValue(e.target.value)}
        onKeyDown={e => handleKeyDown(e)}
      />
    </li>
  );
});

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onCompletedTodos: PropTypes.func.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
};
