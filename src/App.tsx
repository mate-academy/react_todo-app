import React, { useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { useTodos } from './utils/TodoContext';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export const App: React.FC = () => {
  const { todos, setTodos } = useTodos();
  const isTodos = todos.length > 0;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const toggleCompletedAll = () => {
    const allCompleted = todos.every(todo => todo.completed);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updatedTodos);
  };

  return (
    <div className="todoapp">
      <Header />

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
