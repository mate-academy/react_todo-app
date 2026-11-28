import React, {
  ReactNode,
  useState,
  useEffect,
  createContext,
} from 'react';

type TodosContextType = {
  todos: Todo[];
  setTodos: (newTodo: Todo[]) => void;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export const TodosContext = createContext<TodosContextType | null>(null);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem('todos') || '[]'),
  );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
