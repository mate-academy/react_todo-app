import classNames from 'classnames';
import { TodoContext } from '../context/todocontext';
import React, { useContext, useState } from 'react';

export const TodoList: React.FC = () => {
  // todos é uma prop que recebe todo, que é um array que recebera um objeto
  const context = useContext(TodoContext);

  const [editTitle, setEdiTitle] = useState<string>(''); //elber
  const [editingId, setEditingId] = useState<number | null>(null);

  if (!context) {
    return null;
  }

  const { handleSelected, handleRemove, filteredTodo, setTodo } = context;

  const handleEdit = (id: number, newTitle: string) => {
    const newArray = filteredTodo.map(t => {
      return t.id === id ? { ...t, title: newTitle } : t;
    });

    setTodo(newArray); // corrigir
  };

  const handleId = (itemId: number) => {
    setEditingId(itemId);
  };

  const handleEventKey = (
    event: React.KeyboardEvent<HTMLInputElement>,
    id: number,
    title: string,
  ) => {
    if (event.key === 'Enter') {
      handleEdit(id, title);
      setEditingId(null);
    }
  };

  const handleEventCancel = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditingId(null);
    }
  };

  return (
    <>
      {/* This is a completed todo */}
      {filteredTodo.map(t => {
        if (t.title.length !== 0) {
          return (
            <div
              key={t.id}
              data-cy="Todo"
              className={classNames('todo', {
                completed: t.completed,
              })}
            >
              <label className="todo__status-label" htmlFor={`todo-${t.id}`}>
                <input
                  id={`todo-${t.id}`}
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  aria-label='Marcar como concluido'
                  onChange={() => handleSelected(t.id)} // em checkbox usamos onchang
                />
              </label>

              {editingId === t.id ? (
                <input
                  type="text"
                  value={editTitle}
                  autoFocus
                  onBlur={() => {
                    handleEdit(t.id, editTitle.trim());
                    setEditingId(null);
                  }}
                  onKeyDown={event => {
                    handleEventKey(event, t.id, editTitle.trim());
                  }}
                  onKeyUp={event => handleEventCancel(event)}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setEdiTitle(event.target.value)
                  }
                />
              ) : (
                <>
                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                    onDoubleClick={() => {
                      handleId(t.id);
                      setEdiTitle(t.title);
                    }}
                  >
                    {t.title}
                  </span>
                  <button
                    onClick={() => handleRemove(t.id)}
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                  >
                    ×
                  </button>
                </>
              )}
              {/* Remove button appears only on hover */}
            </div>
          );
        }
      })}
    </>
  );
};
/* */
