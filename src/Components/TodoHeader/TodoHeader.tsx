import classNames from 'classnames';

import React, { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../../TodoContext';

export const TodoHeader: React.FC = () => {
  const { todos, dispatch, mainInputRef } = useContext(TodoContext);

  const [query, setQuery] = useState('');

  useEffect(() => {
    mainInputRef.current?.focus();
  }, [mainInputRef]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = query.trim();

    if (!trimmed) {
      return;
    }

    dispatch({
      type: 'addTodo',
      payload: trimmed,
    });

    setQuery('');
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={() =>
            dispatch({
              type: 'toggleAll',
            })
          }
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={mainInputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
};
