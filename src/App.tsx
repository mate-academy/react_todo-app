/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { StateContext } from './managment/TodoContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Main } from './components/Main';

export const App: React.FC = () => {
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
