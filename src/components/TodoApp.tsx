import { useState } from 'react';
import { createTodo } from '../api/todos';
import { Footer } from './Footer';
import { TodoList } from './TodoList';

export const TodoApp: React.FC = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo = {
      title,
      id: +new Date(),
      userId: 4,
      completed: false,
    };

    createTodo(newTodo);

    setTitle('');
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>To-Dos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList />
      </section>

      <Footer />
    </div>
  );
};
