/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../../types/Todo';
import classNames from 'classnames';
import { useTodoDispatch } from '../../../context/todoContext';

type Props = {
  todo: Todo;
};
export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputTitleRef = useRef<HTMLInputElement>(null);

  const { updateTodo, deleteTodo, toggleComplete } = useTodoDispatch();

  const handleTitleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTitle = inputTitleRef.current?.value.trim() || '';

    if (!newTitle) {
      deleteTodo(todo.id);

      return;
    }

    if (newTitle === todo.title) {
      setIsEditing(false);

      return;
    }

    updateTodo(todo.id, { title: newTitle });
    setIsEditing(false);
  };

  const handleRemoveTodo = () => {
    deleteTodo(todo.id);
  };

  const handleUpdateTodo = async () => {
    toggleComplete(todo.id);
  };

  useEffect(() => {
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsEditing(false);
      }
    };

    document.addEventListener('keydown', handleEscapePress);

    return () => {
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, []);

  useEffect(() => {
    if (isEditing && inputTitleRef.current) {
      inputTitleRef.current.focus();
      inputTitleRef.current.value = todo.title;
    }
  }, [isEditing, todo.title]);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
      key={todo.id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleUpdateTodo}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleFormSubmit} onBlur={handleFormSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Leave empty to delete this todo..."
            ref={inputTitleRef}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleTitleDoubleClick}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleRemoveTodo}
          >
            ×
          </button>
        </>
      )}

      <div data-cy="TodoLoader" className={classNames('modal', 'overlay')}>
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
});

TodoItem.displayName = 'TodoItem';
