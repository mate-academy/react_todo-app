import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Todo } from '../types/Todo';

const todosTemp: Todo[] = [
  { id: 23, title: '123', completed: false },
  { id: 24, title: '567', completed: true },
];

interface TodoContextType {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export const TodoContext = createContext<TodoContextType>({
  todos: todosTemp,
  setTodos: () => {},
});

type TodoProviderProps = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const prevTodos = localStorage.getItem('todos');

    return prevTodos ? JSON.parse(prevTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
    }),
    [todos],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
