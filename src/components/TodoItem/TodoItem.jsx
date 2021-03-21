import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TodosContext, GlobalState } from '../../TodosContext';

export const TodoItem = ({ id, title, completed }) => {
  const { todos, setNewTodos } = useContext(TodosContext);
  const state = useContext(GlobalState);
  const [editing, setIsEditing] = useState(false);
  const [editingInputValue, setEditingValue] = useState(title);
  const currentIndex = todos.findIndex(todo => todo.id === id);

  state.fun = () => {
    setIsEditing(false);
  };

  const checkboxChangeHandle = () => {
    setNewTodos([
      ...todos.slice(0, currentIndex),
      {
        ...todos[currentIndex],
        completed: !todos[currentIndex].completed,
      },
      ...todos.slice(currentIndex + 1),
    ]);
  };

  const deleteTodoHandle = () => {
    setNewTodos([
      ...todos.slice(0, currentIndex),
      ...todos.slice(currentIndex + 1),
    ]);
  };

  return (
    <li
      key={id}
      className={classNames({ completed }, { editing })}
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
          onChange={checkboxChangeHandle}

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
        onKeyDown={
          (event) => {
            if (event.key === 'Escape') {
              setIsEditing(false);
            }

            if (event.key === 'Enter') {
              setNewTodos([
                ...todos.slice(0, currentIndex),
                {
                  ...todos[currentIndex],
                  title: editingInputValue,
                },
                ...todos.slice(currentIndex + 1),
              ]);
              setIsEditing(false);
            }
          }
        }
      />
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
