type Props = {
  makeTodo: (e: React.FormEvent) => void
  newTodoTitle: string
  setNewTodoTitle : (input : string) => void
};

export const Header: React.FC<Props> = ({
  makeTodo,
  newTodoTitle,
  setNewTodoTitle,
}) => {
  const makeTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={(e) => makeTodo(e)}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={(event) => makeTodoTitle(event)}
          value={newTodoTitle}
        />
      </form>
    </header>
  );
};
