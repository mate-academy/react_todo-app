import React from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';
// import { TodoList } from './components/TodoList/TodoList';

function App() {
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoApp />
      </header>
    </section>
  );
}

export default App;
