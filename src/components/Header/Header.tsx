import React, { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, StateContext } from '../../TodoContext';
import cn from 'classnames';

export const Header: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);
  const [title, setTitle] = useState('');
  const titleField = useRef<HTMLInputElement>(null);

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim().length >= 1) {
      dispatch({ type: 'addTodo', id: +new Date(), title: title });
      setTitle('');
    }
  };

  const toggleAllTodo = () => {
    dispatch({ type: 'toggleAllTodo' });
  };

  useEffect(() => {
    if (todos) {
      titleField.current?.focus();
    }
  }, [todos]);

  return (
    <>
      <header className="todoapp__header">
        {/* this button should have `active` class only if all todos are completed */}
        {!!todos.length && (
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: todos.every(t => t.completed),
            })}
            data-cy="ToggleAllButton"
            onClick={toggleAllTodo}
          />
        )}
        {/* Add a todo on form submit */}
        <form onSubmit={addTodo}>
          <input
            data-cy="NewTodoField"
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
            }}
            ref={titleField}
          />
        </form>
      </header>
    </>
  );
};
