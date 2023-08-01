/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
// import React, { useState } from 'react';
import React, { useState } from 'react';
import { TodosContext } from './TodosContext';
// import { Todo } from './types/Todo';
import { useLocalStorage } from './useLocalStorage';
import { FilterType } from './types/Filter';
import { Header } from './Header';
import { TodosFilter } from './TodosFilter';
import { TodosList } from './TodosList';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('', []);
  const [filter, setFilter] = useState(FilterType.All);
  // const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div className="todoapp">
      <TodosContext.Provider value={{ todos, setTodos }}>
        <Header />

        <TodosList />

        <TodosFilter filter={filter} setFilter={setFilter} />
      </TodosContext.Provider>
    </div>
  );
};
