import React from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './components/Main';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
