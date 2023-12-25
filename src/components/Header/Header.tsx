import { Input } from '../UI/Input';

export const Header = () => {
  return (
    <header className="header">
      <h1>todos</h1>

      <form>
        <Input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
