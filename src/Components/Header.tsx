import { useContext, useState } from 'react';
import { TodosContext } from '../TodosContext';

export const Header: React.FC = () => {
  const [creatTodo, setCreatTodo] = useState('');
  const { addTodos } = useContext(TodosContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!creatTodo.trim()) {
      return;
    }

    addTodos(creatTodo);
    setCreatTodo('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreatTodo(event.target.value);
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={creatTodo}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
