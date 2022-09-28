type Props = {
  title: string,
  handleTitle:(event: React.ChangeEvent<HTMLInputElement>) => void,
  onAddTodo: (event: React.FormEvent) => void
};

export const Header: React.FC<Props> = ({ title, handleTitle, onAddTodo }) => {
  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={onAddTodo}
      >
        <input
          value={title}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={handleTitle}
        />
      </form>
    </header>
  );
};
