import React from 'react';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { TodosProvider } from './context/TodosContext';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosProvider>
        <Header />
        <Main />
        <Footer />
      </TodosProvider>
    </div>
  );
};
