import React from 'react';
import { TodoApp } from './components/TodoApp';
import { Footer } from './components/Footer';
import { TodosProvider } from './TodosContext';
import { ToggleAll } from './components/ToggleAll';
import { TodoPage } from './components/TodoPage';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoApp />
        </header>
        <section className="main">
          <ToggleAll />
          <TodoPage />
        </section>
        <Footer />
      </section>
    </TodosProvider>
  );
};
