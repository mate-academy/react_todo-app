import { useContext, useState } from 'react';
import { DispatchContext } from './TodoContext';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const dispatch = useContext(DispatchContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim()) {
     dispatch({
      type: 'addTodo',
      title,
     })

      setTitle('');
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
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={handleSubmit}
        />
      </form>
    </header>
  );
};
