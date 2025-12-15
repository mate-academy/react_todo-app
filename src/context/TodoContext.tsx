import { createContext, useContext, useEffect, useState } from 'react';
import { Todo } from '../types/todo';
import { FILTERS, FilterType } from '../constants';

export type TodoContextType = {
  todos: Todo[];
  filter: FilterType;
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
  clearCompleted: () => void;
  toggleAll: (completed: boolean) => void;
  setFilter: (newFilter: FilterType) => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>(FILTERS.all);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const data = localStorage.getItem('todos');

    if (data) {
      const initialTodos: Todo[] = JSON.parse(data);

      setTodos(initialTodos);
      if (initialTodos.length > 0) {
        const maxId = Math.max(...initialTodos.map(t => t.id));

        setNextId(maxId + 1);
      }
    }
  }, []);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: nextId,
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNextId(prevId => prevId + 1);
  };

  const deleteTodo = (idToDelete: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== idToDelete);

    setTodos(updatedTodos);
  };

  const toggleTodo = (idToggled: number) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === idToggled) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const activeTodos = todos.filter(todo => !todo.completed);

    setTodos(activeTodos);
  };

  const toggleAll = (completedToggle: boolean) => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: completedToggle,
    }));

    setTodos(updatedTodos);
  };

  const updateTodo = (idUpdated: number, titleUpdated: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === idUpdated) {
        return {
          ...todo,
          title: titleUpdated,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const contextValue: TodoContextType = {
    todos,
    filter,
    addTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    toggleAll,
    updateTodo,
    setFilter,
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (context === null) {
    throw new Error('useTodos must be used within a TodoProvider');
  }

  return context;
};
