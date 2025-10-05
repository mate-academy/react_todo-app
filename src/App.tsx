/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { TodoContextType } from './types/types';
import { TodoContext } from './context/TodoContext';

export const App: React.FC = () => {
  const { todos } = useContext<TodoContextType>(TodoContext);

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
