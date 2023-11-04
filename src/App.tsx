/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer';
import { GlobalStateProvider } from './components/GlobalStateProvider';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <GlobalStateProvider>
        <Header />
        <Main />
        <Footer />
      </GlobalStateProvider>
    </div>
  );
};
