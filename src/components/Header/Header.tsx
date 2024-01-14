import { useContext, useState } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const { todos, addTodo, toggleAllTodos } = useContext(TodosContext);

  const toggleAllActive = todos.length > 0
    && todos.every(todo => todo.completed);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    addTodo(title);
    setTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleTitleChange}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              handleKeyDown(event);
            }
          }}
        />
      </form>

      {todos.length > 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={toggleAllActive}
            data-cy="toggleAll"
            onClick={toggleAllTodos}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </section>
      )}
    </header>
  );
};
