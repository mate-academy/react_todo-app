/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoProvider, useTodos } from './TodoContext';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

const TodoApp: React.FC = () => {
  const { todos } = useTodos();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        {todos.length > 0 && <TodoList />}
        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};
