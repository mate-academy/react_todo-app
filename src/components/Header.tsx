import { useState } from 'react';

type Props = {
  createTodo: (title: string) => void,
};

export const Header: React.FC<Props> = ({ createTodo }) => {
  const [query, setQuery] = useState('');

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          createTodo(query);
          setQuery('');
        }}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
      </form>
    </header>
  );
};
