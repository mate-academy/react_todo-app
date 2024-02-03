/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { TodosContext } from './providers/TodosProvider';
import { StatusProvider } from './providers/StatusProvider';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <Header />
      <StatusProvider>
        {todos.length > 0 && <Main />}
        {todos.length > 0 && <Footer />}
      </StatusProvider>
    </div>
  );
};
