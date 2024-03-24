import React, { useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import useLocalStorage from './hooks/useLocalStorage';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  todos: Todo[];
  selectedFilter: Selected;
  setSelectedFilter: (value: Selected) => void;
  showFilteredTodos: (value: Selected) => Todo[];
  setTodos: (prevTodos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
};

enum Selected {
  'all',
  'active',
  'completed',
}

export const TodosContext = React.createContext<ContextType>({
  todos: [],
  selectedFilter: Selected.all,
  setSelectedFilter: () => Selected.all,
  showFilteredTodos: () => [],
  setTodos: () => [],
  addTodo: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [selectedFilter, setSelectedFilter] = useState<Selected>(Selected.all);

  const showFilteredTodos = (value: Selected): Todo[] => {
    switch (value) {
      case Selected.active:
        return todos.filter(item => !item.completed);
      case Selected.completed:
        return todos.filter(item => item.completed);
      default:
        return todos;
    }
  };

  const addTodo = (todo: Todo) => {
    setTodos([todo, ...todos]);
  };

  const value = useMemo(
    () => ({
      todos,
      selectedFilter,
      setSelectedFilter,
      showFilteredTodos,
      setTodos,
      addTodo,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [todos, selectedFilter],
  );

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
