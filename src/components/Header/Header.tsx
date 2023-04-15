import React, { useState, useRef, useEffect } from 'react';
import { TodoChanges } from '../../types/TodoChanges';

type Props = {
  setTodos: TodoChanges,
};

export const Header: React.FC<Props> = ({
  setTodos,
}) => {
  const [value, setValue] = useState('');
  const input = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

      <form onSubmit={handleSubmit}>
        <input
          ref={input}
          onChange={handleInput}
          value={value}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
