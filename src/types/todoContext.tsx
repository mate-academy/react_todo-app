import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Todo } from './todo';
import { Filter } from './Filter';

interface TodosContextType {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

type FilterContextType = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export const TodosContext = createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
});

export const FilterContext = createContext<FilterContextType>({
  filter: Filter.All,
  setFilter: () => {},
});

export const TodosContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem('todos') || '[]'),
  );

  const [filter, setFilter] = useState<Filter>(Filter.All);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      <FilterContext.Provider value={{ filter, setFilter }}>
        {children}
      </FilterContext.Provider>
    </TodosContext.Provider>
  );
};
