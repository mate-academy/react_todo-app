import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../../styles/index.css';

export const TodoItem = (props) => {
  const [newTitle, setNewTitle] = useState('');
  const [editStatus, setEditStatus] = useState(false);

  const {
    item,
    completeTodo,
    deleteTodo,
    onAddNewTitle,
  } = props;

  const onBlur = () => {
    if (editStatus && (newTitle.length > 0)) {
      const obj = {
        id: item.id,
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
      onAddNewTitle(item.title);

      setEditStatus(false);
      setNewTitle('');
    }
  };

  return (
    <>
      <li className={classNames({
        completed: item.completed,
        editing: editStatus,
      })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={item.completed}
            onChange={() => completeTodo(item.id)}
          />

          {!editStatus && (
            <label
              onDoubleClick={() => setEditStatus(!editStatus)}
            >
              {item.title}
            </label>
          )}

          <button
            type="button"
            className="destroy"
            onClick={() => deleteTodo(item.id)}
          />
        </div>

        {editStatus && (
          <input
            type="text"
            className="edit"
            value={newTitle}
            onChange={(event => setNewTitle(event.target.value))}
            onKeyDown={onKeyPush}
            onBlur={onBlur}
          />
        )}
      </li>
    </>
  );
};

TodoItem.propTypes = {
  onAddNewTitle: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }),
};

TodoItem.defaultProps = {
  item: {},
};
