/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { StateContext } from './store/store';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <Main />

        {todos.length !== 0 && <Footer />}
      </div>
    </div>
  );
};
