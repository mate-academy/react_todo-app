import React, { useEffect, useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import classNames from 'classnames';

interface HeaderProps {
  toggleAll: () => void;
  allCompleted: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleAll, allCompleted }) => {
  const { todos, setTodos, focusHeaderInput, mainInputRef } = useTodos();
  const [title, setTitle] = useState('');

  useEffect(() => {
    focusHeaderInput();
  }, [focusHeaderInput]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    setTodos(prev => [
      ...prev,
      {
        id: +new Date(),
        title: trimmedTitle,
        completed: false,
      },
    ]);

    setTitle('');
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={() => toggleAll()}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={mainInputRef}
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
