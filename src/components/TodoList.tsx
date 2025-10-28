import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type TodoListProps = {
  todos: Todo[];
  deleteTodo: (id: number, onSuccess?: VoidFunction) => Promise<void>;
  changeTodo: (id: number, title: string, completed: boolean) => Promise<void>;
  showError: (msg: string) => void;
  toggleAll: () => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  deleteTodo,
  changeTodo,
  showError,
}) => {
  const [isEditingId, setIsEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [isLoadingId, setIsLoadingId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingId !== null) {
      inputRef.current?.focus();
    }
  }, [isEditingId]);

  const cancelEditing = () => {
    setIsEditingId(null);
    setEditTitle('');
  };

  const handleDelete = async (id: number) => {
    setIsLoadingId(id);
    try {
      await deleteTodo(id, cancelEditing);
    } catch {
      showError('Unable to delete a todo');
    } finally {
      setIsLoadingId(null);
    }
  };

  const handleChangeStatus = async (todo: Todo) => {
    setIsLoadingId(todo.id);
    try {
      await changeTodo(todo.id, todo.title, !todo.completed);
    } catch {
      showError('Unable to update a todo');
    } finally {
      setIsLoadingId(null);
    }
  };

  const saveEditing = async (todo: Todo) => {
    const trimmedTitle = editTitle.trim();

    if (trimmedTitle === todo.title) {
      cancelEditing();

      return;
    }

    if (trimmedTitle.length === 0) {
      await handleDelete(todo.id);

      return;
    }

    setIsLoadingId(todo.id);
    try {
      await changeTodo(todo.id, trimmedTitle, todo.completed);
      cancelEditing();
    } catch {
      showError('Unable to update a todo');
      setIsEditingId(todo.id);
    } finally {
      setIsLoadingId(null);
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <div
          key={todo.id}
          className={classNames('todo', {
            completed: todo.completed,
          })}
          data-cy="Todo"
        >
          <label className="todo__status-label" aria-label="status">
            <input
              id={`todo-status-${todo.id}`}
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleChangeStatus(todo)}
              className="todo__status"
              data-cy="TodoStatus"
              disabled={todo.loading}
            />
          </label>

          {isEditingId === todo.id ? (
            <form
              onSubmit={e => {
                e.preventDefault();
                saveEditing(todo);
              }}
            >
              <input
                ref={inputRef}
                type="text"
                className="todo__title-field"
                data-cy="TodoTitleField"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                onBlur={() => saveEditing(todo)}
                onKeyDown={e => e.key === 'Escape' && cancelEditing()}
                placeholder="Empty todo will be deleted"
                disabled={todo.loading}
              />
            </form>
          ) : (
            <>
              <span
                className="todo__title"
                data-cy="TodoTitle"
                onDoubleClick={() => {
                  if (!todo.loading) {
                    setIsEditingId(todo.id);
                    setEditTitle(todo.title);
                  }
                }}
              >
                {todo.title}
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => handleDelete(todo.id)}
                disabled={todo.loading}
              >
                ×
              </button>
            </>
          )}

          <div
            className={classNames('modal overlay', {
              'is-active': todo.loading || isLoadingId === todo.id,
            })}
            data-cy="TodoLoader"
            aria-hidden="true"
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
