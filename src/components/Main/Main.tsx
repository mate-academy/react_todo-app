import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  TodoDeleteButton: (id: number) => void;
  onStatusUpdate: (id: number, completed: boolean) => void;
  onTitleUpdate: (id: number, title: string) => void;
};

export const Main: React.FC<Props> = ({
  todos,
  TodoDeleteButton,
  onStatusUpdate,
  onTitleUpdate,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draftTitle, setDraftTitle] = useState<string>('');

  const editTitleField = useRef<HTMLInputElement>(null);

  const handleDoubleClick = (todo: Todo) => {
    setEditingId(todo.id);
    setDraftTitle(todo.title);
  };

  const handleChangeDraft = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraftTitle(e.target.value);
  };

  const handleCommit = (id: number) => {
    const newTitle = draftTitle.trim();

    if (todos.find(todo => todo.id === id)?.title === newTitle) {
      setEditingId(null);

      return;
    }

    if (newTitle === '') {
      TodoDeleteButton(id);
      setEditingId(null);
    }

    onTitleUpdate(id, newTitle);
    setEditingId(null);
  };

  const handleCancel = () => {
    setDraftTitle('');
    setEditingId(null);
  };

  useEffect(() => {
    editTitleField.current?.focus();
  }, [editingId]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <div
          data-cy="Todo"
          className={cn('todo', {
            completed: todo.completed === true,
          })}
          key={todo.id}
        >
          <label className="todo__status-label" aria-label="Toggle todo status">
            <input
              id={`todo-status-${todo.id}`}
              data-cy="TodoStatus"
              type="checkbox"
              checked={todo.completed}
              className="todo__status"
              onChange={event => onStatusUpdate(todo.id, event.target.checked)}
            />
          </label>

          {editingId === todo.id ? (
            <form>
              <input
                ref={editTitleField}
                data-cy="TodoTitleField"
                type="text"
                value={draftTitle}
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                onFocus={e => e.currentTarget.select()}
                onChange={handleChangeDraft}
                onBlur={() => handleCommit(todo.id)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleCommit(todo.id);
                  } // зберегти на Enter

                  if (e.key === 'Escape') {
                    handleCancel();
                  } // скасувати на Esc
                }}
              />
            </form>
          ) : (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => handleDoubleClick(todo)}
            >
              {todo.title}
            </span>
          )}

          {!editingId && (
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => TodoDeleteButton(todo.id)}
            >
              ×
            </button>
          )}
        </div>
      ))}
    </section>
  );
};
