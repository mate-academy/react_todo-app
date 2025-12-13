/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { useTodoData } from '../hooks/useTodoData';

type Props = {
  todo: Todo;
};

const TodoItemComponent: React.FC<Props> = ({ todo }) => {
  const { selectedTodoId, setSelectedTodoId, deleteTodo, updateTodo } =
    useTodoData();
  const [query, setQuery] = useState(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedTodoId === todo.id) {
      inputRef.current?.focus();
    }
  }, [selectedTodoId, todo.id]);

  const handleUpdateTodo = (todoId: number) => {
    const trimmed = query.trim();

    if (trimmed === todo.title) {
      setSelectedTodoId(null);

      return;
    }

    if (!trimmed) {
      deleteTodo(todoId);
      setSelectedTodoId(null);

      return;
    }

    updateTodo(todoId, { title: trimmed });
    setSelectedTodoId(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleUpdateTodo(todo.id);
  };

  const handleBlur = () => {
    handleUpdateTodo(todo.id);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setQuery(todo.title);
      setSelectedTodoId(null);
    }
  };

  const inputId = `todo-${todo.id}`;

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label htmlFor={inputId} className="todo__status-label">
        <input
          id={inputId}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => updateTodo(todo.id, { completed: !todo.completed })}
        />
      </label>

      {selectedTodoId !== todo.id ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setSelectedTodoId?.(todo.id)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            data-cy="TodoDelete"
            className="todo__remove"
            onClick={() => deleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
          />
        </form>
      )}

      <div data-cy="TodoLoader" className={classNames('modal overlay')}>
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};

TodoItemComponent.displayName = 'TodoItemComponent';

export const TodoItem = React.memo(TodoItemComponent);
