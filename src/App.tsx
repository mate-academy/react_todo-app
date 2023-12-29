import React, { useContext } from 'react';
import { StateContext } from './TodosContext';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);

  return (
    <div className="todoapp">
      <Header />

      {
        todos.length !== 0 && (
          <>
            <Main />

            <Footer />
          </>
        )
      }
    </div>
  );
};
