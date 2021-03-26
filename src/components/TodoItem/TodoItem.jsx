import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoItem = ({
  todo,
  onComplete,
  onRemove,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [inputQuery, setInputQuery] = useState(title);

  const handleEditing = () => {
    setIsEditable(true);
  };

  const handleInput = useCallback(
    (event) => {
      const { value } = event.target;

      setInputQuery(value);
    }, [],
  );

  const handleSubmit = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        setIsEditable(false);
        setInputQuery(title);

        return;
      }

      if (event.key === 'Enter' && inputQuery) {
        setTitle(inputQuery);
        setIsEditable(false);
      }
    }, [inputQuery, title],
  );

  const handleOnBLur = useCallback(
    (event) => {
      const { currentTarget, target } = event;

      if (inputQuery && currentTarget === target) {
        setTitle(inputQuery);
        setIsEditable(false);
      }
    }, [inputQuery],
  );

  return (
    <li className={classNames({
      completed: todo.completed,
    },
    {
      editing: isEditable,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          readOnly
          className="toggle"
          checked={todo.completed}
          onClick={() => onComplete(todo.id)}
        />
        <label onDoubleClick={handleEditing}>
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => onRemove(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={inputQuery}
        onChange={handleInput}
        onKeyDown={handleSubmit}
        onBlur={handleOnBLur}
      />
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }),
  onComplete: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

TodoItem.defaultProps = {
  todo: null,
};
