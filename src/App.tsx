import React from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';
import { TodoList } from './components/TodoList/TodoList';
import { TodoContextProvider } from './components/TodoContext';
import { TodosFilter } from './components/TodosFilter/TodosFilter';

export const App: React.FC = () => {
  return (
    <TodoContextProvider>
      <div className="todoapp">
        <header className="header">

          <h1>My todo list</h1>
          <TodoApp />
        </header>

        <section className="main">
          <TodoList />
        </section>

        <footer className="footer">
          <TodosFilter />
        </footer>

      </div>
    </TodoContextProvider>
  );
};
