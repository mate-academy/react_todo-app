import { createContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { Tabs } from '../types/Tabs';
import { useLocalStorage } from '../hooks/useLocalStorage';

type DefaultValueType = {
  todos: Todo[];
  setTodos: (todosToSet: Todo[]) => void;
  selectedFilter: Tabs;
  setSelectedFilter: (tab: Tabs) => void;
  todosToDisplay: Todo[]
};

export const TodosContext = createContext<DefaultValueType>({
  todos: [],
  setTodos: () => {},
  selectedFilter: Tabs.All,
  setSelectedFilter: () => {},
  todosToDisplay: [],
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [selectedFilter, setSelectedFilter] = useState<Tabs>(Tabs.All);

  const todosToDisplay = todos.filter(todo => {
    switch (selectedFilter) {
      case Tabs.All:
        return todo;
      case Tabs.Active:
        return !todo.completed;
      case Tabs.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        selectedFilter,
        setSelectedFilter,
        todosToDisplay,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
