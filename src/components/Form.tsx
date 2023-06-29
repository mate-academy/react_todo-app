import { FC, useState } from 'react';

type Props = {
  addTodo: (value: string) => void;
};

export const FormTodos: FC<Props> = ({ addTodo }) => {
  const [query, setQuery] = useState('');
  const onAddTodo = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() === '') {
      return;
    }

    addTodo(query);
    setQuery('');
  };

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={onAddTodo}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </header>
    </>
  );
};
