import React, { useContext, useEffect, useState } from 'react';
import {
  DispathContext,
  InputContext,
  TodoContext,
} from '../GlobalContext/GlobalContext';
import classNames from 'classnames';

type Props = {};

export const TodoHeader: React.FC<Props> = () => {
  const [query, setQuery] = useState('');

  const dispatch = useContext(DispathContext);
  const inputFocus = useContext(InputContext);
  const todos = useContext(TodoContext);

  const isAllComplete = todos.every(todo => todo.completed);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const clearQuery = query.trim();

    dispatch({ type: 'addTodo', payload: clearQuery });

    setQuery('');
  };

  const onChaneComplete = () => {
    dispatch({ type: 'completeAll', payload: isAllComplete });
  };

  useEffect(() => {
    inputFocus?.current?.focus();
  }, [todos, inputFocus]);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all', { active: isAllComplete })}
        data-cy="ToggleAllButton"
        onClick={onChaneComplete}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={onSubmit}>
        <input
          ref={inputFocus}
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
