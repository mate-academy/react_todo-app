import React from 'react';

import { TodoProvider } from './Context/TodoContext';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Section } from './Main/Section';

export const TodoApp: React.FC = () => {
  return (
    <div className="todoapp">
      <TodoProvider>
        <Header />
        <Section />
        <Footer />
      </TodoProvider>
    </div>
  );
};
