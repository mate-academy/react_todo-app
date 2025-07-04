import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { TodoContext } from '../../context/TodoContext';

export const TodoList: React.FC = () => {
  const [isEditingId, setIsEditingId] = useState(0);
  const [title, setTitle] = useState('');
  const [isLoadingId, setIsLoadingId] = useState(0);
  const editInput = useRef<HTMLInputElement>(null);

  const { removeTodos, filteredTodos, changeTodo } = useContext(TodoContext);

  useEffect(() => {
    if (isEditingId !== 0) {
      setTimeout(() => {
        editInput.current?.focus();
      }, 0);
    }
  }, [isEditingId]);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement>,
    item: Todo,
  ) => {
    e.preventDefault();

    if (title.trim().length === 0) {
      setIsLoadingId(isEditingId);
      removeTodos(isEditingId)
        .then(() => {
          setIsLoadingId(0);
          setIsEditingId(0);
        })
        .catch(() => {
          setIsLoadingId(0);
        });

      return;
    }

    if (
      title.trim() ===
        filteredTodos.find(todo => todo.id === isEditingId)?.title.trim() ||
      title.trim() === ''
    ) {
      setIsEditingId(0);

      return;
    }

    setIsLoadingId(item.id);
    changeTodo(item.id, title.trim(), item.completed)
      .then(() => {
        setIsEditingId(0);
      })
      .finally(() => {
        setIsLoadingId(0);
      });
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(item => (
        <div
          data-cy="Todo"
          className={classNames('todo', { completed: item.completed })}
          key={item.id}
        >
          <label
            className="todo__status-label"
            htmlFor={`todo-status-${item.id}`}
          >
            <span className="visually-hidden">Позначити як виконане</span>
            <input
              id={`todo-status-${item.id}`}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={item.completed}
              onChange={() => {
                setIsLoadingId(item.id);
                changeTodo(item.id, item.title, !item.completed).finally(() => {
                  setIsLoadingId(0);
                });
              }}
            />
          </label>
          {(item.id === 0 || isEditingId !== item.id) && (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={e => {
                e.preventDefault();
                setIsEditingId(item.id);
                setTitle(item.title);
              }}
            >
              {item.title}
            </span>
          )}

          {isEditingId === item.id && (
            <form onSubmit={e => handleSubmit(e, item)}>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={title}
                onChange={e => {
                  setTitle(e.target.value);
                }}
                onKeyDown={e => {
                  if (e.key === 'Escape') {
                    setIsEditingId(0);
                  }
                }}
                ref={editInput}
                onBlur={e => handleSubmit(e, item)}
                autoFocus
              />
            </form>
          )}

          <div
            data-cy="TodoLoader"
            className={classNames('modal', 'overlay', {
              'is-active': isLoadingId === item.id || item.id === Date.now(),
              hidden: isLoadingId !== item.id,
            })}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
          {isEditingId !== item.id && (
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => {
                setIsLoadingId(item.id);
                removeTodos(item.id).finally(() => {
                  setIsLoadingId(0);
                });
              }}
            >
              ×
            </button>
          )}
        </div>
      ))}
    </section>
  );
};
