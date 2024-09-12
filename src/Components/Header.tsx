import React, { useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { ActionNames, TodoContext } from './TodoContext';
import { Todo } from '../types/Todo';

export const Header: React.FC = ({}) => {
  const { todos, dispatch, originalTodos } = useContext(TodoContext);
  const [value, setValue] = useState('');

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  const handleKeyDown = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value.trim() === '') {
      return;
    }

    const newTodo: Todo = {
      id: 100,
      completed: false,
      title: value.trim(),
    };

    setValue('');

    dispatch({ type: ActionNames.Add, payload: newTodo });
  };

  const isCompleted =
    todos.length && todos.some(todo => todo.completed === false);

  const isAllCompleted = originalTodos.every(todo => todo.completed);

  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (isAllCompleted) {
      focusInput();
    }
  }, [isAllCompleted]);

  useEffect(() => {
    focusInput();
  }, [todos.length]);

  return (
    <header className="todoapp__header">
      {originalTodos.length > 0 && (
        <button
          type="button"
          data-cy="ToggleAllButton"
          onClick={() =>
            dispatch({ type: ActionNames.ToggleAllCompleted, payload: todos })
          }
          className={cn('todoapp__toggle-all', {
            active: !isCompleted,
          })}
        />
      )}

      <form onSubmit={handleKeyDown}>
        <input
          data-cy="NewTodoField"
          type="text"
          className={cn('todoapp__new-todo', {
            active: isAllCompleted,
          })}
          placeholder="What needs to be done?"
          autoFocus
          value={value}
          ref={inputRef}
          onChange={handleOnChange}
        />
      </form>
    </header>
  );
};
