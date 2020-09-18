import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoItem = ({
  id, title, completed, todos, setTodos, changeCompleted, changeTitle,
}) => {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleChange = (event) => {
    setNewTitle(event.target.value.trimLeft());
  };

  const handleEdit = (event) => {
    if (event.key === 'Enter' && newTitle) {
      changeTitle(id, newTitle);
      setEdit(false);
    }

    if (event.key === 'Escape') {
      setEdit(false);
    }
  };

  const handleSaveChanges = () => {
    if (newTitle) {
      changeTitle(id, newTitle);
      setEdit(false);
    } else {
      setEdit(false);
    }
  };

  return (
    <li
      key={id}
      className={classNames({
        completed,
        editing: edit,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() => changeCompleted(id)}
        />
        <label
          onDoubleClick={() => setEdit(true)}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => setTodos(
            todos.filter(todo => todo.id !== id),
          )}
        />
      </div>
      <input
        type="text"
        className="edit"
        defaultValue={title}
        onChange={handleChange}
        onKeyDown={handleEdit}
        onBlur={handleSaveChanges}
      />
    </li>
  );
};

TodoItem.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  changeTitle: PropTypes.func.isRequired,
  changeCompleted: PropTypes.func.isRequired,
  setTodos: PropTypes.func.isRequired,
};
