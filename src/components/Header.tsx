import React, { useState } from 'react';

type Props = {
  onAddTodo: (value: string) => void;
};

export const Header: React.FC<Props> = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue.trim()) {
      return;
    }

    onAddTodo(inputValue);
    setInputValue('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmitForm}>
        <input
          value={inputValue}
          onChange={handleFormChange}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
