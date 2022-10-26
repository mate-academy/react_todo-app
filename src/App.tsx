import React from 'react';
import { Footer } from './components/Footer';
import { NewTodoForm } from './components/NewTodoForm';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <header className="header">
        <NewTodoForm />
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
