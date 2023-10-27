import { createContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { Tabs } from '../types/Tabs';
import { useLocalStorage } from '../hooks/useLocalStorage';

type DefaultValueType = {
  todos: Todo[];
  setTodos: (todosToSet: Todo[]) => void;
  selectedFilter: Tabs;
  setSelectedFilter: (tab: Tabs) => void;
};

export const TodosContext = createContext<DefaultValueType>({
  todos: [],
  setTodos: () => {},
  selectedFilter: Tabs.All,
  setSelectedFilter: () => {},
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [selectedFilter, setSelectedFilter] = useState<Tabs>(Tabs.All);

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        selectedFilter,
        setSelectedFilter,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
