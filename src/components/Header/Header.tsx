type HeaderProps = {
  title: string;
  setTitle: (title: string) => void;
  onAddTodo: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  setTitle,
  onAddTodo,
}) => (
  <header className="header">
    <h1>todos</h1>

    <form onSubmit={
      (e) => {
        e.preventDefault();
        onAddTodo();
      }
    }
    >
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be don111e?"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
    </form>
  </header>
);
