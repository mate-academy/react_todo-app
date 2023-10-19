/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import cn from 'classnames';

import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../context/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { toggleStatus, onDeleteTodo, onUpdateTodo } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [updateField, setUpdateField] = useState(todo.title || '');
  const [firstTitle, setFirstTitle] = useState(todo.title);

  useEffect(() => {
    setFirstTitle(todo.title || '');
    setUpdateField(todo.title || '');
  }, [todo]);

  const inputRef = useRef<HTMLInputElement>(null);

  const onDoubleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    inputRef.current?.focus();

    if (event.detail === 2) {
      setIsEditing(true);
    }
  };

  const onKeyUp = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setUpdateField(firstTitle);
    }

    if (event.key === 'Enter') {
      setIsEditing(false);

      if (updateField.length === 0) {
        onDeleteTodo(todo.id);
      }
    }
  };

  const onEditTodo = (currentTodo: Todo) => {
    onUpdateTodo(currentTodo.title, updateField);
  };

  return (
    <li
      onClick={onDoubleClick}
      onKeyUp={onKeyUp}
      className={cn({ completed: todo.completed, editing: isEditing })}
    >
      <div className="view">
        <input
          onChange={() => toggleStatus(todo.id)}
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onDeleteTodo(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={inputRef}
        value={updateField}
        onChange={(e) => {
          setUpdateField(e.target.value);
        }}
        onBlur={() => onEditTodo(todo)}
      />
    </li>
  );
};
