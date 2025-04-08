/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Types';
import { TodoContext } from '../../utils/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);

  const { renameTodo, deleteTodo, toggleTodo } = useContext(TodoContext);

  const startTitleChange = () => {
    setIsEdited(true);
    setTodoTitle(todo.title);
  };

  const endTitleInput = useCallback(() => {
    setIsEdited(false);
    setTodoTitle(todo.title);
  }, [todo.title]);

  const handleEscapePress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        endTitleInput();
      }
    },
    [endTitleInput],
  );

  const onRemove = () => deleteTodo(todo.id);

  const onToggle = () => toggleTodo(todo.id);

  const onRename = (newTitle: string) => renameTodo(todo.id, newTitle);

  const handleTodoRenameSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const titleToSubmit = todoTitle.trim();

    if (!titleToSubmit) {
      endTitleInput();
      onRemove();

      return;
    }

    if (titleToSubmit === todo.title) {
      endTitleInput();

      return;
    }

    onRename(titleToSubmit);
    endTitleInput();
  };

  const handleTitleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTodoTitle(event.target.value);
  };

  useEffect(() => {
    document.addEventListener('keyup', handleEscapePress);

    return () => document.removeEventListener('keyup', handleEscapePress);
  }, [handleEscapePress]);

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={onToggle}
        />
      </label>

      {isEdited ? (
        <form onSubmit={handleTodoRenameSubmit} onBlur={handleTodoRenameSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={todoTitle}
            onChange={handleTitleInputChange}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={startTitleChange}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={onRemove}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
});

TodoItem.displayName = 'TodoItem';
