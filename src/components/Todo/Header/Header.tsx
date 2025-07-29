/* eslint-disable no-console */
import React, { FormEvent, useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { useTodoDispatch, useTodos } from '../../../context/todoContext';

export const TodoHeader: React.FC = () => {
  const todos = useTodos();
  const { addTodo, toggleAll } = useTodoDispatch();

  const allActive = useMemo(
    () => todos?.every(todo => todo.completed) || false,
    [todos],
  );
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, [todos]);

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTitle = titleInputRef.current?.value?.trim() || '';

    try {
      addTodo(newTitle);

      if (titleInputRef.current) {
        titleInputRef.current.value = '';
      }
    } catch {}
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allActive,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <form onSubmit={handleSubmitForm}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={titleInputRef}
        />
      </form>
    </header>
  );
};
