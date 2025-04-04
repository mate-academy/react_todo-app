import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import { Todo, FilterType, FILTERS } from '../types/Todo';

interface TodoContextType {
  todos: Todo[];
  filterType: FilterType;
  handleAdd: (title: string) => void;
  handleDelete: (id: number) => void;
  handleToggle: (id: number) => void;
  handleUpdate: (id: number, title: string) => void;
  handleToggleAll: () => void;
  handleClearCompleted: () => void;
  handleFilterChange: (filter: FilterType) => void;
  visibleTodos: Todo[];
  activeTodosCount: number;
  completedTodosCount: number;
  isAllCompleted: boolean;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filterType, setFilterType] = useState<FilterType>(FILTERS.all);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const generateId = (): number => +new Date();

  const handleAdd = (title: string) => {
    const trimmedTitle = title.trim();

    if (trimmedTitle) {
      const newTodo: Todo = {
        id: generateId(),
        title: trimmedTitle,
        completed: false,
      };

      setTodos([...todos, newTodo]);
    }
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggle = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleUpdate = (id: number, title: string) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      handleDelete(id);

      return;
    }

    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, title: trimmedTitle } : todo,
      ),
    );
  };

  const handleToggleAll = () => {
    const areAllCompleted = todos.every(todo => todo.completed);

    setTodos(
      todos.map(todo => ({
        ...todo,
        completed: !areAllCompleted,
      })),
    );
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleFilterChange = (filter: FilterType) => {
    setFilterType(filter);
  };

  const visibleTodos = todos.filter(todo => {
    switch (filterType) {
      case FILTERS.active:
        return !todo.completed;
      case FILTERS.completed:
        return todo.completed;
      case FILTERS.all:
      default:
        return true;
    }
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;
  const isAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const contextValue: TodoContextType = {
    todos,
    filterType,
    handleAdd,
    handleDelete,
    handleToggle,
    handleUpdate,
    handleToggleAll,
    handleClearCompleted,
    handleFilterChange,
    visibleTodos,
    activeTodosCount,
    completedTodosCount,
    isAllCompleted,
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error('useTodo має використовуватися всередині TodoProvider');
  }

  return context;
};
