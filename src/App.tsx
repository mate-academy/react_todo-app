import React from 'react';
import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';
import { TodoProvider } from './TodoContext';
import { TodosFilter } from './components/TodosFilter';

const App: React.FC = () => {
  return (
    <TodoProvider>
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
    </TodoProvider>
  );
};

export default App;
