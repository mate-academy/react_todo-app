import React from 'react';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { TodosProvider } from './components/TodosContext';
import { TodoApp } from './TodoApp';

const App: React.FC = () => (
  <TodosProvider>
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <TodoApp />
      </header>

      <section className="main">
        <TodoList />
      </section>

      <TodosFilter />
    </section>
  </TodosProvider>
);

export default App;
