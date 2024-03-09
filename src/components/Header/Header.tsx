import { TodoForm } from '../TodoForm';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>todos</h1>

      <TodoForm />
    </header>
  );
};
