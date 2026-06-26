// .. TodoItem.tsx

import type { Todo } from '../types/Todo';
import { useTodoContext } from '../hooks/useTodoContext';
import { useState } from 'react';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { deleteTodo, updateTodo, toggleTodo } = useTodoContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isCancelled, setIsCancelled] = useState(false);

  const saveTodo = () => {
    updateTodo(todo.id, editTitle);
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      saveTodo();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsCancelled(true);
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    if (isCancelled) {
      setIsCancelled(false);

      return;
    }

    saveTodo();
  };

  const handleEditingTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.target.value);
  };

  const handleDoubleClicking = () => {
    setEditTitle(todo.title);
    setIsEditing(true);
  };

  const handleActive = (id: number) => {
    toggleTodo(id);
  };

  const handleDelete = (id: number) => {
    deleteTodo(id);

    // Фокусування на головному полі після видалення для успішного проходження тесту
    setTimeout(() => {
      const input = document.querySelector(
        '[data-cy="NewTodoField"]',
      ) as HTMLInputElement;

      if (input) {
        input.focus();
      }
    }, 0);
  };

  return (
    <div data-cy="Todo" className={todo.completed ? 'todo completed' : 'todo'}>
      <label className="todo__status-label" htmlFor={`todo-${todo.id}`}>
        <input
          id={`todo-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          aria-label="Toggle todo"
          checked={todo.completed}
          onChange={() => handleActive(todo.id)}
        />
      </label>

      {isEditing ? (
        <input
          type="text"
          className="todo__title-field"
          data-cy="TodoTitleField" // Додано атрибут для Cypress
          value={editTitle}
          onChange={handleEditingTitle}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleDoubleClicking}
        >
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => handleDelete(todo.id)}
        >
          ×
        </button>
      )}
    </div>
  );
};
