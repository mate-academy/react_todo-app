import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../../styles/index.css';

export const TodoItem = (props) => {
  const [newTitle, setNewTitle] = useState('');
  const [editStatus, setEditStatus] = useState(false);

  const {
    completeTodo,
    itemId,
    itemTitle,
    deleteTodo,
    itemCompleted,
    onAddNewTitle,
  } = props;

  const soldCheckbox = () => {
    completeTodo(itemId);
  };

  const onBlur = () => {
    if (editStatus && (newTitle.length > 0)) {
      const obj = {
        id: itemId,
        title: newTitle,
      };

      onAddNewTitle(obj);

      setEditStatus(false);
      setNewTitle('');
    }
  };

  const onKeyPush = (keyPush) => {
    if (keyPush === 'Enter') {
      onBlur();
    } else if (keyPush === 'Escape') {
      onAddNewTitle(itemTitle);

      setEditStatus(false);
      setNewTitle('');
    }
  };

  return (
    <>
      <li className={classNames({
        completed: itemCompleted,
        editing: editStatus,
      })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={itemCompleted}
            onChange={() => soldCheckbox()}
          />

          {!editStatus && (
            <label
              onDoubleClick={() => setEditStatus(true)}
            >
              {itemTitle}
            </label>
          )}

          <button
            type="button"
            className="destroy"
            value={itemId}
            onClick={event => deleteTodo(event.target.value)}
          />
        </div>

        {editStatus && (
          <input
            type="text"
            className="edit"
            value={newTitle}
            onChange={(event => setNewTitle(event.target.value))}
            onKeyDown={event => onKeyPush(event.key)}
            onBlur={onBlur}
          />
        )}
      </li>
    </>
  );
};

TodoItem.propTypes = {
  onAddNewTitle: PropTypes.func.isRequired,
  itemCompleted: PropTypes.bool.isRequired,
  completeTodo: PropTypes.func.isRequired,
  itemId: PropTypes.number.isRequired,
  itemTitle: PropTypes.string.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
