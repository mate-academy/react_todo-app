import React from 'react';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { TodoHeader } from './components/Header';
import { TodosProvider } from './components/TodosContext';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <div className="todoapp">
        <TodoHeader />
        <TodoList />
        <Footer />
      </div>
    </TodosProvider>
  );
};
