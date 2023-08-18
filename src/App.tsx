import { useContext, useMemo } from 'react';

import { TodoContext } from './TodoContext/TodoContext';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoToggleAll } from './components/TodoToggleAll/TodoToggleAll';

import { Filter } from './types/Filters';
import { TodoCounter } from './components/TodoCounter/TodoCounter';
import { TodoClearButton } from './components/TodoClearButton/TodoClearButton';

export const App: React.FC = () => {
  const { items, getVisibleItems, filter } = useContext(TodoContext);

  const isCompitedTasks = useMemo(
    () => items.some(item => item.completed),
    [items],
  );

  const isShowElements = items.length > 0;

  const visibleItems = useMemo(
    () => getVisibleItems(filter as Filter, items),
    [filter, items],
  );

  return (
    <div className="todoapp">
      <header className="header">
        <h1>
          Todos
        </h1>
        <TodoForm />
      </header>

      { isShowElements && (
        <section className="main">
          <TodoToggleAll />
          <TodoList list={visibleItems} />
        </section>
      )}

      { isShowElements && (
        <footer className="footer">
          <TodoCounter />
          <TodoFilter />
          {isCompitedTasks && <TodoClearButton />}
        </footer>
      )}
    </div>
  );
};
