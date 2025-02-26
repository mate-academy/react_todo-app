import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../../TodoContext';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { removeTodo, changeTodo } = useContext(TodoContext);

  const [title, setTitle] = useState(todo.title);
  const [beingEdited, setBeingEdited] = useState(false);

  const setCompleted = (value: boolean) => {
    changeTodo({ ...todo, completed: value } as Todo, todo.id);
  };

  const updateTitle = (value: string) => {
    changeTodo({ ...todo, title: value } as Todo, todo.id);
  };

  const saveTitle = (newTitle: string) => {
    if (title.trim() === '') {
      removeTodo(todo.id);

      return;
    }

    updateTitle(newTitle.trim());
    setBeingEdited(false);
  };

  const handleTitleSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    event.preventDefault();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const handleCheckbox = () => setCompleted(!todo.completed);

  const handleDoubleClick = () => setBeingEdited(true);

  const handleTitleBlur = () => {
    saveTitle(title);
  };

  const handleKeyup = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setBeingEdited(false);
      setTitle(todo.title);
    } else if (event.key === 'Enter') {
      saveTitle(title);
    }
  };

  useEffect(() => {
    if (beingEdited) {
      document.addEventListener('keyup', handleKeyup);

      return () => {
        document.removeEventListener('keyup', handleKeyup);
      };
    }

    return;
  });

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
      onDoubleClick={handleDoubleClick}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={todo.completed}
          onChange={handleCheckbox}
        />
      </label>
      {beingEdited ? (
        <form onSubmit={handleTitleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            autoFocus
            value={title}
            onBlur={handleTitleBlur}
            onChange={handleTitleChange}
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => removeTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
