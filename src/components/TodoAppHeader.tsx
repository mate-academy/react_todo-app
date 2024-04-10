import React, { useContext, useEffect, useRef } from 'react';
import cn from 'classnames';
import { DispatchContext, StateContext } from '../context/ReduxContex';

export const TodoAppHeader: React.FC = () => {
  const { allComplete, todos, query, focusTodo } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const headerField = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (headerField.current && focusTodo) {
      headerField.current.focus();
    }
  });

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          onClick={() => dispatch({ type: 'allComplate' })}
          type="button"
          className={cn('todoapp__toggle-all', { active: allComplete })}
          data-cy="ToggleAllButton"
        />
      )}

      <form onSubmit={event => dispatch({ type: 'onSubmit', event: event })}>
        <input
          onChange={event =>
            dispatch({ type: 'setQuery', value: event.target.value })
          }
          onFocus={() => dispatch({ type: 'inputHeaderFocus' })}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          ref={headerField}
        />
      </form>
    </header>
  );
};
