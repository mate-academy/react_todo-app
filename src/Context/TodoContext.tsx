import React, { createContext, useEffect, useState, useRef } from 'react';
import { Todo } from '../Types/Todo';
import { useLocalStorage } from '../Hooks/useLocalStorage';

type TodoContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (title: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
  filteredTodos: Todo[];
  filterBy: string;
  setFilterBy: React.Dispatch<React.SetStateAction<string>>;
  deleteCompletedTodos: () => void;
  headerInputRef: React.RefObject<HTMLInputElement>;
  focusInput: () => void;
};

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
  addTodo: () => {},
  deleteTodo: () => {},
  updateTodo: () => {},
  filteredTodos: [],
  filterBy: 'all',
  setFilterBy: () => {},
  deleteCompletedTodos: () => {},
  headerInputRef: { current: null },
  focusInput: () => {},
});

type TodoProviderProps = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState('all');
  const headerInputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (headerInputRef.current) {
      headerInputRef.current.focus();
    }
  };

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: new Date().toString(),
      title,
      completed: false,
    };

    setTodos((prevTodos: Todo[]) => [...prevTodos, newTodo]);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));

    focusInput();
  };

  const updateTodo = (id: string, title: string) => {
    setTodos(
      todos.map((todo: Todo) => (todo.id === id ? { ...todo, title } : todo)),
    );
  };

  const deleteCompletedTodos = () => {
    setTodos(todos.filter((todo: Todo) => !todo.completed));

    focusInput();
  };

  useEffect(() => {
    const newFilteredTodos = todos.filter((todo: Todo) => {
      switch (filterBy) {
        case 'all':
          return true;
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        default:
          return true;
      }
    });

    setFilteredTodos(newFilteredTodos);
  }, [todos, filterBy]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        addTodo,
        deleteTodo,
        updateTodo,
        filteredTodos,
        setFilterBy,
        filterBy,
        deleteCompletedTodos,
        headerInputRef,
        focusInput,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
