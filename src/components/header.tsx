import React, { useContext, useEffect, useState } from 'react';
import { DispatchContext, StateContext } from '../context/global-context';

export const Header = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const [title, setTitle] = useState('');

  const inputRef = React.useRef<HTMLInputElement>(null);
  const isAllCompleted = state.todos.every(todo => todo.completed);

  useEffect(() => {
    inputRef.current?.focus();
  }, [state.todos.length]);

  const addTodo = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    dispatch({
      type: 'add',
      payload: {
        id: +new Date(),
        title: trimmedTitle,
        completed: false,
      },
    });
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {!!state.todos.length && (
        <button
          onClick={() => dispatch({ type: 'toggle_all' })}
          type="button"
          className={`todoapp__toggle-all ${isAllCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo();
          setTitle('');
        }}
      >
        <input
          ref={inputRef}
          id="NewTodoField"
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
