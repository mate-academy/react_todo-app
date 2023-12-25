import {
  createContext, ReactNode, useContext,
} from 'react';
import { Todo } from './TodoType';
import { useLocalStorage } from './useLocalStorage';

interface MyContextProps {
  todos: Todo[]
  newTodo: (title: string) => void
  toggleTodo: (id: number) => void
  removeTodo: (id: number) => void
  clearCompleted: () => void
  updateTitle: (id: number, title: string) => void
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

interface MyContextProviderProps {
  children: ReactNode;
}

export const useMyContext = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }

  return context;
};

export const MyContextProvider: React.FC<MyContextProviderProps>
= ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const newTodo = (title: string) => {
    const todo = {
      id: new Date().getTime(),
      title,
      completed: false,
    };

    setTodos((prev) => [...prev, todo]);
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((item) => (
      item.id === id ? { ...item, completed: !item.completed } : item));

    setTodos(updatedTodos);
  };

  const removeTodo = (id: number) => {
    const updatedTodos = todos.filter((item) => item.id !== id);

    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const updatedTodos = todos.filter((item) => item.completed === false);

    setTodos(updatedTodos);
  };

  const updateTitle = (id: number, title: string) => {
    const todo = todos.find((item) => item.id === id);
    const newTitle = title.trim();

    if (todo) {
      let updatedTodos: Todo[] = [];

      if (newTitle) {
        updatedTodos = todos.map((item) => (
          item.id === id ? { ...item, title: newTitle } : item));
      } else {
        updatedTodos = todos.filter((item) => item.id !== id);
      }

      setTodos(updatedTodos);
    }
  };

  return (
    <MyContext.Provider value={{
      todos,
      newTodo,
      toggleTodo,
      removeTodo,
      clearCompleted,
      updateTitle,
    }}
    >
      {children}
    </MyContext.Provider>
  );
};
