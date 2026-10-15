import { createContext, useContext } from 'react';
import { useTodos } from '../hooks/useTodos';
import { Todo, TodoChanges } from '../types/Todo';

type TodosContextType = {
  todos: Todo[];
  newTodoFieldRef: React.RefObject<HTMLInputElement>;
  activeCount: number;
  hasCompletedTodos: boolean;
  hasAllTodosCompleted: boolean;
  addTodo: (title: string) => boolean;
  handleDelete: (id: number) => void;
  handleClearCompleted: () => void;
  handleUpdate: (id: number, changes: TodoChanges) => void;
  handleToggleAll: () => void;
};

const TodosContext = createContext<TodosContextType | null>(null);

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const value = useTodos();

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export const useTodosContext = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodosContext must be used within a TodosProvider');
  }

  return context;
};
