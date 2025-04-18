import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { DispatchContext } from '../../GlobalProvider/GlobalProvider';
import { title } from 'process';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDelete = (todoId: number) => {
    dispatch({ type: 'deleteTodo', payload: todoId });
  };

  const handleToggle = (value: number) => {
    dispatch({ type: 'updateTodoStatus', payload: value });
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (newTitle.trim() === '') {
      dispatch({ type: 'deleteTodo', payload: todo.id });

      return;
    }

    if (newTitle.trim() === todo.title.trim()) {
      setNewTitle(newTitle.trim());
      setIsEditing(false);

      return;
    }

    const updatedTodo: Todo = {
      id: todo.id,
      title: newTitle.trim(),
      completed: todo.completed,
    };

    dispatch({ type: 'updateTodoTitle', payload: updatedTodo });

    setIsEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleBlur = () => {
    handleUpdate();
  };

  const handleKeyDown = (even: React.KeyboardEvent) => {
    if (even.key === 'Escape') {
      setNewTitle(todo.title.trim());
      setIsEditing(false);
    }

    if (even.key === 'Enter') {
      if (newTitle !== title) {
        handleUpdate();
      } else if (newTitle.trim() === title.trim()) {
        setIsEditing(false);
      }
    }
  };

  const handleRenameSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setNewTitle(newTitle.trim());

    handleUpdate();
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
      key={todo.id}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          checked={todo.completed}
          className="todo__status"
          onClick={() => handleToggle(todo.id)}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleRenameSubmit}>
          <input
            data-cy="TodoTitleField"
            ref={inputRef}
            type="text"
            placeholder="What needs to be editing?"
            className="todo__title-field"
            value={newTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          onDoubleClick={handleDoubleClick}
          className="todo__title"
        >
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => handleDelete(todo.id)}
        >
          ×
        </button>
      )}
    </div>
  );
};
