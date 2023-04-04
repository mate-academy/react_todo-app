import React, { useState, useRef, useEffect } from 'react';

type Props = {
  addTodo: (title: string) => void,

};

export const Header: React.FC<Props> = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const submitForm = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={submitForm}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          ref={inputRef}
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={handleInput}
        />
      </form>
    </header>
  );
};
