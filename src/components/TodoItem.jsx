import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { DispatchContext } from '../context/TodosContext';
import { actions } from '../context/reducer';

export function TodoItem({ id, title, completed }) {
  const [newTitle, setNewTitle] = useState(title);
  const [editing, setEditing] = useState(false);

  const dispatch = useContext(DispatchContext);

  const handleSaveNewTitle = () => {
    setEditing(false);
  };

  return (
    <li
      className={cn({
        completed, editing,
      })}
    >
      <div
        className="view"
        onDoubleClick={() => setEditing(current => !current)}
      >
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() => dispatch(actions.toggle(id))}
        />
        <label>{title}</label>
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
        onBlur={() => setEditing(false)}
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
