import React, { useEffect, useRef, useState } from 'react';
import { useTodos } from '../../context/TodosContext';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const { state, dispatch } = useTodos();
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const allCompleted =
    state.todos.length > 0 && state.todos.every(t => t.completed);

  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      return;
    }

    dispatch({ type: 'ADD', payload: trimmed });
    setTitle('');
  };

  useEffect(() => {
    inputRef.current?.focus();
    if (state.todos.length === 0) {
      inputRef.current?.focus();
    }
  }, [state.todos.length]);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {state.todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all ', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={() => dispatch({ type: 'TOGGLE_ALL' })}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handelSubmit}>
        <input
          data-cy="NewTodoField"
          ref={inputRef}
          type="text"
          className="todoapp__new-todo"
          value={title}
          placeholder="What needs to be done?"
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
