import React, { RefObject, useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import './TodoItem.scss';

import { Todo } from '../../types/Todo';
import { TodoContext } from '../../context/TodoContext';

type Props = {
  todo: Todo;
  inputRef: RefObject<HTMLInputElement>;
};

export const TodoItem: React.FC<Props> = ({ todo, inputRef }) => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('TodoContext must be used within TodoProvider');

  const {
    deleteTodo,
    updateTodo,
    setSelectedTodoId,
    loadingTodoIds,
    setLoadingTodoIds,
    setErrorMessage,
  } = context;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const todoInputEditRef = useRef<HTMLInputElement>(null);

  const isLoading = loadingTodoIds.includes(todo.id);

  const handleToggle = () => {
    setLoadingTodoIds(prev => [...prev, todo.id]);

    try {
      updateTodo(todo.id, { completed: !todo.completed });
      setSelectedTodoId(todo.id);
    } catch (error) {
      setErrorMessage('Unable to toggle todo status');
    } finally {
      setLoadingTodoIds(prev => prev.filter(id => id !== todo.id));
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(todo.title);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newTitle = editedTitle.trim();

    if (newTitle === todo.title) {
      setIsEditing(false);
      return;
    }

    if (!newTitle) {
      setLoadingTodoIds(prev => [...prev, todo.id]);

      try {
        deleteTodo(todo.id);
      } catch (error) {
        setErrorMessage('Unable to delete todo');
      } finally {
        setLoadingTodoIds(prev => prev.filter(id => id !== todo.id));
      }
      return;
    }
    setLoadingTodoIds(prev => [...prev, todo.id]);

    try {
      updateTodo(todo.id, { title: newTitle });
      setIsEditing(false);
    } catch (error) {
      setErrorMessage('Unable to update todo');
    } finally {
      setLoadingTodoIds(prev => prev.filter(id => id !== todo.id));
    }
  };

  const handleDoubleClickEditTodo = () => {
    setIsEditing(true);
    setSelectedTodoId(todo.id);
  };

  const handleDelete = () => {
    setLoadingTodoIds(prev => [...prev, todo.id]);

    try {
      deleteTodo(todo.id);
      inputRef.current?.focus();
    } catch (error) {
      setErrorMessage('Unable to delete todo');
    } finally {
      setLoadingTodoIds(prev => prev.filter(id => id !== todo.id));
    }
  };

  useEffect(() => {
    if (isEditing && todoInputEditRef.current) {
      todoInputEditRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: todo.completed,
        selected: context.selectedTodoId === todo.id,
        loading: isLoading,
      })}
    >
      <label className="todo__status-label" aria-label="Toggle todo status">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleToggle}
          disabled={isLoading}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
            onBlur={handleSubmit}
            onKeyUp={handleKeyUp}
            ref={todoInputEditRef}
            disabled={isLoading}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDoubleClickEditTodo}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
            disabled={isLoading}
          >
            ×
          </button>
        </>
      )}

      {isLoading && (
        <div data-cy="TodoLoader" className="modal overlay is-active">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      )}
    </div>
  );
};
