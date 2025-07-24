import React, { useState } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { useGlobalState } from './hooks/GlobalHooks';
import { FilterType } from './constants/FilterType';

export const App: React.FC = () => {
  const { todos } = useGlobalState();
  const [filter, setFilter] = useState(FilterType.All);

  const shouldRenderFooter = todos.length > 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList filterBy={filter} />

        {shouldRenderFooter && (
          <Footer filterBy={filter} setFilterBy={setFilter} />
        )}
      </div>
    </div>
  );
};
