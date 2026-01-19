import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Todo } from '../types/Todo';

export interface TodosContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (todo: Todo) => void;
  visibleTodos: Todo[];
  filter: string;
  setFilter: (filter: Filter) => void;
  countTodos: number;
  clearCompleted: () => void;
  toggleAll: () => void;
  mainInputRef: React.RefObject<HTMLInputElement>;
}

type Filter = 'all' | 'active' | 'completed';

export const TodoContext = React.createContext<TodosContextType | null>(null);

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    try {
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState<Filter>('all');

  const mainInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((todoTitle: string) => {
    const newTodo = {
      id: +new Date(),
      title: todoTitle.trim(),
      completed: false,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  }, []);

  const deleteTodo = useCallback((todoId: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
  }, []);

  const updateTodo = useCallback((newTodo: Todo) => {
    setTodos(currentTodos =>
      currentTodos.map(todo => (todo.id === newTodo.id ? newTodo : todo)),
    );
  }, []);

  const toggleAll = useCallback(() => {
    const areAllCompleted = todos.every(todo => todo.completed);

    setTodos(currentTodos =>
      currentTodos.map(todo => ({ ...todo, completed: !areAllCompleted })),
    );
  }, [todos]);

  const clearCompleted = useCallback(() => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  }, []);

  const filterTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    });
  }, [todos, filter]);

  const visibleTodos = filterTodos;

  const countTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const contextValue = useMemo(
    () => ({
      todos,
      addTodo,
      deleteTodo,
      updateTodo,
      visibleTodos,
      filter,
      setFilter,
      countTodos,
      clearCompleted,
      toggleAll,
      mainInputRef,
    }),
    [
      todos,
      addTodo,
      deleteTodo,
      updateTodo,
      visibleTodos,
      filter,
      countTodos,
      clearCompleted,
      toggleAll,
      mainInputRef,
    ],
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
