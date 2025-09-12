import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FilterType } from '../../types/FilterType';
import { Todo } from '../../types/Todo';
import { useLocalStorage } from '../../services/useLocalStorage';

type TodoContextType = {
  filterType: FilterType;
  setFilterType: (filter: FilterType) => void;
  todos: Todo[];
  setTodos: (v: Todo[] | ((prev: Todo[]) => Todo[])) => void;
  addTodo: (newTodo: Omit<Todo, 'id'>) => void;
  deleteTodo: (todoId: number) => void;
  toggleTodo: (todoId: number) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  updateTodo: (id: number, newTitle: string) => void;
};

export const TodoContext = React.createContext<TodoContextType>({
  filterType: FilterType.ALL,
  setFilterType: () => {},
  todos: [],
  setTodos: () => {},
  addTodo: () => {},
  deleteTodo: () => {},
  toggleTodo: () => {},
  inputRef: { current: null },
  updateTodo: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = useCallback(
    (newTodo: Omit<Todo, 'id'>) => {
      const todoToAdd: Todo = {
        ...newTodo,
        id: +new Date(),
      };

      setTodos(current => [...current, todoToAdd]);
    },
    [setTodos],
  );

  const deleteTodo = useCallback(
    (todoId: number) => {
      setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
      inputRef.current?.focus();
    },

    [setTodos],
  );

  const toggleTodo = useCallback(
    (todoId: number) => {
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    },
    [setTodos],
  );

  const updateTodo = useCallback(
    (id: number, newTitle: string) => {
      const trimmed = newTitle.trim();

      if (trimmed === '') {
        setTodos(prev => prev.filter(t => t.id !== id));
      } else {
        setTodos(prev =>
          prev.map(t => (t.id === id ? { ...t, title: trimmed } : t)),
        );
      }
    },
    [setTodos],
  );

  const value = useMemo(
    () => ({
      filterType,
      setFilterType,
      todos,
      setTodos,
      addTodo,
      deleteTodo,
      toggleTodo,
      inputRef,
      updateTodo,
    }),
    [
      filterType,
      todos,
      addTodo,
      deleteTodo,
      setTodos,
      toggleTodo,
      inputRef,
      updateTodo,
    ],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
