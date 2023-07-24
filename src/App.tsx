/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { FooterBar } from './components/TodoFilterBar';
import { TodoForm } from './components/TodoForm';
import { TodoMain } from './components/TodoList';
import { TodoProvider } from './TodoContext';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodoProvider>
        <header className="header">
          <h1>todos</h1>

          <TodoForm />
        </header>
        <TodoMain />
        <FooterBar />
      </TodoProvider>

    </div>
  );
};
