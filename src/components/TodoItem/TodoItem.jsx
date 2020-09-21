import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoItem = ({
  id,
  title,
  completed,
  editing,
  changeStatus,
  deleteTodo,
  onTodoEdit,
  changeTitle,
}) => {
  const [newTitle, setNewTitle] = useState(title);

  return (
    <li
      className={classNames({
        view: !completed,
        completed,
        editing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          checked={completed}
          className="toggle"
          onChange={() => {
            changeStatus(id);
          }}
        />
        <label
          onDoubleClick={() => {
            onTodoEdit(id);
          }}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => {
            deleteTodo(id);
          }}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={(event) => {
          setNewTitle(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            changeTitle(id, newTitle);

            setNewTitle('');
            onTodoEdit(id);
          }

          if (event.key === 'Escape') {
            setNewTitle('');
            onTodoEdit(id);
          }
        }}
      />
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  changeStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  onTodoEdit: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
};
