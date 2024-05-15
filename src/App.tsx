import React, { useState } from 'react';
import { TodoProvider } from './components/TodoContext';
import { TodoList } from './components/TodoList';
import { TodoInput } from './components/TodoInput';
import { TodoFooter } from './components/TodoFooter';
import { Query } from './types/Query';

export const App: React.FC = () => {
  const [filter, setFilter] = useState(Query.All);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodoProvider>
        <div className="todoapp__content">
          <TodoInput />

          <TodoList query={filter} />

          <TodoFooter setQuery={setFilter} filter={filter} />
        </div>
      </TodoProvider>
    </div>
  );
};
