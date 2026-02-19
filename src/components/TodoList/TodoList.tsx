import React, { useEffect, useRef, useState } from 'react';

import { useTodos } from '../../context/TodosContext';
import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const { state, dispatch } = useTodos();
  const { todos, filter, editingId } = state;
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const visiablesTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  useEffect(() => {
    if (editingId !== null) {
      inputRef.current?.focus();
    }
  }, [editingId]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {visiablesTodos.map(todo => {
        const isEditing = editingId === todo.id;

        return (
          <div
            data-cy="Todo"
            className={classNames('todo', {
              completed: todo.completed,
            })}
            key={todo.id}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onClick={() => dispatch({ type: 'TOGGLE', payload: todo.id })}
              />
            </label>
            {isEditing ? (
              <>
                <form
                  onSubmit={(e: React.FormEvent) => {
                    e.preventDefault();
                    dispatch({
                      type: 'FINISH_EDIT',
                      payload: { id: todo.id, title: editValue },
                    });
                  }}
                >
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    onBlur={() => {
                      const trimmed = editValue.trim();

                      if (trimmed === '') {
                        dispatch({ type: 'DELETE', payload: todo.id });
                      } else {
                        dispatch({
                          type: 'FINISH_EDIT',
                          payload: { id: todo.id, title: editValue },
                        });
                      }
                    }}
                    value={editValue}
                    ref={inputRef}
                    onKeyDown={e => {
                      if (e.key === 'Escape') {
                        dispatch({ type: 'CANCEL_EDIT' });
                      }
                    }}
                    onChange={e => setEditValue(e.target.value)}
                  />
                </form>
              </>
            ) : (
              <>
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={() => {
                    setEditValue(todo.title);
                    dispatch({ type: 'START_EDIT', payload: todo.id });
                  }}
                >
                  {todo.title}
                </span>

                {/* Remove button appears only on hover */}
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => dispatch({ type: 'DELETE', payload: todo.id })}
                >
                  ×
                </button>
              </>
            )}
          </div>
        );
      })}
    </section>
  );
};
