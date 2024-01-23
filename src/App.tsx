import React, { useContext } from 'react';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { StateContext } from './Store';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);

  return (
    <div className="todoapp">
      <Header />
      {todos.length > 0
  && (
    <>
      <TodoList />
      <Footer />
    </>
  )}
    </div>
  );
};
