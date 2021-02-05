import React, { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { TypeTodo } from '../../types';

export const Todo = ({
  todo: { id, title, isCompleted, isBeingEdited },
  removeItem,
  toggleCompletedStatus,
  handleEditingTodo,
  handleEnter,
  handleEscape,
}) => {
  const [inputValue, setInputValue] = useState('');

  const keyDownHandler = (e) => {
    if (e.key === 'Enter' && inputValue) {
      handleEnter(id, inputValue);
    } else if (e.key === 'Escape') {
      handleEscape(id);
    }
  };

  return (
    <li
      key={id}
      className={cn({
        completed: isCompleted,
        editing: isBeingEdited,
      })}

    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={() => toggleCompletedStatus(id)}
          checked={isCompleted}
        />
        <label
          onDoubleClick={() => handleEditingTodo(id)}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => removeItem(id)}
        />
      </div>
      <input
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={e => keyDownHandler(e)}
        type="text"
        className="edit"
      />
    </li>
  );
};

Todo.propTypes = {
  todo: TypeTodo.isRequired,
  removeItem: PropTypes.func.isRequired,
  toggleCompletedStatus: PropTypes.func.isRequired,
  handleEditingTodo: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
  handleEscape: PropTypes.func.isRequired,
};
