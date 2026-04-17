import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Todo } from '../Types/Todo';
import { QueryFilter } from '../Types/QueryFilter';

type TodoContextType = {
  todos: Todo[];
  filteredTodos: Todo[];
  addTodo: (todos: Todo) => void;

  query: QueryFilter;
  setQuery: (query: QueryFilter) => void;

  deleteTodo: (todoId: number) => void;
  updateTodo: (newTodo: Todo) => void;
  toggleTodo: (todoId: number) => void;
  toggleAllTodos: () => void;
  setEditTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  removeAllCompletedTodos: () => void;

  todoLeft: number;
  headerInputRef: React.RefObject<HTMLInputElement>;
  editingInputRef: React.RefObject<HTMLInputElement>;
  editTodo: Todo | null;
  isAllTodosCompleted: boolean;
  isSomeTodosCompleted: boolean;
};

const STORAGE_KEY = 'todos';

type Props = {
  children: React.ReactNode;
};

const TodoContext = React.createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  const [query, setQuery] = useState<QueryFilter>(QueryFilter.All);

  const headerInputRef = useRef<HTMLInputElement>(null);
  const editingInputRef = useRef<HTMLInputElement>(null);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (query) {
        case QueryFilter.Active:
          return !todo.completed;

        case QueryFilter.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  }, [todos, query]);

  // #region Manage focus
  useEffect(() => {
    if (editTodo) {
      editingInputRef.current?.focus();
    }
  }, [editTodo]);

  const headerFocus = useCallback(() => {
    headerInputRef.current?.focus();
  }, []);

  useEffect(() => {
    headerInputRef.current?.focus();
  }, []);
  // #endregion

  // #region LocalStorage Store Todos
  useEffect(() => {
    const todoStorage = localStorage.getItem(STORAGE_KEY);

    headerInputRef.current?.focus();

    if (todoStorage) {
      setTodos(JSON.parse(todoStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // #endregion

  // #region variable of Todos
  const isAllTodosCompleted = useMemo(() => {
    return todos.every(todo => todo.completed);
  }, [todos]);

  const isSomeTodosCompleted = useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  const todoLeft = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const removeAllCompletedTodos = useCallback(() => {
    headerFocus();
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
  }, []);

  // #endregion

  // #region useCallback Todos
  const addTodo = useCallback((todo: Todo) => {
    setTodos(currentTodos => [...currentTodos, todo]);
    headerFocus();
  }, []);

  const toggleAllTodos = useCallback(() => {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        return { ...todo, completed: !isAllTodosCompleted };
      });
    });
  }, [isAllTodosCompleted]);

  const deleteTodo = useCallback((todoId: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
    headerFocus();
  }, []);

  const toggleTodo = useCallback((todoId: number) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const updateTodo = useCallback((newTodo: Todo) => {
    const trimTitle = newTodo.title.trim();

    if (trimTitle === '') {
      deleteTodo(newTodo.id);
      headerFocus();

      return;
    }

    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === newTodo.id ? { ...newTodo, title: trimTitle } : todo,
      ),
    );
    headerFocus();
  }, []);

  // #endregion

  return (
    <TodoContext.Provider
      value={
        {
          todos,
          filteredTodos,
          addTodo,
          deleteTodo,
          updateTodo,
          toggleTodo,
          headerInputRef,
          editTodo,
          setEditTodo,
          removeAllCompletedTodos,
          editingInputRef,
          isAllTodosCompleted,
          isSomeTodosCompleted,
          toggleAllTodos,
          todoLeft,
          query,
          setQuery,
        } as TodoContextType
      }
    >
      {children}
    </TodoContext.Provider>
  );
};

export function useTodos(): TodoContextType {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }

  return context;
}
