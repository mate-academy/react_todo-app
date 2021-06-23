import React from 'react';
import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';

function App() {
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoApp />
      </header>
      <TodoList />
    </section>
  );
}

export default App;
