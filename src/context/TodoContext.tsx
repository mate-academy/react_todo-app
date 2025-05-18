import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

interface TodoContextType {
  todos: Todo[];
  filter: Filter;
  addTodo: (todo: Todo) => void;
  deleteTodo: (todoId: number, onDelete?: () => void) => void;
  updateTodo: (todoId: number, updatedFields: Partial<Todo>) => void;
  deleteCompletedTodos: (onDelete?: () => void) => void;
  toggleAllTodos: () => void;
  setFilter: (filter: Filter) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState<Filter>(Filter.All);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo: Todo) => {
    const createdTodo = {
      id: +new Date(),
      title: newTodo.title,
      completed: newTodo.completed,
      userId: 1,
    };

    setTodos(currentTodos => [...currentTodos, createdTodo]);
  };

  const deleteTodo = (todoId: number, onDelete?: () => void) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
    if (onDelete) {
      onDelete();
    }
  };

  const updateTodo = (todoId: number, updatedFields: Partial<Todo>) => {
    const todoToUpdate = todos.find(todo => todo.id === todoId);

    if (!todoToUpdate) {
      return;
    }

    const isUnchanged = Object.entries(updatedFields).every(
      ([key, value]) => todoToUpdate[key as keyof Todo] === value,
    );

    if (isUnchanged) {
      return;
    }

    const updatedTodo = {
      ...todoToUpdate,
      ...updatedFields,
    };

    setTodos(currentTodos =>
      currentTodos.map(todo => (todo.id === todoId ? updatedTodo : todo)),
    );
  };

  const deleteCompletedTodos = (onDelete?: () => void) => {
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
    if (onDelete) {
      onDelete();
    }
  };

  const toggleAllTodos = () => {
    const allCompleted = todos.every(todo => todo.completed);
    const newStatus = !allCompleted;

    setTodos(currentTodos =>
      currentTodos.map(todo => ({
        ...todo,
        completed: newStatus,
      })),
    );
  };

  const value = {
    todos,
    filter,
    addTodo,
    deleteTodo,
    updateTodo,
    deleteCompletedTodos,
    toggleAllTodos,
    setFilter,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }

  return context;
};
