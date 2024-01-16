import React, { useContext } from 'react';
import { Header } from './components/header/header';
import { Main } from './components/main/main';
import { Footer } from './components/footer/footer';
import { TodosContext } from './Store';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <Header />
      {!!todos.length && (
        <Main />
      )}
      {!!todos.length && (
        <Footer />
      )}
    </div>
  );
};
