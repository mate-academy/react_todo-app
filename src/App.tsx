import React, { useContext } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { TodoContext } from './context/TodoContext';
import { TodoContextType } from './types/Action';

export const App: React.FC = () => {
  const { todos } = useContext(TodoContext) as TodoContextType;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />

        <TodoList />
        {!!todos.length && <Footer />}
      </div>
    </div>
  );
};
