/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Header } from './components/Header';
import { TodoApp } from './components/TodoApp/TodoApp';
import { Footer } from './components/Footer';
import { TodosProvider } from './contexts/TodosContext';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosProvider>
        <Header />
        <TodoApp />
        <Footer />
      </TodosProvider>
    </div>
  );
};
