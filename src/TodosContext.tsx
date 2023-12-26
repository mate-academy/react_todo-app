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
  left: () => number
  complited: () => number
  allCompleted: () => boolean
  setAll: () => void
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
    const updatedTodos = todos.filter((item) => !item.completed);

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

  const left = (): number => {
    return todos.reduce((sum, item) => {
      if (!item.completed) {
        return sum + 1;
      }

      return sum;
    }, 0);
  };

  const complited = (): number => {
    return todos.reduce((sum, item) => {
      if (item.completed) {
        return sum + 1;
      }

      return sum;
    }, 0);
  };

  const allCompleted = (): boolean => {
    return todos.every((item) => item.completed);
  };

  const setAll = () => {
    if (allCompleted()) {
      setTodos((prev) => prev.map((item) => ({ ...item, completed: false })));
    } else {
      setTodos((prev) => prev.map((item) => ({ ...item, completed: true })));
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
      left,
      complited,
      allCompleted,
      setAll,
    }}
    >
      {children}
    </MyContext.Provider>
  );
};
