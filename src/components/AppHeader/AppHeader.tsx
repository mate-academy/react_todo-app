import React, { useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { ActionType, useDispatch, useGlobalState } from '../../globalProvider';

export const AppHeader = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const todos = useGlobalState();

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos.length]);

  const { isAllTodoCompleted, newStatus } = useMemo(() => {
    const completed = todos.length > 0 && todos.every(todo => todo.completed);

    return {
      isAllTodoCompleted: completed,
      newStatus: !completed,
    };
  }, [todos]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = {
      id: +new Date(),
      title: todoTitle.trim(),
      completed: false,
    };

    if (!newTodo.title) {
      return;
    }

    dispatch({ type: ActionType.Add, payload: newTodo });

    setTodoTitle('');
  };

  const handleToggleAll = () => {
    dispatch({ type: ActionType.ToggleAll, payload: newStatus });
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          data-cy="ToggleAllButton"
          className={cn('todoapp__toggle-all', {
            active: isAllTodoCompleted,
          })}
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={event => setTodoTitle(event.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
