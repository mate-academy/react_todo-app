import { useContext, useState } from 'react';
import { nanoid } from 'nanoid';
import { StateContext } from './TodoContext';

export const Header: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const { addTodo } = useContext(StateContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newTodo.trim()) {
      addTodo({
        id: nanoid(),
        title: newTodo,
        completed: false,
      });

      setNewTodo('');
    }
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
          onChange={e => setNewTodo(e.target.value)}
          onBlur={handleSubmit}
        />
      </form>
    </header>
  );
};
