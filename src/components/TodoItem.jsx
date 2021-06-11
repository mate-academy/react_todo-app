import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { DispatchContext } from '../context/TodosContext';
import { actions } from '../context/reducer';

export function TodoItem({ id, title, completed }) {
  const [newTitle, setNewTitle] = useState(title);
  const [editing, setEditing] = useState(false);

  const dispatch = useContext(DispatchContext);

  const handleSave = () => {
    setEditing(false);
    dispatch(actions.updateTodo(id, newTitle));
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
          onChange={() => dispatch(actions.toggle(id))}
        />
        <label
          onDoubleClick={() => setEditing(true)}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => dispatch(actions.delete(id))}
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
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  completed: PropTypes.bool,
};

TodoItem.defaultProps = {
  title: '',
  completed: false,
};
