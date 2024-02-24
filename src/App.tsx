/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Footer } from './componets/footer/Footer';
import { Header } from './componets/header/Header';
import { Main } from './componets/Main/Main';
import { TodoContext } from './managment/Contextes';

export const App: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <Header />

      <Main />
      {todos.length > 0 && (
        <Footer />
      )}
    </div>
  );
};
