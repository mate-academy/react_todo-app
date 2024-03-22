import React, { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { useTodos } from './utils/TodoContext';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const { todos, addTodo, setTodos } = useTodos();
  const [query, setQuery] = useState<string>('');
  const [completedAll, setCompletedAll] = useState(false);
  const isTodos = todos.length > 0;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const toggleCompletedAll = () => {
    setTodos(prevTodos => {
      const newCompletedAll = !completedAll;

      return prevTodos.map(todo => ({
        ...todo,
        completed: newCompletedAll,
      }));
    });
    setCompletedAll(prevCompletedAll => !prevCompletedAll);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!query) {
      return;
    }

    e.preventDefault();
    addTodo({ id: Date.now(), title: query, completed: false });
    setQuery('');
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form name="todo-text" onSubmit={handleSubmit}>
          <input
            value={query}
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={e => setQuery(e.target.value)}
          />
        </form>
      </header>

      <section className="main">
        {isTodos && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={() => toggleCompletedAll()}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}

        {isTodos && <TodoList />}
      </section>

      {isTodos && <Footer />}
    </div>
  );
};
