import React, { useContext, useEffect, useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodosContext } from './components/Store';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);

  const [hasTodos, setHasTodos] = useState(() => {
    const data = localStorage.getItem('todos');

    if (!data || !JSON.parse(data).length) {
      return false;
    }

    return true;
  });

  useEffect(() => {
    setHasTodos(todos.length > 0);
  }, [todos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <TodoForm />
      </header>

      <section className="main">
        <TodoList />
      </section>

      {hasTodos && (
        <footer className="footer">
          <TodoFilter />
        </footer>
      )}
    </div>
  );
};
