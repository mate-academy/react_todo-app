import React from 'react';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { useTodos } from './context/context';

export const App: React.FC = () => {
  const { todos } = useTodos();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList />

        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
