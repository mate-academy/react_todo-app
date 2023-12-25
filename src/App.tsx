/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <Header />

      <Main />

      <Footer />
    </div>
  );
};
