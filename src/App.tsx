import React from 'react';
import { AddTodo } from './components/AddTodo/AddTodo';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { TodosProvider } from './components/TodosContext';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosProvider>
        <header className="header">
          <h1>todos</h1>
          <AddTodo />
        </header>
        <TodoList />
        <Footer />
      </TodosProvider>
    </div>
  );
};
