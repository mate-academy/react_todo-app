import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useTodos } from '../../providers/TodosProvider';

type Props = {
  todo: Todo;
};

/* eslint-disable jsx-a11y/label-has-associated-control */
export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { setTodos, focusHeaderInput, selectedTodo, setSelectedTodo } =
    useTodos();
  const [title, setTitle] = useState('');
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (todoId: number) => {
    setTodos(prev => prev.filter(tod => tod.id !== todoId));
    focusHeaderInput();
  };

  const handleUpdateTitle = (value: Todo, str: string) => {
    const updatedTodo = {
      id: value.id,
      title: str,
      completed: value.completed,
    };

    setTodos(prev => {
      return prev.map(tod => (tod.id === updatedTodo.id ? updatedTodo : tod));
    });
  };

  const handleSubmit = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    if (selectedTodo) {
      const fixedTitle = title.trim();

      if (!fixedTitle) {
        handleDelete(selectedTodo.id);
      }

      setSelectedTodo(null);
      handleUpdateTitle(selectedTodo, fixedTitle);
    }
  };

  useEffect(() => {
    const handleEscapeKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedTodo(null);
      }
    };

    window.addEventListener('keyup', handleEscapeKeyUp);

    return () => window.removeEventListener('keyup', handleEscapeKeyUp);
  }, [setSelectedTodo]);

  const handleToggleCompleted = (value: Todo) => {
    const updatedTodo = {
      id: value.id,
      title: value.title,
      completed: !value.completed,
    };

    setTodos(prev => {
      return prev.map(tod => (tod.id === updatedTodo.id ? updatedTodo : tod));
    });
  };

  useEffect(() => {
    if (selectedTodo) {
      titleInputRef.current?.focus();
      titleInputRef.current?.select();
    }
  }, [selectedTodo]);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
      key={todo.id}
      onDoubleClick={() => {
        setSelectedTodo(todo);
        setTitle(todo.title);
      }}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onClick={() => handleToggleCompleted(todo)}
          checked={todo.completed}
        />
      </label>

      {selectedTodo?.id === todo.id ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            onChange={event => setTitle(event.target.value)}
            onBlur={handleSubmit}
            ref={titleInputRef}
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
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
