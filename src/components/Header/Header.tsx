import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useGlobalState } from '../../GlobalProvider';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { todos, isFocused } = useGlobalState();

  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length === 0) {
      return;
    }

    dispatch({ type: 'addTodo', payload: trimmedQuery });
    setQuery('');
  };

  const handleToggleAll = () => {
    if (
      todos.every(todo => todo.completed === true) ||
      todos.every(todo => todo.completed === false)
    ) {
      todos.forEach(todo => {
        dispatch({
          type: 'updateTodo',
          payload: { todo: todo, updatedData: { completed: !todo.completed } },
        });
      });

      return;
    }

    todos.forEach(todo => {
      dispatch({
        type: 'updateTodo',
        payload: { todo: todo, updatedData: { completed: true } },
      });
    });
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active:
              (todos.every(todo => todo.completed === true) ||
                (todos.some(todo => todo.completed === true) &&
                  todos.every(todo => todo.completed === false))) &&
              todos.length > 0,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form
        onSubmit={event => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={event => setQuery(event.target.value)}
          ref={inputRef}
          onFocus={() => {
            dispatch({ type: 'setIsFocused', payload: { isFocusNeed: false } });
          }}
        />
      </form>
    </header>
  );
};
