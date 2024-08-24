import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import { Todo } from '../types/TodoType';

interface TodosContextType {
  todos: Todo[];
  addTodo: (newTodo: Todo) => void;
  deleteTodo: (indexToDelete: number) => void;
  toggleTodo: (indexToToggle: number) => void;
  clearCompletedTodos: () => void;
  updateTodo: (id: number, updates: Partial<Todo>) => void;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const useTodos = () => {
  const context = useContext(TodosContext);

  if (context === undefined) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return context;
};

export function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, { ...newTodo, id: Date.now() }]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo: Todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const updateTodo = (id: number, updates: Partial<Todo>) => {
    setTodos((prevTodos: Todo[]) =>
      prevTodos.map(todo => (todo.id === id ? { ...todo, ...updates } : todo)),
    );
  };

  const clearCompletedTodos = () => {
    setTodos(todos.filter((todo: Todo) => !todo.completed));
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
        clearCompletedTodos,
        updateTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}
