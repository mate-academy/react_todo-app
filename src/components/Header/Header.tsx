import React from 'react';

type Props = {
  handleSubmit: (event: React.FormEvent) => void,
  title: string,
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleEscPress: (event: React.KeyboardEvent<HTMLInputElement>) => void,
};

export const Header: React.FC<Props> = ({
  handleSubmit, title, handleTitleChange, handleEscPress,
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
          value={title}
          onChange={handleTitleChange}
          onKeyUp={handleEscPress}
        />
      </form>
    </header>
  );
};
