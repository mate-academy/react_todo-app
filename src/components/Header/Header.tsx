import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodosContext } from '../../contextes/TodosContext';

export const Header = () => {
  const {
    title,
    setTitle,
    todos,
    setTodos,
  } = useContext(TodosContext);

  const changeValues = () => setTodos([
    ...todos,
    {
      id: uuidv4(),
      title,
      completed: false,
    },
  ]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim()) {
      changeValues();
      setTitle('');
    }
  };

  const hendlerChange
  = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(
    event.target.value,
  );

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          onChange={hendlerChange}
          type="text"
          value={title}
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
