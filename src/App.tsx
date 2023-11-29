/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';

import { TodoContext, TodoProvider } from './TodoContext';
import { TodoForm } from './components/TodoForm';
import { TodoAllChecked } from './components/TodoAllChecked';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';

export const App: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <TodoProvider>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoForm />
        </header>

        <section className="main">
          <TodoAllChecked />
          <TodoList items={todos} />
        </section>

        <TodoFooter />
      </div>
    </TodoProvider>
  );
};
