import React from 'react';

type Props = {
  todoTitle: string;
  setTodoTitle: (todoTitle: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const Header: React.FC<Props> = ({
  todoTitle,
  setTodoTitle,
  handleSubmit,
}) => {
  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
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
