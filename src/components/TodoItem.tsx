import { Todo } from '../types/Todo';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatchTodos } from '../context/TodoContext';
import cn from 'classnames';
type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatchTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  useEffect(() => {
    setEditedTitle(todo.title);
  }, [todo.title]);

  const deleteTodo = () => {
    dispatch({ type: 'deleteTodo', payload: todo.id });
  };

  /* const updateTodo = () => {
    dispatch({
      type: 'updateTodo',
      payload: { id: todo.id, title: editedTitle },
    });
    setIsEditing(false);
  };*/

  const toggleTodo = () => {
    dispatch({ type: 'toggleTodo', payload: todo.id });
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditedTitle(todo.title);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const formSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = editedTitle.trim();

    if (!trimmedTitle) {
      dispatch({ type: 'deleteTodo', payload: todo.id });

      return;
    }

    if (trimmedTitle === todo.title) {
      setIsEditing(false);

      return;
    }

    dispatch({
      type: 'updateTodo',
      payload: {
        title: trimmedTitle,
        id: todo.id,
      },
    });
    setIsEditing(false);
  };

  const escapeClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(todo.title);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    formSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          aria-label="Toggle todo"
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={toggleTodo}
        />
      </label>
      {isEditing ? (
        <form
          onSubmit={formSubmit}
          //className={cn('todo__edit-form', { hidden: !isEditing })}
        >
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={escapeClick}
            autoFocus
          />
        </form>
      ) : (
        <div>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={deleteTodo}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};
