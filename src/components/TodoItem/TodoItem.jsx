import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoItem = React.memo(({ id, title,
  completed, onCompletedTodos, onRemoveTodo, onTitleChange }) => {
  const [edit, setEdit] = useState(false);
  const [newValue, setValue] = useState(title);

  const handleBlur = ({ value }) => {
    onTitleChange(value, id);
    setEdit(false);
  };

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'Enter': {
        const { value } = e.target;

        onTitleChange(value, id);
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
  }, [edit]);

  return (
    <li
      key={id}
      className={classNames({ completed, editing: edit })}
      onDoubleClick={() => setEdit(currentState => !currentState)}
      onBlur={e => handleBlur(e.target.value)}
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
        onChange={e => setValue(e.target.value)}
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
