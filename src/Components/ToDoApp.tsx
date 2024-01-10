import React from 'react';

import { ToDoProvider } from './Context/ToDoContext';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Section } from './Main/Section';

export const ToDoApp: React.FC = () => {
  return (
    <div className="todoapp">
      <ToDoProvider>
        <Header />
        <Section />
        <Footer />
      </ToDoProvider>
    </div>
  );
};
