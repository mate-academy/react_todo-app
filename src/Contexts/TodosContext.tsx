import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Todo } from '../types/Todo';
import { TodoStatus } from '../types/TodoStatus';

interface TodosContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filterStatus: TodoStatus;
  setFilterStatus: React.Dispatch<React.SetStateAction<TodoStatus>>;
  clearAllCompletedTodos: () => void;
  filteredTodos: Todo[];
  inputFocus: React.RefObject<HTMLInputElement>;
}

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  filterStatus: TodoStatus.all,
  setFilterStatus: () => {},
  clearAllCompletedTodos: () => {},
  filteredTodos: [],
  inputFocus: { current: null },
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filterStatus, setFilterStatus] = useState<TodoStatus>(TodoStatus.all);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterStatus) {
        case TodoStatus.active:
          return !todo.completed;

        case TodoStatus.completed:
          return todo.completed;

        default:
          return true;
      }
    });
  }, [todos, filterStatus]);

  const inputFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputFocus.current?.focus();
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const clearAllCompletedTodos = useCallback(() => {
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
    inputFocus.current?.focus();
  }, []);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      clearAllCompletedTodos,
      filterStatus,
      setFilterStatus,
      filteredTodos,
      inputFocus,
    }),
    [todos, filterStatus, filteredTodos, clearAllCompletedTodos],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
