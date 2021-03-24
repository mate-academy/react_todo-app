import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TodosContext } from '../../TodosContext';

export const TodoItem = ({ id, title, completed }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editingInputValue, setEditingValue] = useState(title);
  const currentIndex = todos.findIndex(todo => todo.id === id);

  const handleCheckboxChange = () => {
    setTodos([
      ...todos.slice(0, currentIndex),
      {
        ...todos[currentIndex],
        completed: !todos[currentIndex].completed,
      },
      ...todos.slice(currentIndex + 1),
    ]);
  };

  const deleteTodoHandle = () => {
    setTodos([
      ...todos.slice(0, currentIndex),
      ...todos.slice(currentIndex + 1),
    ]);
  };

  const pressKeyHandler = (event) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setEditingValue(title);
    }

    if (event.key === 'Enter') {
      if (editingInputValue === '') {
        return;
      }

      setTodos([
        ...todos.slice(0, currentIndex),
        {
          ...todos[currentIndex],
          title: editingInputValue,
        },
        ...todos.slice(currentIndex + 1),
      ]);
      setIsEditing(false);
    }
  };

  document.addEventListener('click', (event) => {
    event.stopPropagation();
    if (event.target.classList.contains('edit')
      || event.target.classList.contains('new-todo')) {
      return;
    }

    setIsEditing(false);
  });

  return (
    <li
      key={id}
      className={classNames({ completed }, { editing: isEditing })}
      onDoubleClick={
        () => {
          setIsEditing(true);
        }
      }
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={handleCheckboxChange}

        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          onClick={deleteTodoHandle}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editingInputValue}
        onChange={
          (event) => {
            setEditingValue(event.target.value);
          }
        }
        onKeyDown={pressKeyHandler}
      />
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
