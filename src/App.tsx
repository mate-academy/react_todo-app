import React from 'react';
import { TodosProvider } from './comments/TodosContext';
import { Header } from './comments/Header';
import { Footer } from './comments/Footer';
import { TodoList } from './comments/TodoList';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <div className="todoapp">
        <Header />
        <TodoList />
        <Footer />
      </div>
    </TodosProvider>
  );
};
