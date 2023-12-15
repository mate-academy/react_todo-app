import { HeaderForm } from './HeaderForm/HeaderForm';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>todos</h1>

      <HeaderForm />
    </header>
  );
};
