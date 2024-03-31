import React, { useMemo, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Todo } from './types/todo';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { TodosContext } from './contexts/TodosContext';
import { Status } from './enums/status';
import { FilterContext } from './contexts/FilterContext';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [status, setStatus] = useState(Status.all);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
    }),
    [todos, setTodos],
  );

  const filterStatus = useMemo(
    () => ({
      status,
      setStatus,
    }),
    [status],
  );

  return (
    <div className="todoapp">
      <TodosContext.Provider value={value}>
        <FilterContext.Provider value={filterStatus}>
          <Header />
          {todos.length !== 0 && <Main />}
          {todos.length !== 0 && <Footer />}
        </FilterContext.Provider>
      </TodosContext.Provider>
    </div>
  );
};
