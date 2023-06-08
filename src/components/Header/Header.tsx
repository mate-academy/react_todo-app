import React from 'react';

type Props = {
  title: string,
  setTitle: (newTitle: string) => void,
  onSaveNewTodo: () => void,
};

export const Header: React.FC<Props> = ({
  title,
  setTitle,
  onSaveNewTodo,
}) => {
  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSaveNewTodo();
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
          value={title}
          onChange={handleTitle}
        />
      </form>
    </header>
  );
};
