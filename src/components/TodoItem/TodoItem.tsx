/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useTodosContext } from '../../context';

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const [isEnterPressed, setIsEnterPressed] = useState(false);
  const { toggleTodo, deleteTodo, editTodo } = useTodosContext();

  const handleToggleTodo = (id: number) => {
    toggleTodo(id);
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };

  const saveOrdelete = () => {
    if (editValue.trim() !== '') {
      editTodo(todo.id, editValue);
      setIsEditing(false);
      setEditValue(todo.title);
    } else {
      deleteTodo(todo.id);
      setIsEditing(false);
      setEditValue(todo.title);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEnterPressed(true);
    }

    if (event.key === 'Enter') {
      saveOrdelete();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setEditValue(todo.title);
    }
  };

  const handleOnBlur = () => {
    if (!isEnterPressed) {
      saveOrdelete();
    }
  };

  return (
    <li
      className={
        classNames({ completed: todo.completed }, { editing: isEditing })
      }
      // className={todo.completed ? 'completed' : ''}
      onDoubleClick={() => {
        handleDoubleClick();
      }}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`${todo.id}`}
          checked={todo.completed}
          onChange={() => {
            handleToggleTodo(todo.id);
          }}
        />
        <label htmlFor={`${todo.id}`}>
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => {
            handleDeleteTodo(todo.id);
          }}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editValue}
        onChange={handleEdit}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onBlur={handleOnBlur}
      />
    </li>
  );
};
