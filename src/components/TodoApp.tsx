import React from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';

export const TodoApp: React.FC = () => {
  return (
    <div className="todoapp">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
