import React, { useState } from 'react';

type Props = {
  onAddTodo: (title: string) => void,
};

export const Header: React.FC<Props> = ({ onAddTodo }) => {
  const [input, setInput] = useState<string>('');

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddTodo(input);
    setInput('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={input}
          onChange={handleChangeInput}
        />
      </form>

    </header>
  );
};
