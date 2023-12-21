/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types';
import { todos } from '../signals/todos-signal';

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  // eslint-disable-next-line
  console.log('TodoItem render');
  const { id, title, completed } = todo;
  const [isEdited, setIsEdited] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && isEdited) {
      inputRef.current.focus();
    }
  }, [isEdited]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    todos.value = todos.value.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          completed: checked,
        };
      }

      return t;
    });
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
    }

    setIsEdited(false);
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
      />
    </li>
  );
};
