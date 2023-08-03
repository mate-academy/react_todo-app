/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodosProvider } from './context/TodosContext';
import { TodoForm } from './components/TodoForm';
import { Footer } from './components/Footer';
import { Main } from './components/Main';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoForm />
        </header>
        <Main />

        <Footer />
      </div>
    </TodosProvider>

  );
};
