import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  addTodo: (newTodo: Todo)=> void,
};

export const Header: React.FC<Props> = ({ addTodo }) => {
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
      const newTodo = {
        id: Date.now(),
        completed: false,
        title: value,
      };

      addTodo(newTodo);
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
