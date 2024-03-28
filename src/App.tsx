import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <Header />

      <Main />

      <Footer />
    </div>
  );
};
