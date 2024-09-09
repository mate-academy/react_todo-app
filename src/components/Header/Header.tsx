import React, { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, StateContext } from '../Todo/TodoContext';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const [title, setTitle] = useState('');
  const { todos } = useContext(StateContext);
  const titleField = useRef<HTMLInputElement>(null);
  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.length >= 1) {
      dispatch({ type: 'AddTodo', id: +new Date(), title: title });
      setTitle('');
    }
  };

  const toggleAllTodo = () => {
    dispatch({ type: 'toggleTodo' });
  };

  useEffect(() => {
    if (todos) {
      titleField.current?.focus();
    }
  }, [todos]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(t => t.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAllTodo}
        />
      )}

      <form onSubmit={addTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          value={title}
          ref={titleField}
          onChange={event => {
            setTitle(event.target.value);
          }}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
