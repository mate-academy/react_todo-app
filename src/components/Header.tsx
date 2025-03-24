import React, { useEffect, useRef } from 'react';
import { createTodo, USER_ID } from '../api/todos';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

type Props = {
  title: string;
  loadTodos: number[];
  todos: Todo[];
  isFocusing: boolean;
  isLoading: boolean;
  onLoadTodos: (loadTodos: number[]) => void;
  onChange: (title: string) => void;
  onSubmit: (todos: Todo) => void;
  onError: (error: string) => void;
  onToggle: () => void;
  onAdd: (tempTodo: Todo | null) => void;
};

export const Header: React.FC<Props> = ({
  title,
  loadTodos,
  todos,
  isFocusing,
  isLoading,
  onChange,
  onSubmit,
  onError,
  onAdd,
  onLoadTodos,
  onToggle,
}) => {
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    field.current?.focus();
  }, [isFocusing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  function reset() {
    if (field.current) {
      field.current.disabled = false;
      field.current.focus();
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (field.current) {
      field.current.disabled = true;
    }

    if (!title.trim()) {
      reset();

      onError('Title should not be empty');

      return;
    }

    const newTodo: Omit<Todo, 'id'> = {
      title: field.current?.value.toString().trim() || '',
      userId: USER_ID,
      completed: false,
    };

    onAdd({ ...newTodo, id: 0 });

    onLoadTodos([...loadTodos, 0]);

    createTodo(newTodo)
      .then(response => {
        onSubmit(response);
      })
      .catch(() => onError('Unable to add a todo'))
      .finally(() => {
        onAdd(null);
        const newLoadTodos = loadTodos.filter(todo => todo !== 0);

        reset();
        onLoadTodos([...newLoadTodos]);
      });
  };

  const handleToggle = () => {
    onToggle();
  };

  const isToggleActive =
    todos.filter(todo => todo.completed).length === todos.length;

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {!isLoading && todos.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isToggleActive,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggle}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          name="title"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={field}
          value={title}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
