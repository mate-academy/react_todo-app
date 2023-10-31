import React, { useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodosContext);

  const isContentDisplayed = todos.length > 0;

  return (
    <div className="todoapp">
      <Header />
      {isContentDisplayed && (
        <>
          <Main />
          <Footer />
        </>
      )}
    </div>
  );
};
