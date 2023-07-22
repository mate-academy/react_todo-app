import React, { useState } from 'react';

type Props = {
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    todoTitle: string,
    setTodoTitle: (title: string) => void,
  ) => void;
};

export const Header: React.FC<Props> = ({ handleSubmit }) => {
  const [todoTitle, setTodoTitle] = useState('');

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={(e) => handleSubmit(e, todoTitle, setTodoTitle)}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
