import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

type TodoContextStateProps = {
  todos: Todo[];
  headerInputRef: React.RefObject<HTMLInputElement>;
  filter: Filter;
  filteredTodos: Todo[];
};

type TodoContextUpdaterProps = {
  addTodo: (title: string) => void;
  toggleTodoStatus: (id: number) => void;
  toggleMultipleTodosStatus: () => void;
  updateTodoTitle: (id: number, title: string) => void;
  deleteTodo: (id: number) => void;
  setFilter: (filter: Filter) => void;
  deleteMultipleTodos: () => void;
};

const TodoContextState = createContext<TodoContextStateProps | undefined>(
  undefined,
);

const TodoContextUpdater = createContext<TodoContextUpdaterProps | undefined>(
  undefined,
);

export const useTodoContextState = () => {
  const context = useContext(TodoContextState);

  if (!context) {
    throw new Error('useTodoContextState must be used within a TodoProvider');
  }

  return context;
};

export const useTodoContextUpdater = () => {
  const context = useContext(TodoContextUpdater);

  if (!context) {
    throw new Error('useTodoContextUpdater must be used within a TodoProvider');
  }

  return context;
};

type TodoProviderProps = React.PropsWithChildren<{}>;

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');

    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [filter, setFilter] = useState<Filter>('All');
  const headerInputRef = useRef<HTMLInputElement>(null);

  const areAllCompleted = useMemo(() => {
    return todos.every(todo => todo.completed);
  }, [todos]);

  const updatedTodos = useMemo(() => {
    return todos.map(todo => {
      return { ...todo, completed: !areAllCompleted };
    });
  }, [areAllCompleted, todos]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));

    setTimeout(() => {
      headerInputRef.current?.focus();
    }, 0);
  }, [todos]);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') {
      return !todo.completed;
    }

    if (filter === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  const addTodo = useCallback((title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  }, []);

  const toggleTodoStatus = useCallback((id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const toggleMultipleTodosStatus = useCallback(() => {
    setTodos(updatedTodos);
  }, [updatedTodos]);

  const updateTodoTitle = useCallback((id: number, newTitle: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, title: newTitle.trim() } : todo,
      ),
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  const deleteMultipleTodos = useCallback(() => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  }, []);

  const stateValue = useMemo(
    () => ({
      todos,
      headerInputRef,
      filter,
      filteredTodos,
    }),
    [filter, filteredTodos, todos],
  );

  const updaterValue = useMemo(
    () => ({
      addTodo,
      toggleTodoStatus,
      toggleMultipleTodosStatus,
      updateTodoTitle,
      deleteTodo,
      setFilter,
      deleteMultipleTodos,
    }),
    [
      addTodo,
      deleteMultipleTodos,
      deleteTodo,
      toggleMultipleTodosStatus,
      toggleTodoStatus,
      updateTodoTitle,
    ],
  );

  return (
    <TodoContextState.Provider value={stateValue}>
      <TodoContextUpdater.Provider value={updaterValue}>
        {children}
      </TodoContextUpdater.Provider>
    </TodoContextState.Provider>
  );
};
