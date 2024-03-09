/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { TodosProvider } from './context/TodosContext';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <div className="todoapp">
        <Header />
        <Main />
        <Footer />
      </div>
    </TodosProvider>
  );
};
