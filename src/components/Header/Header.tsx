import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { useTodos } from '../../hooks/useTodos';

type Props = {};

const HeaderBase: React.FC<Props> = () => {
  const { toggleAllTodos, completedTodos, todos, addTodo } = useTodos();
  const [title, setTitle] = useState('');

  const newTodoFieldRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const titleToSave = title.trim();

    if (titleToSave !== '') {
      addTodo(titleToSave);
      setTitle('');
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (newTodoFieldRef.current) {
      newTodoFieldRef.current.focus();
    }
  }, [todos.length]);

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          onClick={toggleAllTodos}
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todos.length === completedTodos.length,
          })}
          data-cy="ToggleAllButton"
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          ref={newTodoFieldRef}
          value={title}
          onChange={handleTitleChange}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

export const Header = React.memo(HeaderBase);
