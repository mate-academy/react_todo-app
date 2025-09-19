import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';

type Filter = 'ALL' | 'COMPLETED' | 'ACTIVE';

type TodosContextType = {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  updatedTodo: (todo: Todo, title: string) => void;
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  addTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
  setTodos: () => {},
  filter: 'ALL',
  setFilter: () => {},
  updatedTodo: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');

    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState<Filter>('ALL');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  };

  const updatedTodo = (updatingTodo: Todo, title: string) => {
    if (!title.trim()) {
      deleteTodo(updatingTodo.id);
    }

    setTodos(currentTodos => {
      const newTodos = [...currentTodos];
      const index = newTodos.findIndex(todo => todo.id === updatingTodo.id);

      const newTodo = {
        id: updatingTodo.id,
        title: title.trim(),
        completed: updatingTodo.completed,
      };

      newTodos.splice(index, 1, newTodo);

      return newTodos;
    });
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        setTodos,
        filter,
        setFilter,
        updatedTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
