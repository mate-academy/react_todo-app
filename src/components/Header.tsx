import React, { useEffect, useRef, useState } from 'react';
import { MakeChange } from '../types/MakeChange';

type Props = {
  setTodos: MakeChange,
};

export const Header: React.FC<Props> = ({
  setTodos,
}) => {
  const [value, setValue] = useState('');
  const input = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  const hendleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const hendleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

      <form onSubmit={hendleForm}>
        <input
          ref={input}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={hendleInput}
        />
      </form>
    </header>
  );
};
