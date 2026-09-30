/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodosProvider, useTodos } from './context/TodosContext';
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

        {todos.length > 0 && (
          <>
            <TodoList />
            <Footer />
          </>
        )}
      </div>
    </div>
  );
};

export const App: React.FC = () => (
  <TodosProvider>
    <TodoApp />
  </TodosProvider>
);
