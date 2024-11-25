import React, { useContext, useMemo, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

type TodoContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  error: string;
  setError: (err: string) => void;
  showError: (message: string) => void;
  activeTodoId: number | null;
  setActiveTodoId: (todoId: number | null) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  activeTodoList: number[];
  setActiveTodoList: (activeTodoIds: number[]) => void;
  tempTodo: Todo | null;
  setTempTodo: (todo: Todo | null) => void;
  isSubmitting: boolean;
  setIsSubmitting: (issubmiting: boolean) => void;
  todoTitle: string;
  setTodoTitle: (newtitle: string) => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export const TodoContext = React.createContext<TodoContextType | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [todoTitle, setTodoTitle] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [activeTodoId, setActiveTodoId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeTodoList, setActiveTodoList] = useState<number[]>([]);

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      isLoading,
      setIsLoading,
      error,
      setError,
      todoTitle,
      setTodoTitle,
      activeTodoId,
      setActiveTodoId,
      isSubmitting,
      setIsSubmitting,
      tempTodo,
      setTempTodo,
      inputRef,
      activeTodoList,
      setActiveTodoList,
      showError,
      filter,
      setFilter,
    }),
    [todos, todoTitle, filter, activeTodoId, activeTodoList, error],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }

  return context;
};
