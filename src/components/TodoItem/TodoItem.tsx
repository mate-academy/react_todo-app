import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Loading } from '../../types/Loading';
import { Renaming } from '../../types/Renaming';
import { Todo } from '../../types/Todo';
import { Modal } from '../Modal';

type Props = {
  todos: Todo[],
  loading: Loading,
  renaming: Renaming,
  handleMarkChange: (id: number, isCompleted: boolean) => void,
  handleDeleteTodoClick: (id: number) => void,
  setRenaming: (obj: Renaming) => void,
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
    loading,
    renaming,
    handleMarkChange,
    handleDeleteTodoClick,
    setRenaming,
    handleRenamingSubmit,
  },
) => {
  const [titleRenaming, setTitleRenaming] = useState('');

  const renamingField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (renamingField.current) {
      renamingField.current.focus();
    }
  }, [renaming]);

  const handleKeyUp = (keyCode: string) => {
    if (keyCode !== 'Escape') {
      return;
    }

    setRenaming({});
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

          {renaming[todo.id]
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
                  onBlur={() => setRenaming({})}
                  onKeyUp={(e) => handleKeyUp(e.code)}
                />
              </form>
            )
            : (
              <>
                <span
                  className="todo__title"
                  onDoubleClick={() => setRenaming({ [todo.id]: true })}
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

          <Modal
            loading={loading}
            todoId={todo.id}
          />
        </div>
      ))}
    </>
  );
};
