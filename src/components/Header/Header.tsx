import React from 'react';

type Props = {
  newTodoTitle: string,
  onTitleChange: (arg: string) => void,
  onFormSubmit: (e: React.FormEvent) => void,
};

export const Header: React.FC<Props> = ({
  newTodoTitle,
  onTitleChange,
  onFormSubmit,
}) => (
  <header className="header">
    <form onSubmit={onFormSubmit}>
      <input
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodoTitle}
        onChange={(e) => onTitleChange(e.target.value)}
      />
    </form>
  </header>
);
