import React, { useContext } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { TodosContext } from '../contexts/TodosContext';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <Header />
      <Main />
      {todos.length > 0 && <Footer />}
    </div>
  );
};
