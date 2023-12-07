import React from 'react';

import { TodoProvider } from './contexts/TodoContext';
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { Footer } from './Components/Footer/Footer';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodoProvider>
        <Header />
        <Main />
        <Footer />
      </TodoProvider>
    </div>
  );
};
