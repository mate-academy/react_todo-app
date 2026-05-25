/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classNames from 'classnames';
import { useTodo } from './TodoContext';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { setTodos, editTodoId, setEditTodoId, editTitle, setEditTitle } =
    useTodo();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setEditTitle(event.target.value);
  };

  const handleDelete = (id: number) => {
    setTodos(current => current.filter(t => t.id !== id));
  };

  const saveEditedTodo = () => {
    const preparedTitle = editTitle.trim();

    setTodos(current => {
      if (!preparedTitle) {
        return current.filter(t => t.id !== editTodoId);
      }

      return current.map(t => {
        if (t.id === editTodoId) {
          return { ...t, title: preparedTitle };
        }

        return t;
      });
    });

    setEditTodoId(null);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    saveEditedTodo();
  };

  const handleBlur = () => {
    saveEditedTodo();
  };

  const handleCancel = () => {
    setEditTodoId(null);
  };

  const handleClick = (id: number) => {
    setTodos(current =>
      current.map(t => {
        if (t.id === id) {
          return {
            ...t,
            completed: !t.completed,
          };
        }

        return t;
      }),
    );
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleClick(todo.id)}
        />
      </label>

      {editTodoId === todo.id ? (
        <form onSubmit={handleSubmit} onBlur={handleBlur}>
          <input
            data-cy="TodoTitleField"
            type="text"
            value={editTitle}
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            onChange={handleChange}
            onKeyDown={event => {
              if (event.key === 'Escape') {
                event.preventDefault();
                handleCancel();
              }
            }}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setEditTodoId(todo.id);
              setEditTitle(todo.title);
            }}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDelete(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
