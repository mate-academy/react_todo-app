/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';

export const App: React.FC = () => {
  // eslint-disable-next-line no-console
  console.log('render App');

  return (
    <div className="todoapp">
      <Header />
      <Main />
    </div>
  );
};
