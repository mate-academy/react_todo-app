import React from 'react';
import { TodoItem } from './TodoItem';
import { useTodos } from '../context/TodoContext';

type Props = {};

export const TodoList: React.FC<Props> = () => {
  const { filtered, isAdding, tempTodo } = useTodos();

  if (filtered.length === 0) {
    return null;
  }

  return (
    <>
      {filtered.length > 0 && (
        <section className="todoapp__main" data-cy="TodoList">
          {filtered.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </section>
      )}

      {isAdding && tempTodo && (
        <section className="todoapp__main">
          <div data-cy="Todo" className="todo">
            {/* eslint-disable jsx-a11y/label-has-associated-control */}
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={false}
                readOnly
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {tempTodo.title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              disabled
            >
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        </section>
      )}
    </>
  );
};
