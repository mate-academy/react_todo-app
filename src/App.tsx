/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/Todolist';
import { TodoProvider } from './TodoContext';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header />

          <TodoList />

          <Footer />
        </div>
      </div>
    </TodoProvider>
  );
};
