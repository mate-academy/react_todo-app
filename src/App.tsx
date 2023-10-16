/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoList } from './components/TodoList';
import { TodoProvider } from './components/TodosContext';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="todoapp">
        <Header />
        <TodoList />
        <Footer />
      </div>
    </TodoProvider>
  );
};
