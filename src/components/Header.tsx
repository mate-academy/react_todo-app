import React, { useEffect, useState } from 'react';
import { useTodo } from '../context/TodoContext';
import cn from 'classnames';

export const Header: React.FC = () => {
  const { state, dispatch } = useTodo();
  const [titleText, setTitleText] = useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [state.todos.length]);

  const todosLength = state.todos.length;
  const todosCompletedAll = state.todos.every(todo => todo.completed);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = titleText.trim();

    if (!trimmedQuery) {
      return;
    }

    dispatch({ type: 'ADD', payload: trimmedQuery });
    setTitleText('');
  };

  return (
    <header className="todoapp__header">
      {todosLength !== 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: todosCompletedAll })}
          data-cy="ToggleAllButton"
          onClick={() => dispatch({ type: 'TOGGLE_ALL' })}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          value={titleText}
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={e => setTitleText(e.target.value)}
        />
      </form>
    </header>
  );
};
