import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import useLocalStorage from './useLocalStorage';
import { FilterBy } from '../types/FilterBy';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type TodoContextType = {
  filteredTodos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
  setFilter: (filter: FilterBy) => void;
  filter: FilterBy;
  updateTitleTodo: (title: string, id: number) => void;
  todos: Todo[];
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState(FilterBy.ALL);

  const addTodo = useCallback(
    (title: string) => {
      const newTodo: Todo = {
        id: todos.length + 1,
        title,
        completed: false,
      };

      setTodos([...todos, newTodo]);
    },
    [setTodos, todos],
  );

  const toggleAll = useCallback(() => {
    const allCompleted = todos.every(todo => todo.completed);

    const updateTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updateTodos);
  }, [setTodos, todos]);

  const toggleTodo = useCallback(
    (id: number) => {
      const newTodos = todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });

      setTodos(newTodos);
    },
    [setTodos, todos],
  );

  const deleteTodo = useCallback(
    (id: number) => {
      const newTodos = todos.filter(todo => todo.id !== id);

      setTodos(newTodos);
    },
    [setTodos, todos],
  );

  const clearCompleted = useCallback(() => {
    const updateTodos = todos.filter(todo => !todo.completed);

    setTodos(updateTodos);
  }, [setTodos, todos]);

  const updateTitleTodo = useCallback(
    (title: string, id: number) => {
      const updateTodos = todos.map(todo =>
        todo.id === id ? { ...todo, title } : todo,
      );

      setTodos(updateTodos);
    },
    [setTodos, todos],
  );

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case FilterBy.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case FilterBy.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [filter, todos]);

  const contextValue = useMemo(
    () => ({
      filteredTodos,
      addTodo,
      toggleTodo,
      deleteTodo,
      toggleAll,
      clearCompleted,
      setFilter,
      filter,
      updateTitleTodo,
      todos,
    }),
    [
      filteredTodos,
      addTodo,
      toggleTodo,
      deleteTodo,
      toggleAll,
      clearCompleted,
      setFilter,
      filter,
      updateTitleTodo,
      todos,
    ],
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return context;
};

export default TodoContext;
