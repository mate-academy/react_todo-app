/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */

import classNames from 'classnames';
import React from 'react';
import { Todo } from '../Types/Todo';
import { useTodos } from '../Context/TodoContext';

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const {
    updateTodo,
    deleteTodo,
    toggleTodo,
    setEditTodo,
    editTodo,
    editingInputRef,
  } = useTodos();

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>
      {editTodo?.id === todo.id ? (
        <form
          onSubmit={() => {
            updateTodo({
              title: editTodo.title,
              id: editTodo.id,
              completed: editTodo.completed,
            } as Todo);
            setEditTodo(null);
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editTodo.title}
            onKeyDown={event => {
              if (event.key === 'Escape') {
                setEditTodo(null);
              }
            }}
            ref={editingInputRef}
            onChange={event =>
              setEditTodo(currentEdit =>
                currentEdit
                  ? { ...currentEdit, title: event.target.value }
                  : currentEdit,
              )
            }
            onBlur={() => {
              updateTodo({
                title: editTodo.title,
                id: editTodo.id,
                completed: editTodo.completed,
              } as Todo);
              setEditTodo(null);
            }}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() =>
              setEditTodo({
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
              })
            }
          >
            {todo.title}
          </span>

          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
