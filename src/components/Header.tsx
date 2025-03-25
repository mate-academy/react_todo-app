import React, { useEffect, useRef } from 'react';
import { USER_ID } from '../api/todos';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { useTodos } from '../hooks/useTodos';
import { FilterType } from '../types/FilterType';

export const Header: React.FC = () => {
  const {
    title,
    isFocusing,
    isLoading,
    todos,
    setError,
    setTitle,
    setTodos,
    getFilteredTodos,
  } = useTodos();

  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    field.current?.focus();
  }, [isFocusing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
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

      setError('Title should not be empty');

      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: field.current?.value.toString().trim() || '',
      userId: USER_ID,
      completed: false,
    };

    setTitle('');
    setTodos(prev => [...prev, newTodo]);
    reset();
  };

  const handleToggle = () => {
    const completedTodos = getFilteredTodos(todos, FilterType.completed);

    if (completedTodos.length === todos.length) {
      setTodos(prev => {
        return prev.map(todo => ({ ...todo, completed: false }));
      });
    } else {
      setTodos(prev => {
        return prev.map(todo => ({ ...todo, completed: true }));
      });
    }
  };

  const isToggleActive =
    getFilteredTodos(todos, FilterType.completed).length === todos.length;

  return (
    <header className="todoapp__header">
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
