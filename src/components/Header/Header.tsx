import React from 'react';

interface HeaderProps {
  title: string;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
  titleValue: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onTitleChange,
  onSubmit,
  titleValue,
}) => {
  return (
    <header className="header">
      <h1>{title}</h1>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={titleValue}
          onChange={onTitleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmit(e);
            }
          }}
        />
      </form>
    </header>
  );
};
