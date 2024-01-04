/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { TodoContext } from './Data/Store';
import { Footer } from './Components/Footer/Footer';

export const App: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <Header />
      <Main />
      {todos !== null && todos.length !== 0 && <Footer />}
    </div>
  );
};
