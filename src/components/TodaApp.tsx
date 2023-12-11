import React, { useContext } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Main } from './Main';
import { TodoContext } from './TodoContext';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodoContext);

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
