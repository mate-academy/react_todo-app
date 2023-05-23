import { FC } from 'react';

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, title: string) => void;
  handleQueryChange: (value: string) => void;
  query: string;
}

export const Header: FC<Props> = ({
  handleSubmit,
  query,
  handleQueryChange,
}) => (
  <header className="header">
    <h1>todos</h1>

    <form onSubmit={(e) => handleSubmit(e, query)}>
      <input
        type="text"
        value={query}
        onChange={(e) => handleQueryChange(e.target.value)}
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
