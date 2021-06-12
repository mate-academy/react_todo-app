import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { DispatchContext } from '../context/TodosContext';
import { actions } from '../context/reducer';
import { deleteTodo, toggleTodo, renameTodo } from '../api';

export function TodoItem({ id, title, completed }) {
  const [newTitle, setNewTitle] = useState(title);
  const [editing, setEditing] = useState(false);

  const dispatch = useContext(DispatchContext);

  const handleSave = () => {
    if (newTitle !== title) {
      const oldTitle = title;

      dispatch(actions.updateTodo(id, newTitle));
      setEditing(false);

      renameTodo(id, newTitle)
        .catch(() => {
          dispatch(actions.updateTodo(id, oldTitle));
          setNewTitle(oldTitle);
        });
    }
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
        handleSave();
        break;

      case 'Escape':
        setNewTitle(title);
        setEditing(false);
        break;

      default:
        break;
    }
  };

  const handleDelete = () => {
    deleteTodo(id)
      .then(() => dispatch(actions.delete(id)))
      .catch(error => alert(`Failed to delete item ${title}; ${error}`));
  };

  const handleToggle = () => {
    toggleTodo(id, !completed)
      .then(() => dispatch(actions.toggle(id)))
      .catch(error => alert(`Failed to toggle item ${title}; ${error}`));
  };

  return (
    <li
      className={cn({
        completed, editing,
      })}
    >
      <div
        className="view"
      >
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={handleToggle}
        />
        <label
          onDoubleClick={() => setEditing(true)}
        >
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
        onChange={e => setNewTitle(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
      />
    </li>
  );
}

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  completed: PropTypes.bool,
};

TodoItem.defaultProps = {
  title: '',
  completed: false,
};
