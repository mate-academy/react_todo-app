import './todoapp.css';

import React from 'react';
import { Header } from '../header';
import { Main } from '../main';
import { Footer } from '../footer';

export const TodoApp: React.FC = () => {
  return (
    <div className="todoapp">
      <Header />

      <Main />

      <Footer />
    </div>
  );
};
