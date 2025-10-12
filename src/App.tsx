/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { ErrorNotifications } from './components/ErrorNotification';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all');

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <Main filter={filter} />

        <Footer filter={filter} setFilter={setFilter} />
      </div>
      <ErrorNotifications />
    </div>
  );
};
