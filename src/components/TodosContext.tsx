import {
  ReactNode, createContext, useContext, useState, useEffect,
} from 'react';
import { Todo } from '../Types/Todo';

interface TodosProviderProps {
  children: ReactNode;
}

interface TodosContextValue {
  todos: Todo[];
  addTodo: (newTodo: Todo) => void;
  clearCompleted: () => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number, newText: string) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodosContext = createContext<TodosContextValue>({
  todos: [],
  addTodo: () => {},
  deleteTodo: () => {},
  toggleTodo: () => {},
  setTodos: () => [],
  clearCompleted: () => {},
});

const LOCAL_STORAGE_KEY = 'todos';

export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);

    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number, newText?: string) => {
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
            title: newText !== undefined
              ? newText
              : todo.title,
          };
        }

        return todo;
      });
    });
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={{
      todos, addTodo, deleteTodo, toggleTodo, setTodos, clearCompleted,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return context;
};
