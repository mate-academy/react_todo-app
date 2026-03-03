/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [status, setStatus] = useState<FilterStatus>(FilterStatus.All);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList status={status} />

        <Footer status={status} setStatus={setStatus} />
      </div>
    </div>
  );
};
