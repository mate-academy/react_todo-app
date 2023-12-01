import React, { useContext } from 'react';
import { Header } from './sections/header';
import { Main } from './sections/main';
import { Footer } from './sections/footer';
import { StateContext } from './management/TodoContext';

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
