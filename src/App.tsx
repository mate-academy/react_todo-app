/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToodList } from './components/TodoList';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <ToodList />

        <Footer />
      </div>
    </div>
  );
};
