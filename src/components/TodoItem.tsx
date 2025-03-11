import classNames from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodosContext } from '../context/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, completed, title } = todo;
  const { setTodos } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleCheckboxChange = () => {
    setTodos(prevTodos =>
      prevTodos.map(to => {
        if (to.id === id) {
          return {
            ...to,
            completed: !completed,
          };
        } else {
          return to;
        }
      }),
    );
  };

  const handleDelete = (todoId: number) => {
    setTodos(prevTodos => prevTodos.filter(t => t.id !== todoId));
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = (
    event: // eslint-disable-next-line prettier/prettier
    React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement>,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    todo: Todo,
  ) => {
    if ('preventDefault' in event) {
      event.preventDefault();
    }

    if (newTitle.trim().length === title.length) {
      setIsEditing(false);

      return;
    }

    if (newTitle.trim().length === 0) {
      handleDelete(todo.id);

      return;
    }

    if (newTitle.trim() !== title) {
      const updatedTodo = { ...todo, title: newTitle.trim() };

      setTodos(currentTodos =>
        currentTodos.map(t => (t.id === updatedTodo.id ? updatedTodo : t)),
      );

      setIsEditing(false);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setNewTitle(title);
      setIsEditing(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: completed,
      })}
    >
      <label className="todo__status-label">
        <input
          aria-label="Toggle todo status"
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleCheckboxChange}
        />
      </label>

      {isEditing ? (
        <form onSubmit={event => handleSubmit(event, todo)}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            ref={inputRef}
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
            onBlur={event => handleSubmit(event, todo)}
            onKeyUp={event => handleKeyUp(event)}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {title}
          </span>

          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDelete(id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
