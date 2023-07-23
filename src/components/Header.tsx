type Props = {
  query: string,
  setQuery: (value: string) => void,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>)
  => void | Promise<void>
};

export const Header: React.FC<Props> = ({ query, setQuery, handleSubmit }) => {
  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={(event) => (
        handleSubmit(event)
      )}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
};
