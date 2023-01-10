import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Loading } from '../../types/Loading';
import { Renaming } from '../../types/Renaming';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  isLoading: Loading,
  isRenaming: Renaming,
  handleMarkChange: (id: number, isCompleted: boolean) => void,
  handleDeleteTodoClick: (id: number) => void,
  setIsRenaming: (obj: Renaming) => void,
  handleRenamingSubmit: (
    e: React.FormEvent,
    id: number,
    prevTitle: string,
    title: string,
  ) => void,
};

export const TodoItem: React.FC<Props> = (
  {
    todos,
    isLoading,
    isRenaming,
    handleMarkChange,
    handleDeleteTodoClick,
    setIsRenaming,
    handleRenamingSubmit,
  },
) => {
  const [titleRenaming, setTitleRenaming] = useState('');

  const renamingField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (renamingField.current) {
      renamingField.current.focus();
    }
  }, [isRenaming]);

  const handleKeyUp = (keyCode: string) => {
    if (keyCode !== 'Escape') {
      return;
    }

    setIsRenaming({});
  };

  return (
    <>
      {todos.map(todo => (
        <div
          key={todo.id}
          className={classNames(
            'todo',
            { completed: todo.completed },
          )}
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={
                () => handleMarkChange(todo.id, todo.completed)
              }
            />
          </label>

          {isRenaming[todo.id]
            ? (
              <form
                onSubmit={(e) => {
                  handleRenamingSubmit(
                    e,
                    todo.id,
                    todo.title,
                    titleRenaming,
                  );
                }}
              >
                <input
                  type="text"
                  ref={renamingField}
                  className="todo__title-field"
                  value={titleRenaming}
                  placeholder="Empty todo will be deleted"
                  onChange={(e) => setTitleRenaming(e.target.value)}
                  onFocus={() => setTitleRenaming(todo.title)}
                  onBlur={() => setIsRenaming({})}
                  onKeyUp={(e) => handleKeyUp(e.code)}
                />
              </form>
            )
            : (
              <>
                <span
                  className="todo__title"
                  onDoubleClick={() => setIsRenaming({ [todo.id]: true })}
                >
                  {todo.title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                  onClick={() => handleDeleteTodoClick(todo.id)}
                >
                  ×
                </button>
              </>
            )}

          <div
            className={classNames(
              'modal overlay',
              { 'is-active': isLoading[todo.id] },
            )}
          >
            <div className="loader" />
          </div>
        </div>
      ))}
    </>
  );
};
