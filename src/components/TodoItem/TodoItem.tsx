import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  deleteTodo: (id: number) => void;
  handleToggle: (
    event: React.ChangeEvent<HTMLInputElement>, id: number) => void;
  editingTitle: (id: number, title: string) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  deleteTodo,
  handleToggle,
  editingTitle,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: isEditing,
      })}
      hidden={false}
      onDoubleClick={(event) => {
        if (event.target !== inputRef.current) {
          setIsEditing(true);
        }
      }}
    >
      { isEditing ? (
        <input
          type="text"
          ref={inputRef}
          className="edit"
          value={editingValue}
          onChange={(event) => {
            setEditingValue(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              if (editingValue.trim() === '') {
                deleteTodo(todo.id);
              } else {
                editingTitle(todo.id, editingValue);
                setIsEditing(false);
              }
            } else if (event.key === 'Escape') {
              setIsEditing(false);
              setEditingValue(todo.title);
            }
          }}
          onBlur={() => {
            if (editingValue.trim() === '') {
              deleteTodo(todo.id);
            } else {
              editingTitle(todo.id, editingValue);
              setIsEditing(false);
            }
          }}
        />
      ) : (
        <div
          className="view"
        >
          <input
            type="checkbox"
            ref={inputRef}
            className="toggle"
            id={`${todo.id}`}
            checked={todo.completed}
            onChange={(event) => {
              handleToggle(event, todo.id);
            }}
          />
          <label>
            {todo.title}
          </label>
          <button
            aria-label="Mute volume"
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
      )}
    </li>
  );
};
