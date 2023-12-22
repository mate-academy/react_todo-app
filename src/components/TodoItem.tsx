/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Keys, Todo } from '../types';
import { todos } from '../signals/todos-signal';

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { id, title, completed } = todo;
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && isEdited) {
      inputRef.current.focus();
    }
  }, [isEdited]);

  const updateTodoValue = (key: keyof Todo, newValue: string | boolean) => {
    todos.value = todos.value.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          [key]: newValue,
        };
      }

      return t;
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    updateTodoValue('completed', checked);
  };

  const handleDeleteTodo = () => {
    todos.value = todos.value.filter(t => t.id !== id);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const finishEditing = () => {
    if (!inputValue.trim()) {
      handleDeleteTodo();
    } else {
      updateTodoValue('title', inputValue);
    }

    setIsEdited(false);
  };

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case Keys.Enter:
        finishEditing();
        break;

      case Keys.Escape:
        event.stopPropagation();
        setIsEdited(false);
        setInputValue(title);
        break;

      default:
        break;
    }
  };

  return (
    <li className={classNames({ completed, editing: isEdited })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={onChange}
        />
        <label onDoubleClick={() => setIsEdited(true)}>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteTodo}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={inputRef}
        value={inputValue}
        onInput={handleInput}
        onBlur={finishEditing}
        onKeyUp={handleOnKeyUp}
      />
    </li>
  );
};
