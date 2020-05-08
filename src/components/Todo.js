import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Todo = ({
  id,
  title,
  completed,
  changeTodoStatus,
  deleteTodo,
  changeTodoValue,
}) => {
  const [isEdit, showTodoInput] = useState(false);
  const [editedTitle, changeInputValue] = useState(title);
  /* const [isError, showErrorClass] = useState(false); */
  const ref = useRef(null);

  const handleInputValue = (e) => {
    if (e.key === 'Escape') {
      showTodoInput(false);

      return;
    }

    if (e.key === 'Enter') {
      const newTitle = editedTitle.trim();

      if (newTitle) {
        changeTodoValue(e, newTitle);
        showTodoInput(false);
      }
    }
  };

  const handleClickOutside = (event) => {
    if (ref.current.id && !ref.current.contains(event.target)) {
      showTodoInput(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <li className={classNames({
      editing: isEdit, completed,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={id}
          checked={completed}
          onClick={() => changeTodoStatus(id)}
        />
        <label
          htmlFor={id}
          onDoubleClick={() => showTodoInput(true)}
        >
          {title}
        </label>
        <button
          type="button"
          id={id}
          className="destroy"
          onClick={() => deleteTodo(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={ref}
        id={id}
        value={editedTitle}
        onChange={e => changeInputValue(e.target.value)}
        onKeyDown={handleInputValue}
      />
    </li>
  );
};

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  changeTodoStatus: PropTypes.func.isRequired,
  changeTodoValue: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default Todo;
