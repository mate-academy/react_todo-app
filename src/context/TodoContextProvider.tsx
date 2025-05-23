import { FC, createContext, useEffect, useState } from 'react';
import { Status, Todo } from '../types';
import normalizeTodos from '../utils/normalizeTodos';

interface TodoContextType {
  todos: Todo[];
  currentStatus: Status;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCurrentStatus: (status: Status) => void;
  normalizedTodos: Todo[];
}

interface Props {
  children: React.ReactNode;
}

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  currentStatus: Status.ALL,
  setTodos: () => {},
  setCurrentStatus: () => {},
  normalizedTodos: [],
});

export const TodoProvider: FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const localTodos = localStorage.getItem('todos');

    if (localTodos) {
      return JSON.parse(localTodos) as Todo[];
    }

    return [];
  });

  const [currentStatus, setCurrentStatus] = useState<Status>(Status.ALL);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const normalizedTodos = normalizeTodos(todos, currentStatus);

  const contextValue: TodoContextType = {
    todos,
    setTodos,
    currentStatus,
    setCurrentStatus,
    normalizedTodos,
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
