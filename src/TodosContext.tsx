import { createContext, useContext, useState } from 'react';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { useLocalStorage } from './hooks/useLocalStorage';

type TodosContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  selectedFilter: Filter;
  setSelectedFilter: React.Dispatch<React.SetStateAction<Filter>>;
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (todo: Todo) => void;
};

export const TodosContext = createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  selectedFilter: Filter.All,
  setSelectedFilter: () => {},
  addTodo: () => {},
  removeTodo: () => {},
  toggleTodo: () => {},
  updateTodo: () => {},
});

export const useTodos = () => useContext(TodosContext);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [selectedFilter, setSelectedFilter] = useState<Filter>(Filter.All);

  const addTodo = (title: string) => {
    setTodos(prev => [...prev, { id: Date.now(), title, completed: false }]);
  };

  const removeTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(prev => {
      return prev.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo,
      );
    });
  };

  const value = {
    todos,
    setTodos,
    selectedFilter,
    setSelectedFilter,
    addTodo,
    removeTodo,
    toggleTodo,
    updateTodo,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
