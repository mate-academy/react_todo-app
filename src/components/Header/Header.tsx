import React, { useContext, useEffect, useRef } from 'react';
import classNames from 'classnames';

import { StateContext, DispatchContext } from '../../context/Store';

export const Header: React.FC = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [value, setValue] = React.useState<string>('');
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (field.current) {
      field.current.focus();
    }
  }, [state.todos.length]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value.length) {
      return;
    }

    dispatch({
      type: 'TODO_ADD',
      payload: {
        title: value.trim(),
        id: +new Date(),
        completed: false,
      },
    });

    setValue('');
  };

  return (
    <header className="todoapp__header">
      {state.todos.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: state.todos.every(todo => todo.completed),
          })}
          onClick={() => dispatch({ type: 'TODO_TOGGLE_ALL' })}
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={e => handleSubmit(e)}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={value}
          ref={field}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    </header>
  );
};
