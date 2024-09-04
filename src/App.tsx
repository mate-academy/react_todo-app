import React, { useMemo, useRef, useState } from 'react';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

import { FilterBy } from './types/FilterBy';

import { useTodos } from './context/useTodos';
import { getFilteredTodos } from './utils/Helpers';

export const App: React.FC = () => {
  const [filterBy, setfilterBy] = useState<FilterBy>(FilterBy.All);
  const fieldTitle = useRef<HTMLInputElement>(null);
  const { todos } = useTodos();

  const filteredTodos = useMemo(
    () => getFilteredTodos(todos, filterBy),
    [filterBy, todos],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header fieldTitle={fieldTitle} />

        <TodoList fieldTitle={fieldTitle} todos={filteredTodos} />

        {!!todos.length && (
          <Footer
            setFilterBy={setfilterBy}
            filterBy={filterBy}
            fieldTitle={fieldTitle}
          />
        )}
      </div>
    </div>
  );
};
