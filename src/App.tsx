import React from 'react';
import { Header } from './Components/Header/Header';
import { TodosList } from './Components/Main/TodosList';
import { Footer } from './Components/Footer';
import { TodosProvider } from './Components/Main/TodosContext';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <div className="todoapp">
        <Header />
        <TodosList />
        <Footer />
      </div>
    </TodosProvider>
  );
};
