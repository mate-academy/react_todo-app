import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { FILTERS } from '../constants/filters';
import { Todo } from '../types/todo';
import { loadTodosFromStorage, saveTodosToStorage } from '../utils/storage';

interface TodoContextValue {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: string;
  activeTodos: Todo[];
  completedTodos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodoTitle: (id: number, title: string) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
  setFilter: (filter: string) => void;
}

const TodoContext = createContext<TodoContextValue | null>(null);

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodos must be used within TodoProvider');
  }

  return context;
};

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(loadTodosFromStorage);

  const getFilterFromHash = () => {
    const hash = window.location.hash.replace('#/', '');

    if (hash === 'active') {
      return FILTERS.active;
    }

    if (hash === 'completed') {
      return FILTERS.completed;
    }

    return FILTERS.all;
  };

  const [filter, setFilter] = useState(getFilterFromHash);

  useEffect(() => {
    saveTodosToStorage(todos);
  }, [todos]);

  useEffect(() => {
    const handleHashChange = () => {
      setFilter(getFilterFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const updateTodoTitle = (id: number, title: string) => {
    if (title.trim() === '') {
      deleteTodo(id);

      return;
    }

    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, title } : todo)),
    );
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(prev => prev.map(todo => ({ ...todo, completed: !allCompleted })));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  const filteredTodos = todos.filter(todo => {
    if (filter === FILTERS.active) {
      return !todo.completed;
    }

    if (filter === FILTERS.completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodos,
        filter,
        activeTodos,
        completedTodos,
        addTodo,
        deleteTodo,
        toggleTodo,
        updateTodoTitle,
        toggleAll,
        clearCompleted,
        setFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
