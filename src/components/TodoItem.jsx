import React, { useState, useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TodosContext } from '../context/TodosContext';
import { actions } from '../reducers/todosReducer';
import { deleteTodo, toggleTodo, renameTodo } from '../api';
import { INVALID_TODO_ID } from '../constants';

export function TodoItem({ id, title, completed, editing, onEdit }) {
  const [newTitle, setNewTitle] = useState(title);
  const { dispatch } = useContext(TodosContext);
  const textInput = useRef(null);

  useEffect(() => {
    if (editing) {
      textInput.current.focus();
    }
  }, [editing]);

  const handleSave = () => {
    const newTitleTrimmed = newTitle.trim();

    if (newTitleTrimmed && newTitleTrimmed !== title) {
      const oldTitle = title;

      dispatch(actions.updateTodo(id, newTitleTrimmed));
      setNewTitle(newTitleTrimmed);

      renameTodo(id, newTitleTrimmed)
        .catch(() => {
          dispatch(actions.updateTodo(id, oldTitle));
          setNewTitle(oldTitle);
        });
    } else if (!newTitleTrimmed) {
      handleDelete();
    }

    onEdit(INVALID_TODO_ID);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
        handleSave();
        break;

      case 'Escape':
        setNewTitle(title);
        onEdit(INVALID_TODO_ID);
        break;

      default:
        break;
    }
  };

  const handleDelete = () => {
    dispatch(actions.delete(id));
    deleteTodo(id)
      .catch(error => alert(`Failed to delete item ${title}; ${error}`));
  };

  const handleToggle = () => {
    dispatch(actions.toggle(id));
    toggleTodo(id, !completed)
      .catch(error => alert(`Failed to toggle item ${title}; ${error}`));
  };

  return (
    <>
      <div
        className="view"
      >
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={handleToggle}
        />
        <label onDoubleClick={() => onEdit(id)}>
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={handleDelete}
        />
      </div>

      <input
        type="text"
        className="edit"
        value={newTitle}
        ref={textInput}
        onChange={e => setNewTitle(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
      />
    </>
  );
}

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  completed: PropTypes.bool,
  editing: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
};

TodoItem.defaultProps = {
  title: '',
  completed: false,
  editing: false,
};
