/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Footer } from './componets/footer/Footer';
import { Header } from './componets/header/Header';
import { Main } from './componets/Main/Main';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <Header />

      <Main />

      <Footer />
    </div>
  );
};
