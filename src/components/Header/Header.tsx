type Props = {
  todoTitle: string,
  handleTodoAdd: (e: React.FormEvent) => void,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

export const Header: React.FC<Props> = ({
  todoTitle,
  handleTodoAdd,
  handleChange,
}) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <form
        onSubmit={handleTodoAdd}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
