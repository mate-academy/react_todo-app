/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { TodoContext, TodoProvider } from './components/TodoContext';

const AppContent: React.FC = () => {
  const [newTitle, setNewTitle] = useState('');

  const { todos } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header setTitle={setNewTitle} title={newTitle} />

        <TodoList />

        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};

export const App: React.FC = () => (
  <TodoProvider>
    <AppContent />
  </TodoProvider>
);
