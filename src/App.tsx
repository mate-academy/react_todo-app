import React from 'react';
import { Header } from './components/Header/Header';
import { Section } from './components/Section/Section';
import { Footer } from './components/Footer/Footer';
import { TodosProvider } from './components/TodosContext/TodosContext';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosProvider>
        <Header />

        <Section />

        <Footer />
      </TodosProvider>
    </div>
  );
};
