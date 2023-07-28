import React from 'react';
import { Form } from './Components/Form/Form';
import { TodoApp } from './Components/TodoApp/TodoApp';
import { Footer } from './Components/Footer/Footer';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
      </header>

      <Form />

      <TodoApp />

      <Footer />
    </div>
  );
};
