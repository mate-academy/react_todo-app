import { useContext, useState } from 'react';
import { TodosContext } from '../TodosContext';

export const Header: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const { addTodos } = useContext(TodosContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newTodo.trim()) {
      return;
    }

    addTodos(newTodo);
    setNewTodo('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
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
          value={newTodo}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
