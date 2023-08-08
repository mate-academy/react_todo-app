import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodosHeader } from './components/TodosHeader';
import { TodosFooter } from './components/TodosFooter';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { TodosContext } from './components/TodosContext';

function filter(type: Filter, toFilter: Todo[]) {
  switch (type) {
    case Filter.Active:
      return toFilter.filter((item) => !item.completed);

    case Filter.Completed:
      return toFilter.filter((item) => item.completed);

    default:
      return toFilter;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filterType, setFilterType] = useState<Filter>(Filter.All);
  const filteredTodos = filter(filterType, todos) || [];

  return (
    <div className="todoapp">
      <TodosContext.Provider value={{
        todos,
        filteredTodos,
        filterType,
        setTodos,
        setFilterType,
      }}
      >

        <TodosHeader />

        {!!todos.length && (
          <>
            <TodoList />
            <TodosFooter />
          </>
        )}

      </TodosContext.Provider>
    </div>
  );
};
