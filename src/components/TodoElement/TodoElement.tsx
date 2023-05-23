import classNames from 'classnames';
import React, { FC, useEffect, useRef } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  handleDelete: (id: number) => void;
  handleToggle: (id: number, completed: boolean) => void;
  handleRename: (id: number, title: string) => void;
  handleBlur: () => void;
  handleCancelEditing: (e: React.KeyboardEvent) => void;
  currTodoId: number;
  currTodoTitle: string;
  setCurrTodoTitle: (currTodoTitle: string) => void;
}

export const TodoElement: FC<Props> = (
  {
    todo,
    handleDelete,
    handleToggle,
    handleRename,
    handleBlur,
    currTodoId,
    currTodoTitle,
    setCurrTodoTitle,
    handleCancelEditing,
  },
) => {
  const { title, id, completed } = todo;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currTodoId]);

  return (
    <li className={classNames('todo', { completed })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() => handleToggle(id, completed)}
          id="toggle-view"
        />
        {currTodoId !== id ? (
          <>
            <label
              onDoubleClick={() => handleRename(id, title)}
            >
              {title}
            </label>
            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              aria-label="deleteTodo"
              onClick={() => handleDelete(id)}
            />
          </>
        ) : (
          <form onSubmit={handleBlur}>
            <input
              type="text"
              className="new-todo"
              ref={inputRef}
              value={currTodoTitle}
              onKeyUp={handleCancelEditing}
              placeholder="Empty todo will be deleted"
              onBlur={handleBlur}
              onChange={(e) => setCurrTodoTitle(e.target.value)}
            />
          </form>
        )}
      </div>
    </li>
  );
};
