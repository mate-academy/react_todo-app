import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FilterStatus, Todo } from '../types/Todo';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filterStatus: FilterStatus;
  setFilterStatus: React.Dispatch<React.SetStateAction<FilterStatus>>;
  handleDeleteTodo: (todoId: number) => void;
  handleDeleteAllCompletedTodos: () => void;
  filteredTodos: Todo[];
  inputRef: React.RefObject<HTMLInputElement>;
}

export const TodoContext = React.createContext<Props>({
  todos: [],
  setTodos: () => {},
  filterStatus: FilterStatus.ALL,
  setFilterStatus: () => {},
  handleDeleteTodo: () => {},
  handleDeleteAllCompletedTodos: () => {},
  filteredTodos: [],
  inputRef: { current: null },
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.ALL,
  );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterStatus) {
        case FilterStatus.ACTIVE:
          return !todo.completed;
        case FilterStatus.COMPLETED:
          return todo.completed;
        default:
          return true;
      }
    });
  }, [filterStatus, todos]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleDeleteTodo = useCallback((todoId: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
    inputRef.current?.focus();
  }, []);

  const handleDeleteAllCompletedTodos = useCallback(() => {
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
    inputRef.current?.focus();
  }, []);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      filteredTodos,
      filterStatus,
      setFilterStatus,
      handleDeleteTodo,
      handleDeleteAllCompletedTodos,
      inputRef,
    }),
    [
      todos,
      filterStatus,
      filteredTodos,
      handleDeleteTodo,
      handleDeleteAllCompletedTodos,
    ],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
