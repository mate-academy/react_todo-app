import React, { useState } from 'react';

type Props = {
  onAddTodo: (title: string) => void,
};

export const Header: React.FC<Props> = ({ onAddTodo }) => {
  const [inputValue, setInputvalue] = useState('');

  const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputvalue(e.target.value);
  };

  const onSubmitForm = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.trim()) {
      onAddTodo(inputValue);
      setInputvalue('');
    }
  };

  return (
    <header
      className="header"
    >
      <h1>todos</h1>

      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          value={inputValue}
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={handleInput}
        />
      </form>
    </header>
  );
};
