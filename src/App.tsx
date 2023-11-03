import React from 'react';
import { TodosProvider } from './components/TodosContext';
import { TodoApp } from './components/TodoApp';
import { Main } from './components/Main';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosProvider>
        <TodoApp />
        <Main />
        <Footer />
      </TodosProvider>
    </div>
  );
};
