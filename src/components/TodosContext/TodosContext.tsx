import { useState, createContext, useContext, useEffect } from 'react';
import { Todo } from '../types/Todo';

type TodosContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

type TodoProviderProps = {
  children: React.ReactNode;
};

export const TodosContext = createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
});

export const useTodos = () => useContext(TodosContext);

export const TodosProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      localStorage.setItem('todos', JSON.stringify([]));
      setTodos([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
