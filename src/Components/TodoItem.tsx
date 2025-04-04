/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { useTodoContext } from '../TodoContext/TodoContext';
import classNames from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const { todos, setTodos, inputRef } = useTodoContext();
  const [newTitle, setNewTitle] = useState(todo.title);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  const inputUpdated = useRef<HTMLInputElement>(null);
  const isEditing = editingTodoId === todo.id;

  useEffect(() => {
    if (isEditing && inputUpdated.current) {
      inputUpdated.current.focus();
    }
  }, [isEditing]);

  const handleUpdateTodo = useCallback(
    (updatedTodo: Todo) => {
      const todoToUpdate = todos.map(tod =>
        tod.id === updatedTodo.id ? updatedTodo : tod,
      );

      setTodos(todoToUpdate);
      setEditingTodoId(null);
    },
    [setTodos, todos],
  );

  const handleDeleteTodo = useCallback(
    (todoId: number) => {
      const updatedTodos = todos.filter(tod => tod.id !== todoId);

      setTodos(updatedTodos);
      inputRef.current?.focus();
    },
    [setTodos, todos, inputRef],
  );

  const handleDoubleClick = () => {
    setEditingTodoId(todo.id);
    setNewTitle(todo.title);
  };

  const saveChanges = useCallback(() => {
    const trimmedTitle = newTitle.trim();

    if (trimmedTitle === todo.title) {
      setEditingTodoId(null);

      return;
    }

    if (trimmedTitle === '') {
      handleDeleteTodo(todo.id);

      return;
    }

    handleUpdateTodo({
      ...todo,
      title: trimmedTitle,
    });
    inputRef.current?.focus();
  }, [
    newTitle,
    todo,
    handleUpdateTodo,
    handleDeleteTodo,
    setEditingTodoId,
    inputRef,
  ]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    saveChanges();
  };

  const handleOnBlur = () => {
    saveChanges();
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setEditingTodoId(null);
    }
  };

  const onChange = () => {
    handleUpdateTodo({
      ...todo,
      completed: !todo.completed,
    });
  };

  return (
    <div
      data-cy="Todo"
      key={todo.id}
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={onChange}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputUpdated}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onBlur={handleOnBlur}
            onChange={event => setNewTitle(event.target.value)}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleDoubleClick}
        >
          {todo.title}
        </span>
      )}
      {!editingTodoId && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => handleDeleteTodo(todo.id)}
        >
          ×
        </button>
      )}
    </div>
  );
});

TodoItem.displayName = 'TodoItem';
