/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { useDeleteTodos, useUpdateTodos } from '../../context/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [query, setQuery] = useState(todo.title);

  const deletedTodo = useDeleteTodos();
  const updateTodo = useUpdateTodos();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setQuery(todo.title);
        setIsEditing(false);
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [todo.title, setIsEditing]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const tempQuery = query.trim();

    if (!tempQuery) {
      deletedTodo([todo.id]);

      return;
    }

    if (tempQuery === todo.title) {
      // setIsFocus(false);
      setIsEditing(false);

      return;
    }

    updateTodo({
      id: todo.id,
      title: tempQuery,
      completed: todo.completed,
    });

    setIsEditing(false);
  };

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={todo.completed}
          onClick={() => updateTodo({ ...todo, completed: !todo.completed })}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todoapp__new-todo"
            placeholder="Empty todo will be deleted"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
            }}
            autoFocus
            onBlur={handleSubmit}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setIsEditing(true);
            }}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deletedTodo([todo.id])}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
