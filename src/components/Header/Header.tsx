import React, { FC, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { useDispatch, useGlobalState } from '../../context/Store';

export const Header: FC = () => {
  const titleField = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmiting] = useState(false);

  const todos = useGlobalState();
  const dispatch = useDispatch();

  const areAllTodosCompleted = todos.every(todo => todo.completed);

  const handleToggleAll = () => {
    const haveActive = todos.some(todo => !todo.completed);
    const todosToUpdate = haveActive
      ? todos.filter(todo => !todo.completed)
      : todos;

    todosToUpdate.forEach(todo =>
      dispatch({ type: 'update', payload: { ...todo, completed: haveActive } }),
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmiting(true);

    const newTitle = title.trim();

    if (newTitle) {
      try {
        dispatch({ type: 'add', payload: newTitle });
        setTitle('');
      } catch (error) {
        throw error;
      } finally {
        setIsSubmiting(false);
      }
    }
  };

  useEffect(() => {
    titleField.current?.focus();
  }, [todos, isSubmitting]);

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: areAllTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={titleField}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          disabled={isSubmitting}
        />
      </form>
    </header>
  );
};
