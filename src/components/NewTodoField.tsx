import React from 'react';

export type Props = {
  query: string,
  onInputChange(str: string): void,
  onFormSubmit(event: React.FormEvent<HTMLFormElement>): void,
};

export const NewTodoField: React.FC<Props> = ({
  query,
  onInputChange,
  onFormSubmit,
}) => {
  return (
    <form onSubmit={(ev) => onFormSubmit(ev)}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={query}
        onChange={(ev) => onInputChange(ev.target.value)}
      />
    </form>
  );
};
