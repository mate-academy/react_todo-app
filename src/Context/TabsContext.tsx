import { createContext } from 'react';
import { useState, useEffect } from 'react';
import type {
  TasksProviderProps,
  Todo,
  TodosContextValue,
  TodoFilter,
} from '../Types';
import { FILTERS } from '../Constants';

export const TabsContext = createContext<TodosContextValue>(null!);

export const TabsProvider = ({ children }: TasksProviderProps) => {
  // const [todo, setTodo] = useState<Todo | {}>({});
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState<TodoFilter>(FILTERS.ALL);

  const isEmpty = todos.length <= 0;

  useEffect(() => {
    if (todos.length === 0) {
      localStorage.removeItem('todos');

      return;
    }

    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    setTodos(prevTodos => {
      return [
        ...prevTodos,
        {
          id: Date.now(),
          title,
          completed: false,
        },
      ];
    });
  };

  /// footer function

  const visibleTodos = todos.filter(todo => {
    if (filter === FILTERS.ACTIVE) {
      return !todo.completed;
    }

    if (filter === FILTERS.COMPLETED) {
      return todo.completed;
    }

    return true;
  });

  // const activeTodo: Todo[] = useMemo(() => {
  //   return todos.filter(todo => todo.completed === false);
  // }, [todos]);

  // const completedTodo: Todo[] = useMemo(() => {
  //   return todos.filter(todo => todo.completed === true);
  // }, [todos]);

  const toggleTodos = () => {
    setTodos(prevTodos => {
      const shouldComplete = !prevTodos.every(todo => todo.completed);

      return prevTodos.map(todo => ({
        ...todo,
        completed: shouldComplete,
      }));
    });
  };

  // single todo validation

  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: number, title: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === id ? { ...todo, title } : todo)),
    );
  };

  return (
    <TabsContext.Provider
      value={{
        todos,
        filter,
        setFilter,
        visibleTodos,
        addTodo,
        isEmpty,
        toggleTodos,
        toggleTodo,
        deleteTodo,
        updateTodo,
        setTodos,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
