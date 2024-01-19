import React, { useContext } from 'react';
import { Main } from './components/main/Main';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { TodosContext } from './Store';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <Header />

      {!!todos.length && (
        <>
          <Main />
          <Footer />
        </>
      )}

    </div>
  );
};
