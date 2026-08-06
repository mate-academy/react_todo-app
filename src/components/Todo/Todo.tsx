/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import './Todo.scss';
import { useSetTodos } from '../../hooks/useSetTodos';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  id: number;
  title: string;
  completed: boolean;
}

export const Todo = ({ id, title, completed }: Props) => {
  const setTodos = useSetTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);

  const handleToggleCompleted = () => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !completed } : todo,
      ),
    );
  };

  const deleteTodo = () => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  };

  const updateTodo = () => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, title: tempTitle.trim() } : todo,
      ),
    );
  };

  const saveChanges = () => {
    if (tempTitle.trim().length === 0) {
      deleteTodo();

      return;
    }

    updateTodo();

    setIsEditing(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    saveChanges();
  };

  const handleEditInputKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Escape') {
      setIsEditing(false);

      setTempTitle(title);
    }
  };

  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [isEditing]);

  return (
    <div data-cy="Todo" className={classNames('todo', { completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleToggleCompleted}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            ref={editInputRef}
            onBlur={() => saveChanges()}
            onKeyUp={handleEditInputKeyUp}
            onChange={event => setTempTitle(event.target.value)}
            value={tempTitle}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo()}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
