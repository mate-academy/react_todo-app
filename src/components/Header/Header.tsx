import React from 'react';

interface Props {
  onAdd: (title: string) => void;
  newTodoTitle: string;
  onChangeTitle: (title: string) => void;
  isDisabled: boolean,
}

export const Header: React.FC<Props> = ({
  onAdd,
  newTodoTitle,
  onChangeTitle,
  isDisabled,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(newTodoTitle);
    onChangeTitle('');
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
          disabled={isDisabled}
          value={newTodoTitle}
          onChange={(event) => onChangeTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
