import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Todo } from './types/Todo';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodosContext } from './store/TodosContext';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { FilterOptions } from './types/FilterOptions';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState(FilterOptions.ALL);

  return (
    <div className="todoapp">
      <TodosContext.Provider
        value={{
          todos,
          filter,
          setTodos,
          setFilter,
        }}
      >
        <TodoHeader />
        <TodoList />
        {todos.length > 0 && (<TodoFilter />)}
      </TodosContext.Provider>
    </div>
  );
};
