import React, { useState } from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoItem = ({
  todo,
  key,
  handleStatus,
  deleteTodo,
  changeTodo,
}) => {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const handleEdit = (event) => {
    if (event.key === 'Enter' && newTitle) {
      changeTodo(todo.id, newTitle);
      setEdit(false);
      setNewTitle('');
    }

    if (event.key === 'Escape') {
      setNewTitle('');
      setEdit(false);
    }
  };

  return (
    <li key={key} className={ClassNames({ completed: todo.completed, edit })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => handleStatus(todo.id)}
        />
        <label onDoubleClick={() => setEdit(true)}>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
      {edit && (
        <input
          type="text"
          className="editing"
          onChange={event => setNewTitle(event.target.value.trimLeft())}
          onKeyDown={handleEdit}
          autoFocus
        />
      )}
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.objectOf.isRequired,
  key: PropTypes.number.isRequired,
  handleStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTodo: PropTypes.func.isRequired,
};
