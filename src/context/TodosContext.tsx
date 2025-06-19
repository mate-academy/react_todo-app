import { createContext, useState, useEffect, ReactNode } from 'react';
import { Todo } from '../types/Todo';
import { FilterTodos } from '../types/FilterTodos';

type TodoContextType = {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: FilterTodos;
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  toggleAll: () => void;
  setFilter: (value: FilterTodos) => void;
  clearCompleted: () => void;
  editTodo: (id: string, title: string) => void;
};

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');

    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState<FilterTodos>('all');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: (+new Date()).toString(),
      title: title.trim(),
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const removeTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(prev => prev.map(todo => ({ ...todo, completed: !allCompleted })));
  };

  const editTodo = (id: string, title: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, title: title.trim() } : todo,
      ),
    );
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    switch (filter) {
      case 'active':
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;
      default:
        setFilteredTodos(todos);
    }
  }, [todos, filter]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        filter,
        filteredTodos,
        setFilter,
        addTodo,
        removeTodo,
        toggleTodo,
        toggleAll,
        clearCompleted,
        editTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
