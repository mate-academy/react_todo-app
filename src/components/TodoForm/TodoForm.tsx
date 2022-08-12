import React, { useState } from 'react';

type Props = {
  addTask: (value: string) => void;
};

export const TodoForm: React.FC<Props> = ({ addTask }) => {
  const [userInput, setUserInput] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTask(userInput);
    setUserInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={userInput}
        onChange={handleChange}
      />
    </form>
  );
};
