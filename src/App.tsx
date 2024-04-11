/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { TodosProvider } from './components/TodosProvider';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header />
          <TodoList />
          {/* Hide the footer if there are no todos */}
          <Footer />
        </div>
      </div>
    </TodosProvider>
  );
};
