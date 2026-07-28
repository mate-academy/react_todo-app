import React, { useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Context } from '../Context';

export const Header: React.FC = () => {
  const { todos, addTodo, toggleAll, setInputRef } = useContext(Context);
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputRef(inputRef);
  }, [setInputRef]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() !== '') {
      addTodo(title.trim());
    }

    setTitle('');
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
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
          autoFocus
        />
      </form>
    </header>
  );
};
