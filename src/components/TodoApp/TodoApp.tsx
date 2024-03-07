import React, { useContext } from 'react';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Main } from '../Main';
import { StateContext } from '../../TodosContext';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(StateContext);

  return (
    <div className="todoapp">
      <Header />
      {todos.length > 0 && (
        <>
          <Main />
          <Footer />
        </>
      )}
    </div>
  );
};
