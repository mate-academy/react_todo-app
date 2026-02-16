import React, { useEffect, useRef, useState } from 'react';
import { useTodoDispatch, useTodoState } from '../context/TodoContext';
import classNames from 'classnames';

export const TodoHeader = () => {
  const [title, setTitle] = useState('');
  const dispatch = useTodoDispatch();
  const { todos } = useTodoState();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos.length]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newTitle = title.trim();

    if (newTitle.length === 0) {
      return;
    }

    dispatch({ type: 'ADD_TODO', payload: { title: newTitle } });
    setTitle('');
  };

  const handleToggleAll = () => {
    dispatch({ type: 'TOGGLE_ALL' });
  };

  const allCompleted = todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
