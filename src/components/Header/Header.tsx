import { TodoInput } from '../TodoInput';

export const Header = () => {
  return (
    <header className="header">
      <h1>todos</h1>

      <TodoInput />
    </header>
  );
};
