import React from 'react';
import { Form } from './Components/Header/Form/Form';
import { Main } from './Components/Main/Main';
import { Footer } from './Components/Header/Footer/Footer';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
      </header>

      <Form />

      <Main />

      <Footer />
    </div>
  );
};
