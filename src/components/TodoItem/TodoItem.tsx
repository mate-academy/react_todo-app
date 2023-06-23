import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  filteredTodos: Todo[],
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  setAllTodos: (todos: Todo[]) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  filteredTodos,
  onToggleTodo,
  onDeleteTodo,
  setAllTodos,
}) => {
  const { id, title, completed } = todo;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const renameTodo = (todoId: number, updatedTitle: string) => {
    setAllTodos(
      filteredTodos.map(item => (
        item.id === todoId
          ? { ...item, title: updatedTitle }
          : item
      )),
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!editedTitle) {
      onDeleteTodo(id);

      return;
    }

    if (editedTitle !== title) {
      renameTodo(todo.id, editedTitle);
    }

    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }

    if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <li
      className={classNames(
        { completed: todo.completed },
        { editing: isEditing },
      )}
      onDoubleClick={() => {
        setIsEditing(!isEditing);
      }}
    >
      { !isEditing
        ? (
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={completed}
              onChange={() => onToggleTodo(id)}
            />

            <label>{title}</label>

            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              aria-label="deleteTodo"
              onClick={() => onDeleteTodo(id)}
            />
          </div>
        ) : (
          <input
            type="text"
            className="edit"
            placeholder="Empty todo will be deleted"
            value={editedTitle}
            ref={inputRef}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            onBlur={handleSubmit}
          />
        )}
    </li>
  );
};
