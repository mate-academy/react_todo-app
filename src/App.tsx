import React from 'react';

import { MainForm } from './components/MainForm';

import { TodoList } from './components/TodoList';

import { TodoFilter } from './components/TodoFilter';

const App: React.FC = () => (
  <section className="todoapp">
    <header className="header">
      <h1>todos</h1>

      <MainForm />

    </header>

    <section className="main">
      <input type="checkbox" id="toggle-all" className="toggle-all" />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />

    </section>

    <footer className="footer">
      <span className="todo-count">
        3 items left
      </span>

      <TodoFilter />

    </footer>
  </section>
);

export default App;
