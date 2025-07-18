import React, { useState, useContext } from 'react';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { FilterType } from './types/FilterType';
import { TodoContext } from './components/TodoContext';

export const App: React.FC = () => {
  const { hasTodos } = useContext(TodoContext);
  const [filterType, setFilterType] = useState<FilterType>('all');

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList filterType={filterType} />
        {hasTodos && (
          <Footer filterType={filterType} onFilterTypeChange={setFilterType} />
        )}
      </div>
    </div>
  );
};
