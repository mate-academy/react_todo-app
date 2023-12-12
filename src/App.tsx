/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Provider } from './contexts/TodosContext';

export const App: React.FC = () => {
  return (
    <Provider>
      <div className="todoapp">
        <Header />
        <Main />
        <Footer />
      </div>
    </Provider>
  );
};
