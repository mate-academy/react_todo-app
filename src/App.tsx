import React from 'react';
import { Header } from './components/header/Header';
import { TodoList } from './components/todo-list/TodoList';
import { Footer } from './components/footer/Footer';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <Header />

      <div className="todoapp__content">
        <TodoList />

        <Footer />
      </div>
    </div>
  );
};
