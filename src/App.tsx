import React, { useContext } from 'react';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { TodosContext } from './store';

export const App: React.FC = () => {
  const todos = useContext(TodosContext);

  return (
    <div className="todoapp">
      <Header />
      {!!todos.length
        && (
          <>
            <Main />
            <Footer />
          </>
        )}
    </div>
  );
};
