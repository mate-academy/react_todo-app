
import React, { createContext, useState, useMemo, useEffect } from 'react';
import { FILTER_TYPE } from '../constants';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

interface TodoContextType {
  todos: Todo[];
  newTodoTitle: string;
  setNewTodoTitle: (title: string) => void;
  filterBy: FilterType;
  setFilterBy: (filter: FilterType) => void;
  activeTodosCount: number;
  completedTodosCount: number;
  areAllCompleted: boolean;
  handleNewTodoSubmit: (event: React.FormEvent) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
  updateTodoTitle: (id: number, title: string) => void;
  visibleTodos: Todo[];
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

const getInitialTodos = (): Todo[] => {
  const storedTodos = localStorage.getItem('todos');

  return storedTodos ? JSON.parse(storedTodos) : [];
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(getInitialTodos);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [filterBy, setFilterBy] = useState<FilterType>(FILTER_TYPE.ALL);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.length - activeTodosCount;
  const areAllCompleted = todos.length > 0 && activeTodosCount === 0;

  const handleNewTodoSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = newTodoTitle.trim();

    if (trimmedTitle) {
      const newTodo: Todo = {
        id: +new Date(),
        title: trimmedTitle,
        completed: false,
      };

      setTodos(currentTodos => [...currentTodos, newTodo]);
      setNewTodoTitle('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const toggleAll = () => {
    setTodos(currentTodos =>
      currentTodos.map(todo => ({ ...todo, completed: !areAllCompleted })),
    );
  };

  const clearCompleted = () => {
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
  };

  const updateTodoTitle = (id: number, title: string) => {
    setTodos(currentTodos =>
      currentTodos.map(todo => (todo.id === id ? { ...todo, title } : todo)),
    );
  };

  const visibleTodos = useMemo(() => {
    switch (filterBy) {
      case FILTER_TYPE.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FILTER_TYPE.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filterBy]);

  const contextValue: TodoContextType = {
    todos,
    newTodoTitle,
    setNewTodoTitle,
    filterBy,
    setFilterBy,
    activeTodosCount,
    completedTodosCount,
    areAllCompleted,
    handleNewTodoSubmit,
    deleteTodo,
    toggleTodo,
    toggleAll,
    clearCompleted,
    updateTodoTitle,
    visibleTodos,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};
