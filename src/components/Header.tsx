import React, { useEffect, useRef, useState } from 'react';
import { MakeChanges } from '../types/MakeChanges';

type Props = {
  setTodos: MakeChanges,
};

export const Header: React.FC<Props> = ({
  setTodos,
}) => {
  const [value, setValue] = useState('');
  const input = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value.trim()) {
      setTodos.add({
        id: Date.now(),
        completed: false,
        title: value,
      });
    }

    setValue('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleAddTodo}>
        <input
          ref={input}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={handleChangeValue}
        />
      </form>
    </header>
  );
};
