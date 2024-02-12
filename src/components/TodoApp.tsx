import React, { useContext } from 'react';
import { stateContext } from '../manage/TodoContext';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(stateContext);

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
