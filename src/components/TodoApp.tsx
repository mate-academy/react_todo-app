import React, { useContext } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { StateContext } from '../management/TodoContext';

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
