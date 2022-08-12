import React, { useState } from 'react';

type Props = {
  addTodo: (title: string) => void
};

export const TodoForm:React.FC<Props> = ({ addTodo }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
  };

  const handleSubmitForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    addTodo(query);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <input
        onChange={handleInputChange}
        value={query}
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};
