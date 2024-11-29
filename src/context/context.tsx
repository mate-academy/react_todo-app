import React, {
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../types/Todo';
import { SelectedBy } from '../types/SelectedBy';

interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  tempTodo: Todo | null;
  mainRef: RefObject<HTMLInputElement>;
  selectedBy: SelectedBy;
  setSelectedBy: (value: SelectedBy) => void;
  clearAllCompletedTodos: () => void;
  toggleAllTodos: () => void;
  editTodo: (title: string, id: number) => void;
}

export const MyContext = React.createContext<TodoContextType | undefined>(
  undefined,
);

export const MyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const mainRef = useRef<HTMLInputElement>(null);
  const [selectedBy, setSelectedBy] = useState<SelectedBy>(SelectedBy.all);

  useEffect(() => {
    const initialState = localStorage.getItem('todos');

    if (initialState) {
      setTodos(JSON.parse(initialState));
    }

    mainRef.current?.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = { id: Date.now(), title, completed: false };

    setTempTodo(newTodo);
    setTodos([...todos, newTodo]);

    setTimeout(() => {
      setTempTodo(null);
    }, 2000);
  };

  const deleteTodo = (id: number) => {
    const changedTodos = todos.filter(todo => todo.id !== id);

    setTodos(changedTodos);

    mainRef.current?.focus();
  };

  const toggleTodo = (id: number) => {
    const changedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(changedTodos);
  };

  const complitedTodosIds = todos.reduce((result: number[], curTodo: Todo) => {
    if (curTodo.completed) {
      result.push(curTodo.id);
    }

    return result;
  }, []);

  const toggleAllTodos = () => {
    setTodos(prev => {
      if (todos.some(todo => !todo.completed)) {
        return prev.map(todo => {
          return !todo.completed ? { ...todo, completed: true } : todo;
        });
      } else {
        return prev.map(todo => ({ ...todo, completed: !todo.completed }));
      }
    });
  };

  const clearAllCompletedTodos = () => {
    setTodos(prev => prev.filter(todo => !complitedTodosIds.includes(todo.id)));
    mainRef.current?.focus();
  };

  const editTodo = (title: string, id: number) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, title } : todo)),
    );
  };

  return (
    <MyContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
        tempTodo,
        mainRef,
        selectedBy,
        setSelectedBy,
        clearAllCompletedTodos,
        toggleAllTodos,
        editTodo,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useTodos = (): TodoContextType => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }

  return context;
};
