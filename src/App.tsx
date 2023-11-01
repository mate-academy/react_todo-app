import React from 'react';
import { TodoApp } from './components/TodoApp';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { TodosProvider } from './TodosContext';

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
