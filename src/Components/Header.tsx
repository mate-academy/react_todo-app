import React, { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, TodoContext } from './TodoContext';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const [title, setTitle] = useState('');
  const state = useContext(TodoContext);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim()) {
      dispatch({ type: 'addTodo', payload: { title: title, status: false } });

      setTitle('');
    }
  };

  const handleToggleAll = () => {
    dispatch({ type: 'toggleAll', payload: { todo: state.todo } });
  };

  const inputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  }, [state]);

  return (
    <header className="todoapp__header">
      <>
        {/* this button should have `active` class only if all todos are completed */}
        {state.todo.length > 0 && (
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: state.todo.every(todo => todo.status === true),
            })}
            data-cy="ToggleAllButton"
            onClick={handleToggleAll}
          />
        )}

        <form onSubmit={handleSubmit}>
          <input
            ref={inputField}
            data-cy="NewTodoField"
            type="text"
            value={title}
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            onChange={e => setTitle(e.target.value)}
          />
        </form>
      </>
    </header>
  );
};
