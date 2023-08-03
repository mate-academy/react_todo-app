import React, { useContext, useMemo } from 'react';

import { TodosList } from './components/TodosList/TodosList';
import { TodosForm } from './components/TodosForm/TodosForm';
import { TodosToggleAll } from './components/TodosToggleAll/TodosToggleAll';
import { TodosContext } from './TodosContext';
import { TodosCounter } from './components/TodosCounter/TodosCounter';
import { TodosFilters } from './components/TodosFilters/TodosFilters';
import { TodosClearAllButton }
  from './components/TodosClearAllButton/TodosClearAllButton';
import { FilterMode } from './types/FilterMode';

export const App: React.FC = () => {
  const { items, getVisibleItems, filterMode } = useContext(TodosContext);

  const isCompletedItems = useMemo(
    () => items.some(item => item.completed),
    [items],
  );

  const visibleItems = useMemo(
    () => getVisibleItems(filterMode as FilterMode, items),
    [filterMode, items],
  );

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodosForm />
      </header>

      <section className="main">
        <TodosToggleAll />
        <TodosList list={visibleItems} />
      </section>

      <footer className="footer">
        <TodosCounter />
        <TodosFilters />
        {isCompletedItems && <TodosClearAllButton />}
      </footer>
    </div>
  );
};
