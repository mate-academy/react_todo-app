import { createContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { Tabs } from '../types/Tabs';

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

function useLocalStorage(key: string, initialTodos: Todo[]) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const storedData = localStorage.getItem(key);

      return storedData ? JSON.parse(storedData) : initialTodos;
    } catch (e) {
      return initialTodos;
    }
  });

  const save = (todosToSet: Todo[]) => {
    setTodos(todosToSet);
    localStorage.setItem(key, JSON.stringify(todosToSet));
  };

  return [todos, save] as [Todo[], (todosToSet: Todo[]) => void];
}

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
