/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { TodosContext } from './store/Store';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);

  const displayAppContent = todos.length > 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {displayAppContent && (
          <>
            <Main />
            <Footer />
          </>
        )}
      </div>
    </div>
  );
};
