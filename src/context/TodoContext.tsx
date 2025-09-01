import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { Todo } from '../types/Todo';

interface TodosContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (todoId: Todo['id']) => void;
  updateTodo: (todoId: Todo['id'], data: Partial<Omit<Todo, 'id'>>) => void;
  clearCompleted: () => void;
  toggleAll: (completed: boolean) => void;
  editingTodoId: Todo['id'] | null;
  handleEdit: (todoId: Todo['id'] | null) => void;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const storedTodos = localStorage.getItem('todos');

      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (err) {
      return [];
    }
  });
  const [editingTodoId, setEditingTodoId] = useState<Todo['id'] | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (err) {}
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: self.crypto.randomUUID(),
      title,
      completed: false,
      userId: 0,
    };

    setTodos(currTodos => [...currTodos, newTodo]);
  };

  const removeTodo = (todoId: Todo['id']) => {
    setTodos(currTodos => currTodos.filter(todo => todo.id !== todoId));
  };

  const updateTodo = (todoId: Todo['id'], data: Partial<Omit<Todo, 'id'>>) => {
    setTodos(currTodos =>
      currTodos.map(todo => (todo.id === todoId ? { ...todo, ...data } : todo)),
    );
  };

  const clearCompleted = () => {
    setTodos(currTodos => currTodos.filter(todo => !todo.completed));
  };

  const toggleAll = (completed: boolean) => {
    setTodos(currTodos => currTodos.map(todo => ({ ...todo, completed })));
  };

  const handleEdit = (todoId: Todo['id'] | null) => {
    setEditingTodoId(todoId);
  };

  const value = {
    todos,
    addTodo,
    removeTodo,
    updateTodo,
    clearCompleted,
    toggleAll,
    editingTodoId,
    handleEdit,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export const useTodosContext = () => {
  const context = useContext(TodosContext);

  if (context === undefined) {
    throw new Error('useTodosContext must be used within a TodosProvider');
  }

  return context;
};
