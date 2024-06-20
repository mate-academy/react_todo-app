/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';

import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { StatisticContext } from './components/StoreTodos/StoreTodos';
// eslint-disable-next-line max-len
import { FilterProvider } from './components/FilterProvider/FilterProvider';

export const App: React.FC = () => {
  const statistic = useContext(StatisticContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {statistic.all > 0 && (
          <FilterProvider>
            <TodoList />
            <Footer />
          </FilterProvider>
        )}
      </div>
    </div>
  );
};
