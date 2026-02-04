import React, { useEffect, useState } from 'react';
import cl from 'classnames';

import { useTodos } from '../../hooks/useTodos';

type Props = {
  inputRef: React.RefObject<HTMLInputElement>;
};

export const TodoAppHeader: React.FC<Props> = ({ inputRef }) => {
  const [value, setValue] = useState('');

  const { todos, addTodo, toggleAll } = useTodos();

  const isAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const normilezedValue = value.trim();

    if (!normilezedValue) {
      return;
    }

    addTodo(normilezedValue);
    setValue('');
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const handleToggleAll = () => {
    toggleAll();

    inputRef.current?.focus();
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cl('todoapp__toggle-all', { active: isAllCompleted })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={e => setValue(e.target.value)}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
