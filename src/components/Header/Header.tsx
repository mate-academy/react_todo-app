import React, { useState } from 'react';

type Props = {
  onTodoCreation: (title: string) => void,
};

export const Header: React.FC<Props> = ({
  onTodoCreation,
}) => {
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTodo.trim()) {
      return;
    }

    onTodoCreation(newTodo);
    setNewTodo('');
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
          value={newTodo}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};
