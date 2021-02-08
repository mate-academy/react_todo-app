import React, { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { TypeTodo } from '../../types';

export const Todo = ({
  todo: { id, title, completed, isBeingEdited },
  removeItem,
  checkTodo,
  handleEditingTodo,
  handleEditedTodo,
}) => {
  const [todoTitle, setTodoTitle] = useState('');

  const keyDownHandler = (e) => {
    if (e.key === 'Enter' && todoTitle.trim()) {
      handleEditedTodo(id, todoTitle);
    } else if (e.key === 'Escape') {
      setTodoTitle(title);
      handleEditedTodo(id, title);
    }
  };

  const handleBlur = (newTitle, todoId) => {
    handleEditedTodo(todoId, newTitle);
  };

  return (
    <li
      key={id}
      className={cn({
        completed,
        editing: isBeingEdited,
      })}

    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={() => checkTodo(id)}
          checked={completed}
        />
        <label
          onDoubleClick={() => {
            handleEditingTodo(id);
          }}
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
        onBlur={e => handleBlur(e.target.value, id)}
        value={todoTitle}
        onChange={(e) => {
          setTodoTitle(e.target.value);
        }}
        onKeyDown={keyDownHandler}
        type="text"
        className="edit"
      />
    </li>
  );
};

Todo.propTypes = {
  todo: TypeTodo.isRequired,
  removeItem: PropTypes.func.isRequired,
  checkTodo: PropTypes.func.isRequired,
  handleEditingTodo: PropTypes.func.isRequired,
  handleEditedTodo: PropTypes.func.isRequired,
};
