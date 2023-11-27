/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoProvider } from './context/TodoContext';
import { AddTodo } from './components/AddTodo';
import { Footer } from './components/Footer';
import { ToggleAll } from './components/ToggleAll';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <AddTodo />
        </header>

        <ToggleAll />
        <Footer />
      </div>
    </TodoProvider>
  );
};
