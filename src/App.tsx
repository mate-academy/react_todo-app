import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { useTodos } from './store/Store';

export const App: React.FC = () => {
  const { todos } = useTodos();

  return (
    <div className="todoapp">
      <Header />

      {todos.length > 0 && (
        <>
          <Main />

          <Footer />
        </>
      )}
    </div>
  );
};
