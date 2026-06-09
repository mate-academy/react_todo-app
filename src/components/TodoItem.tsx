import React, { useState } from 'react';

import { useTodoContext } from '../hooks/useTodoContext';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const { dispatch } = useTodoContext();

  const saveTodo = () => {
    const preparedTitle = title.trim();

    if (!preparedTitle) {
      dispatch({ type: 'deleteTodo', payload: todo.id });

      return;
    }

    dispatch({
      type: 'updateTodo',
      payload: {
        id: todo.id,
        title: preparedTitle,
      },
    });

    setIsEditing(false);
  };

  const cancelEditing = () => {
    setTitle(todo.title);
    setIsEditing(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    saveTodo();
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label htmlFor={`todo-${todo.id}`} className="todo__status-label">
        Toggle todo
      </label>

      <input
        id={`todo-${todo.id}`}
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        checked={todo.completed}
        onChange={() =>
          dispatch({
            type: 'toggleTodo',
            payload: todo.id,
          })
        }
      />

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            onChange={event => setTitle(event.target.value)}
            onBlur={saveTodo}
            onKeyUp={handleKeyUp}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => dispatch({ type: 'deleteTodo', payload: todo.id })}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
