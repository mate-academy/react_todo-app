import React, { useEffect, useRef, useState } from 'react';
import { useTodoContext } from '../../hooks/useTodoContext';

export const TodoList: React.FC = () => {
  const { filteredTodos, toggleTodo, removeTodo, editTodo } = useTodoContext();
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [updatedTodoId, setUpdatedTodoId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (updatedTodoId !== null) {
      inputRef.current?.focus();
    }
  }, [updatedTodoId]);

  const handleUpdateTodo = () => {
    if (updatedTodoId === null) {
      return;
    }

    if (newTodoTitle.trim() === '') {
      removeTodo(updatedTodoId);
    } else {
      editTodo(updatedTodoId, newTodoTitle.trim());
    }

    setUpdatedTodoId(null);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <div
          data-cy="Todo"
          className={`todo ${todo.completed ? 'completed' : ''}`}
          key={todo.id}
        >
          <label className="todo__status-label">
            {}
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
          </label>

          {updatedTodoId !== todo.id ? (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => {
                setUpdatedTodoId(todo.id);
                setNewTodoTitle(todo.title);
              }}
            >
              {todo.title}
            </span>
          ) : (
            <form
              onSubmit={e => {
                e.preventDefault();
                handleUpdateTodo();
              }}
            >
              <input
                ref={inputRef}
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={newTodoTitle}
                onChange={e => setNewTodoTitle(e.target.value)}
                onBlur={handleUpdateTodo}
                onKeyDown={e => {
                  if (e.key === 'Escape') {
                    e.preventDefault();
                    setUpdatedTodoId(null);
                    setNewTodoTitle(todo.title);
                  }
                }}
              />
            </form>
          )}

          {updatedTodoId !== todo.id && (
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => removeTodo(todo.id)}
            >
              ×
            </button>
          )}
        </div>
      ))}
    </section>
  );
};
