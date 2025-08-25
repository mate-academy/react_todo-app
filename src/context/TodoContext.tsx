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
  removeTodo: (todoId: number) => void;
  updateTodo: (todoId: number, data: Partial<Omit<Todo, 'id'>>) => void;
  clearCompleted: () => void;
  toggleAll: (completed: boolean) => void;
  editingTodoId: number | null;
  handleEdit: (todoId: number | null) => void;
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
      // console.error('Failed to parse todos from localStorage', err);

      return [];
    }
  });
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (err) {
      // console.error('Failed to save todos to localStorage', error);
    }
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
      userId: 0,
    };

    setTodos(currTodos => [...currTodos, newTodo]);
  };

  const removeTodo = (todoId: number) => {
    setTodos(currTodos => currTodos.filter(todo => todo.id !== todoId));
  };

  const updateTodo = (todoId: number, data: Partial<Omit<Todo, 'id'>>) => {
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

  const handleEdit = (todoId: number | null) => {
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
