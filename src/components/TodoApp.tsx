import React, { useContext } from 'react';
import { Main } from './Main';
import { Header } from './Header';
import { Footer } from './Footer';
import { TodosContext } from '../context/TodosContext';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <Header />

      {todos.length !== 0 && (
        <>
          <Main />

          <Footer />
        </>
      )}
    </div>
  );
};
