import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import { TodosContext } from '../../TodosContext';

export const TodoItem = ({ id, title, completed }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [wasDoubleClicked, setWasDoubleClicked] = useState(false);
  const [editingTitle, setEditingTitle] = useState(title);

  const handleTodoComplete = () => {
    setTodos(todos.map(todo => (
      (todo.id !== id)
        ? todo
        : {
          ...todo,
          completed: !todo.completed,
        }
    )));
  };

  const handleTodoDelete = () => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleDoubleClick = () => {
    setWasDoubleClicked(previousState => !previousState);
  };

  const handleEditingTitle = (handleEvent) => {
    const { value } = handleEvent.target;

    setEditingTitle(value);
  };

  const handleKeyDown = (handleEvent) => {
    if (handleEvent.key === 'Enter') {
      setWasDoubleClicked(false);
      setTodos(todos.map(todo => (
        (todo.id !== id)
          ? todo
          : {
            ...todo,
            title: editingTitle,
          }
      )));
    }

    if (handleEvent.key === 'Escape') {
      setWasDoubleClicked(false);
      setEditingTitle(title);
    }
  };

  return (
    <li
      className={className(
        completed ? 'completed' : '',
        wasDoubleClicked ? 'editing' : '',
      )}
      onDoubleClick={handleDoubleClick}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={handleTodoComplete}
          checked={completed}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          onClick={handleTodoDelete}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editingTitle}
        onChange={handleEditingTitle}
        onKeyDown={handleKeyDown}
        required
      />
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
