import React, {
  createContext, useContext, useState, ReactNode,
} from 'react';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodosContextType {
  todos: Todo[];
  filter: string;
  setTodos: React
    .Dispatch<React.SetStateAction<Todo[]>> | ((newValue: Todo[]) => void);
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  deleteTodo: (todoId: number) => void;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider: React
  .FC<{ children: ReactNode }> = ({ children }) => {
  const [filter, setFilter] = useState('all');

  function useLocalStorage<T>(key: string, startValue: T) {
    const [value, setValue] = useState<T>(() => {
      const storedValue = localStorage.getItem(key);

      return storedValue ? JSON.parse(storedValue) : startValue;
    });

    const save = (newValue: T) => {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    };

    return [value, save] as const;
  }

  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const deleteTodo = (todoId: number) => {
    const updatedTodos = todos.filter(t => t.id !== todoId);

    setTodos(updatedTodos);
  };

  return (
    <TodosContext.Provider value={{
      todos, setTodos, setFilter, filter, deleteTodo,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = (): TodosContextType => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return context;
};
