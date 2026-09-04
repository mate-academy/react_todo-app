import { createContext, useContext, useEffect, useState } from 'react';
import { Todo } from './types/todo';

type FilterStatus = 'all' | 'active' | 'completed';

interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  clearCompleted: () => void;
  filterStatus: string;
  setFilterStatus: React.Dispatch<React.SetStateAction<FilterStatus>>;
  toggleAll: () => void;
  updateTodo: (id: number, newTitle: string) => void;
}

interface TodoProviderProps {
  children: React.ReactNode;
}

const TodoContext = createContext<TodoContextType | null>(null);

export function TodoProvider({ children }: TodoProviderProps) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo(title: string) {
    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
  }

  function toggleTodo(id: number) {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function toggleAll() {
    const areAllCompleted = todos.every(todo => todo.completed);
    const newStatus = !areAllCompleted;

    setTodos(currentTodos =>
      currentTodos.map(todo => ({
        ...todo,
        completed: newStatus,
      })),
    );
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function clearCompleted() {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }

  function updateTodo(id: number, newTitle: string) {
    const todoToUpdate = todos.find(todo => todo.id === id);

    if (!todoToUpdate) {
      return;
    }

    if (newTitle.trim().length === 0) {
      deleteTodo(todoToUpdate.id);

      return;
    }

    if (newTitle.trim() === todoToUpdate.title.trim()) {
      return;
    }

    const updatedTodo = {
      ...todoToUpdate,
      title: newTitle.trim(),
    };

    setTodos(current =>
      current.map(todo => (todo.id === id ? updatedTodo : todo)),
    );
  }

  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  const value = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    filterStatus,
    setFilterStatus,
    toggleAll,
    updateTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos(): TodoContextType {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('---');
  }

  return context;
}
