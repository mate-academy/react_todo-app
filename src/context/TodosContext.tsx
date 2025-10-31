import { createContext, useEffect, useMemo, useState } from 'react';
import Todo from '../types/Todo';
import { Filter } from '../types/Filter';

type TodosContextType = {
  todos: Todo[];
  setTodo: (todo: Todo) => void;
  toggleCompleted: (id: number) => void;
  toggleAll: () => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  deleteTodo: (id: number) => void;
  editTodo: (updatedTodo: Todo) => void;
  clearCompleted: () => void;
};

export const TodosContext = createContext<TodosContextType>({
  todos: [],
  setTodo: () => {},
  toggleCompleted: () => {},
  toggleAll: () => {},
  filter: Filter.All,
  setFilter: () => {},
  deleteTodo: () => {},
  editTodo: () => {},
  clearCompleted: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  useEffect(() => {
    const stored = localStorage.getItem('todos');

    if (stored === null) {
      setTodos([]);
      localStorage.setItem('todos', JSON.stringify([]));

      return;
    }

    if (stored) {
      try {
        setTodos(JSON.parse(stored));
      } catch {
        throw new Error('Cannot parse todos from localStorage');
      }
    }
  }, []);

  const storeTodos = (todosToStore: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(todosToStore));
    setTodos(todosToStore);
  };

  const toggleCompleted = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    storeTodos(updatedTodos);
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    storeTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);

    storeTodos(updatedTodos);
  };

  const editTodo = (updatedTodo: Todo) => {
    const updatedTodos = todos.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo,
    );

    storeTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const activeTodos = todos.filter(todo => !todo.completed);

    storeTodos(activeTodos);
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  const value = useMemo(
    () => ({
      todos,
      setTodo: (todo: Todo) => storeTodos([...todos, todo]),
      toggleCompleted,
      toggleAll,
      filter,
      setFilter: (f: Filter) => setFilter(f),
      deleteTodo,
      editTodo,
      clearCompleted,
    }),
    [todos, filter],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
