/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { TodoForm } from './components/TodoForm';
import { TodoAllChecked } from './components/TodoAllChecked';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoForm />
      </header>

      <section className="main">
        <TodoAllChecked />
        <TodoList />
      </section>

      <TodoFooter />
    </div>
  );
};
