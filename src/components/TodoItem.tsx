import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { useTodos } from '../context/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, completed, title } = todo;
  const [newTitle, setNewTitle] = useState<string>(title);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { todos, setTodos } = useTodos();
  const [editingId, setEditingId] = useState<number>(0);

  useEffect(() => {
    if (editingId !== 0 && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [editingId, inputRef]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setNewTitle(title);
        setEditingId(id);
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [title, id]);

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  const handleEditTitle = () => {
    setNewTitle(title);
    setEditingId(id);
  };

  const changeCheckbox = (todoToUpdate: Todo) => {
    setTodos((currentTodos: Todo[]) => {
      return currentTodos.map(currentTodo =>
        currentTodo.id === todoToUpdate.id ? todoToUpdate : currentTodo,
      );
    });
  };

  const deleteTodos = (todoId: number) => {
    setTodos(() => todos.filter(currentTodo => todoId !== currentTodo.id));
  };

  const handleRenameTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newTitle.trim()) {
      deleteTodos(editingId);
    }

    setTodos(currentTodos =>
      currentTodos.map(currentTodo => {
        const updatedTodo = {
          ...currentTodo,
          title: newTitle.trim(),
        };

        return currentTodo.id === editingId ? updatedTodo : currentTodo;
      }),
    );
    setEditingId(0);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
      onDoubleClick={handleEditTitle}
    >
      <label htmlFor={`todo-${id}`} className="todo__status-label">
        {''}
        <input
          id={`todo-${id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => changeCheckbox({ ...todo, completed: !completed })}
        />
      </label>
      {editingId === id ? (
        <form onSubmit={handleRenameTodo}>
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={event => {
              setNewTitle(event.target.value);
              setEditingId(id);
            }}
            onBlur={handleRenameTodo}
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodos(id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
