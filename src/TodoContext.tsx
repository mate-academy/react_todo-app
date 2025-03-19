import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import { Todo } from './types/Todo';
import { Filter } from './App';

interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  queryTodo: string;
  filter: Filter;
  tempTodo: Todo | null;
  isInputDisabled: boolean;
  isToggleAll: boolean;
  processingIds: number[];
  setQueryTodo: (queryTodo: string) => void;
  setFilter: (filter: Filter) => void;
  handleAddTodo: (title: string) => void;
  handleDeleteTodo: (todoId: number) => void;
  handleClearCompleted: () => void;
  handleStatusTodo: (todo: Todo) => void;
  handleToggleAll: () => void;
  handleUpdateTodo: (todo: Todo, newTitle: string) => Promise<Todo | null>;
  setError: (error: string | null) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  todoLeft: number;
  filteredTodos: Todo[];
  noTodo: boolean;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [queryTodo, setQueryTodo] = useState<string>('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [tempTodo] = useState<Todo | null>(null);
  const [isInputDisabled] = useState(false);
  const [isToggleAll] = useState<boolean>(false);
  const [processingIds] = useState<number[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const todoLeft = todos.filter(todo => !todo.completed).length;

  const noTodo = todos.length === 0;

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (title: string) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Title should not be empty');

      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: trimmedTitle,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setQueryTodo('');
  };

  const handleDeleteTodo = (todoId: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
  };

  const handleClearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  const handleStatusTodo = (todo: Todo) => {
    setTodos(prevTodos =>
      prevTodos.map(t =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t,
      ),
    );
  };

  const handleToggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(prevTodos =>
      prevTodos.map(todo => ({ ...todo, completed: !allCompleted })),
    );
  };

  const handleUpdateTodo = async (todo: Todo, newTitle: string) => {
    const trimmedTitle = newTitle.trim();

    if (!trimmedTitle) {
      setError('Title should not be empty');

      return null;
    }

    const updatedTodo = { ...todo, title: trimmedTitle };

    setTodos(prevTodos =>
      prevTodos.map(t => (t.id === todo.id ? updatedTodo : t)),
    );

    return updatedTodo;
  };

  const value = {
    todos,
    loading,
    error,
    queryTodo,
    filter,
    tempTodo,
    isInputDisabled,
    isToggleAll,
    processingIds,
    setQueryTodo,
    setFilter,
    handleAddTodo,
    handleDeleteTodo,
    handleClearCompleted,
    handleStatusTodo,
    handleToggleAll,
    handleUpdateTodo,
    setError,
    inputRef,
    todoLeft,
    filteredTodos,
    noTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }

  return context;
};
