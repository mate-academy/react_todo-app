import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList';

export const TodoApp: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const createdTodo = {
      id: todos[todos.length - 1].id + 1,
      title: query,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, createdTodo]);
    setQuery('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>

      <section className="main">
        <TodoList todos={todos} />
      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${todos.length} items left`}
        </span>

        <ul className="filters">
          <li>
            <a href="#/" className="selected">All</a>
          </li>

          <li>
            <a href="#/active">Active</a>
          </li>

          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>

        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    </div>
  );
};
