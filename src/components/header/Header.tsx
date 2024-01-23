import { useContext } from 'react';
import './header.css';

// interface Props {

// }

export const Header: React.FC = () => {
  // const {} = useContext;

  return (
    <header className="header">
      <h1>todos</h1>

      <form>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
