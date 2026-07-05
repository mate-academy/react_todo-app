/* eslint-disable prettier/prettier */
import React, { useContext, useRef, useState } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../../context/TodoContext';

export const TodoHeader: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);

  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      inputRef.current?.focus();

      return;
    }

    setTodos([
      ...todos,
      {
        id: +new Date(),
        title: trimmedTitle,
        completed: false,
      },
    ]);

    setTitle('');
    inputRef.current?.focus();
  };

  const handleToggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(
      todos.map(todo => ({
        ...todo,
        completed: !allCompleted,
      })),
    );

    inputRef.current?.focus();
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          data-cy="ToggleAllButton"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
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
          autoFocus
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
