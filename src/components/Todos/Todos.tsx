import { useEffect, useRef, useState } from 'react';
import { useTodoContext } from '../context/TodoContext';

export const Todos = () => {
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const renameInputRef = useRef<HTMLInputElement | null>(null);
  const { todos, toggleTodoStatus, updateTodoTitle, deleteTodo } =
    useTodoContext();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (editingTodoId !== null) {
      if (editingTitle.trim() === '') {
        deleteTodo(editingTodoId);
      } else {
        updateTodoTitle(editingTodoId, editingTitle);
      }
    }

    setEditingTodoId(null);
  };

  const handleDoubleClick = (id: number, currentTitle: string) => {
    setEditingTodoId(id);
    setEditingTitle(currentTitle);
  };

  useEffect(() => {
    if (editingTodoId !== null && renameInputRef.current) {
      renameInputRef.current.focus();
    }

    const handleClickOutsideForm = (event: MouseEvent) => {
      if (
        editingTodoId !== null &&
        renameInputRef.current &&
        !renameInputRef.current.contains(event.target as Node)
      ) {
        if (editingTitle.trim() === '') {
          deleteTodo(editingTodoId);
        } else {
          updateTodoTitle(editingTodoId, editingTitle);
        }

        setEditingTodoId(null);
      }
    };

    const handlePressEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && editingTodoId !== null) {
        setEditingTodoId(null);
      }
    };

    if (editingTodoId !== null) {
      document.addEventListener('mousedown', handleClickOutsideForm);
      document.addEventListener('keydown', handlePressEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideForm);
      document.removeEventListener('keydown', handlePressEscape);
    };
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {todos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={`todo ${todo.completed ? 'completed' : ''}`}
        >
          {editingTodoId === todo.id ? (
            <>
              {/* This todo is being edited */}
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => toggleTodoStatus(todo.id)}
                />
              </label>

              {/* This form is shown instead of the title and remove button */}
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <input
                  data-cy="TodoTitleField"
                  ref={renameInputRef}
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={editingTitle}
                  style={{ width: '100%' }}
                  onChange={e => setEditingTitle(e.target.value)}
                />
              </form>
            </>
          ) : (
            <>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="todo__status-label" htmlFor={`todo-${todo.id}`}>
                <input
                  data-cy="TodoStatus"
                  id={`todo-${todo.id}`}
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => toggleTodoStatus(todo.id)}
                />
              </label>

              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => handleDoubleClick(todo.id, todo.title)}
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
      ))}
    </section>
  );
};
