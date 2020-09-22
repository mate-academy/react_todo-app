import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { changeCompletedTodo, deleteTodo, changeTitle } from '../store/todos';

export const TodoItem = ({
  id,
  title,
  completed,
}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [titleTodo, setTitleTodo] = useState(title);

  const handleKey = (event) => {
    const trimTitle = titleTodo.trim();

    if (event.keyCode === 13) {
      if (trimTitle === '') {
        dispatch(deleteTodo(id));
      }

      dispatch(changeTitle(trimTitle, id));
      setTitleTodo(trimTitle);
      setIsEditing(false);
    } else if (event.keyCode === 27) {
      setTitleTodo(title);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    if (titleTodo === '') {
      dispatch(deleteTodo(id));
    }

    setIsEditing(false);
    dispatch(changeTitle(titleTodo.trim(), id));
    setTitleTodo(titleTodo.trim());
  };

  return (
    <li
      className={classNames(
        { completed },
        { editing: isEditing },
      )}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() => dispatch(changeCompletedTodo(id))}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => dispatch(deleteTodo(id))}
        />
      </div>
      {isEditing && (
        <input
          type="text"
          className="edit"
          value={titleTodo}
          onChange={event => setTitleTodo(event.target.value)}
          onKeyUp={handleKey}
          autoFocus
          onBlur={() => handleBlur()}
        />
      )}
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
