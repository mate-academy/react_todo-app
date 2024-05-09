import React, { useContext } from 'react';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { StateContext } from './components/GlobalContext/GlobalContext';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <h2 className="todoapp__subTitle">
        May your day be filled with productivity and successful goal
        achievement.
      </h2>

      <div className="todoapp__content">
        <Header />
        <Main />
        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
