import React from 'react';
import { Header } from './components/Header/Header';
import { Todos } from './components/Todos/Todos';
import { Footer } from './components/Footer/Footer';
import { TodoProvider } from './components/context/TodoContext';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoProvider>
          <Header />

          <Todos />

          <Footer />
        </TodoProvider>
      </div>
    </div>
  );
};
