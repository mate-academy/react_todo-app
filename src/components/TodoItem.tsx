/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';

import { Todo, TodoPropsToUpdate } from '../types/todo';

type Props = {
  todo: Todo
  onTodoDelete: (todoId: number) => void
  onTodoUpdate: (todoId: number, propsToUpdate: TodoPropsToUpdate) => Promise<void>
};

const TodoItem: React.FC<Props> = ({ todo, onTodoDelete, onTodoUpdate }) => {
  const [inputTitle, setInputTitle] = useState(todo.title);

  const [editing, setEditing] = useState(false);

  const inputElement = useRef<HTMLInputElement>(null);

  const updateCompleted = (completed: boolean) => {
    onTodoUpdate(todo.id, { completed });
  };

  const updateTitle = (title: string) => {
    onTodoUpdate(todo.id, { title });
  };

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setInputTitle(todo.title);
      inputElement.current?.blur();
    }
  }, [todo]);

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      inputElement.current?.blur();
    }
  };

  const onInputBlur = () => {
    setEditing(false);
    if (!inputTitle) {
      onTodoDelete(todo.id);
    } else if (inputTitle !== todo.title) {
      updateTitle(inputTitle);
    }

    document.removeEventListener('keyup', escFunction);
  };

  return (
    <li
      key={todo.id}
      className={classNames(
        { completed: todo.completed },
        { editing },
      )}
      onDoubleClick={() => {
        setEditing(true);
        document.addEventListener('keyup', escFunction);
        requestAnimationFrame(() => {
          inputElement.current?.focus();
        });
      }}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={(event) => updateCompleted(event.target.checked)}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => onTodoDelete(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={inputElement}
        value={inputTitle}
        onChange={event => setInputTitle(event.target.value)}
        onBlur={() => onInputBlur()}
        onKeyPress={handleEnterPress}
      />
    </li>
  );
};

export default TodoItem;
