/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/todo/Todo';

type Props = {
  todo: Todo;
  onTodoDelete: (todoId: number) => void;
  onTodoUpdate: (
    todoId: number,
    todoDataToUpdate: Partial<Pick<Todo, 'title' | 'completed'>>,
  ) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onTodoDelete,
  onTodoUpdate,
}) => {
  const [isEditingTitleFormOpened, setIsEditingTitleFormOpened] =
    useState(false);
  const [editingTitle, setEditingTitle] = useState(todo.title);
  const editingTitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingTitleFormOpened) {
      editingTitleInputRef.current?.focus();
    }
  }, [isEditingTitleFormOpened]);

  const handleChangeTodoStatus = () => {
    onTodoUpdate(todo.id, { completed: !todo.completed });
  };

  const handleDeleteTodo = () => {
    onTodoDelete(todo.id);
  };

  const handleUpdateTodoOrDeleteIfEditingTextIsEmpty = (
    event?: React.FormEvent<HTMLFormElement>,
  ) => {
    if (event) {
      event.preventDefault();
    }

    const trimmedEditingTitle = editingTitle.trim();

    if (trimmedEditingTitle === todo.title) {
      setIsEditingTitleFormOpened(false);

      return;
    }

    if (editingTitle) {
      onTodoUpdate(todo.id, { title: trimmedEditingTitle });
    } else {
      onTodoDelete(todo.id);
    }

    setIsEditingTitleFormOpened(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditingTitle(todo.title);
      setIsEditingTitleFormOpened(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={cn('todo', { completed: todo.completed })}
      onDoubleClick={() => setIsEditingTitleFormOpened(true)}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className={'todo__status'}
          checked={todo.completed}
          onChange={handleChangeTodoStatus}
        />
      </label>

      {isEditingTitleFormOpened ? (
        <form
          onSubmit={event =>
            handleUpdateTodoOrDeleteIfEditingTextIsEmpty(event)
          }
        >
          <input
            ref={editingTitleInputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editingTitle}
            onChange={event => setEditingTitle(event.target.value.trimStart())}
            onBlur={() => handleUpdateTodoOrDeleteIfEditingTextIsEmpty()}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className={'todo__remove'}
            data-cy="TodoDelete"
            onClick={handleDeleteTodo}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
