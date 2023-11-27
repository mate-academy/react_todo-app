/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoProvider } from './context/TodoContext';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <AddTodo />
        </header>

        <TodoList />
        <Footer />
      </div>
    </TodoProvider>
  );
};
