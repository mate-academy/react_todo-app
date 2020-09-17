import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Context } from '../../context';

export const TodoItem = ({ todo, title, id }) => {
  const { removeTodo, toggleTodo, changeTodo } = useContext(Context);
  const [classes, setClasses] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const newClasses = classNames({
    completed: todo.completed,
    editing: classes,
  });

  const handleKeyUp = (key) => {
    switch (key) {
      case 'Enter':
        if (newTitle) {
          changeTodo(id, newTitle);
        }

        setClasses(false);
        break;

      case 'Escape':
        setClasses(false);
        break;

      default:
        break;
    }
  };

  return (
    <li className={newClasses}>
      <div className="view">
        <input
          type="checkbox"
          checked={todo.completed}
          className="toggle"
          onChange={() => toggleTodo(todo.id)}
        />
        <label
          onDoubleClick={() => setClasses(true)}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => removeTodo(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={({ target }) => setNewTitle(target.value.trimLeft())}
        onKeyUp={({ key }) => handleKeyUp(key)}
        onBlur={() => {
          newTitle && changeTodo(id, newTitle);
          setClasses(false);
        }}
      />
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    completed: PropTypes.bool,
  }).isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
