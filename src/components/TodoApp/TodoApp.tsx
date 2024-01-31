import React, { useContext } from 'react';
import { StateContext } from '../Provaider/TodoContext';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';

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
