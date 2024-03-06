import React from 'react';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Main } from '../Main';

export const TodoApp: React.FC = () => {
  return (
    <div className="todoapp">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
