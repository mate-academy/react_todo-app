import React, {
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { Todo } from '../types/Todo';
import { FilterParameter } from '../types/FilterParameter';

type TodosContextType = {
  todos: Todo[];
  visibleTodos: Todo[] | null;
  showOnlyActive: FilterParameter;
  filterTodos: (showParameter: FilterParameter) => void;
  addTodo: (text: string) => void;
  editTodo: (id: number, value: string) => void;
  toggleTodo: (id: number) => void;
  toggleAllTodos: () => void;
  deleteTodo: (id: number) => void;
  updateTodos: () => void;
};

const TodosContext = React.createContext<TodosContextType | null>(null);

// перевіряє чи дійсно context існує
export const useTodosContext = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodosContext must be used within a TodosProvider');
  }

  return context;
};

type TodosProviderProps = {
  children: React.ReactNode;
};

// #region
function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
// #endregion

export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [todos, setTodos] = useLocalStorageState<Todo[]>('todos', []);
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([...todos]);
  const [showOnlyActive, setShowOnlyActive]
    = useState<FilterParameter>(FilterParameter.All);

  const addTodo = (title: string) => {
    setTodos(prevTodos => [
      ...prevTodos,
      { id: Date.now(), title, completed: false },
    ]);
  };

  const editTodo = (id: number, value: string) => {
    setTodos(prevTodos => prevTodos.map(todo => ((todo.id === id)
      ? { ...todo, title: value }
      : todo)));
  };

  const toggleTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.map(todo => ((todo.id === id)
      ? { ...todo, completed: !todo.completed }
      : todo)));
  };

  const toggleAllTodos = () => {
    const allCompleted = todos.every(todo => todo.completed === true);

    if (allCompleted) {
      setTodos(prevTodos => prevTodos.map(todo => ({
        ...todo, completed: false,
      })));
    } else {
      setTodos(prevTodos => prevTodos.map(todo => ({
        ...todo, completed: true,
      })));
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const filterTodos = (showParameter: FilterParameter) => {
    setShowOnlyActive(showParameter);
  };

  const updateTodos = () => {
    switch (showOnlyActive) {
      case FilterParameter.Active:
        setVisibleTodos(todos.filter(todo => !todo.completed));
        break;
      case FilterParameter.Completed:
        setVisibleTodos(todos.filter(todo => todo.completed));
        break;
      default:
        setVisibleTodos([...todos]);
    }
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        visibleTodos,
        showOnlyActive,
        filterTodos,
        addTodo,
        editTodo,
        toggleTodo,
        toggleAllTodos,
        deleteTodo,
        updateTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
