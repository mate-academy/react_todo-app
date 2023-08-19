import { NewTodo } from '../NewTodo/NewTodo';

export const Header = () => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTodo />
    </header>
  );
};
