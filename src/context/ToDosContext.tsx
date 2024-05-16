import React, { useEffect, useMemo, useState } from 'react';
import { SortType, TodoType } from '../types/types';

type TodoMethodsType = {
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  renameTodo: (id: number, title: string) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
};

type TodosContextType = {
  todos: TodoType[];
  sorted: SortType;
  setSorted: React.Dispatch<React.SetStateAction<SortType>>;
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  sorted: SortType.All,
  setSorted: () => {},
});

export const TodoMethod = React.createContext<TodoMethodsType>({
  addTodo: () => {},
  deleteTodo: () => {},
  toggleTodo: () => {},
  renameTodo: () => {},
  toggleAll: () => {},
  clearCompleted: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<TodoType[]>(() => {
    const storedTodos = localStorage.getItem('todos');

    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const methods = React.useMemo(
    () => ({
      addTodo(title: string) {
        const newTodo = {
          id: +new Date(),
          completed: false,
          title,
        };

        setTodos(currentTodos => [...currentTodos, newTodo]);
      },

      deleteTodo(id: number) {
        setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
      },

      toggleTodo(id: number) {
        setTodos(currentTodos =>
          currentTodos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
          ),
        );
      },

      renameTodo(id: number, title: string) {
        setTodos(currentTodos =>
          currentTodos.map(todo =>
            todo.id === id ? { ...todo, title } : todo,
          ),
        );
      },

      toggleAll() {
        setTodos(currentTodos => {
          const completed = currentTodos.some(todo => !todo.completed);

          return currentTodos.map(todo => ({ ...todo, completed }));
        });
      },

      clearCompleted() {
        setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
      },
    }),
    [],
  );

  const [sorted, setSorted] = useState<SortType>(SortType.All);

  const value = useMemo<TodosContextType>(
    () => ({
      todos,
      sorted,
      setSorted,
    }),
    [todos, sorted, setSorted],
  );

  return (
    <TodoMethod.Provider value={methods}>
      <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
    </TodoMethod.Provider>
  );
};
