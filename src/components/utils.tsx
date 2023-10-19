import React, {
  useState,
  useCallback,
  useMemo,
  useReducer,
  useEffect,
  createContext,
  useContext,
} from 'react';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export enum FilterQuery {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

const { Active, Completed } = FilterQuery;

type Action =
  | { type: 'add'; payload: Todo }
  | { type: 'delete'; payload: Todo }
  | { type: 'toggle'; payload: Todo }
  | { type: 'updateAll'; payload: Todo[] }
  | { type: 'clear' };

type TodosContextType = {
  todos: Todo[];
  filterQuery: FilterQuery;
  addTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
  toggleTodo: (todo: Todo) => void;
  updateAllTodos: (todos: Todo[]) => void;
  clearTodos: () => void;
  filter: (query: FilterQuery) => void;
  dispatch: React.Dispatch<Action>;
  handleTodoTitleUpdate: (todo: Todo, newTitle: string) => void
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

const initialTodos = JSON.parse(localStorage.getItem('todos')
|| '[]') as Todo[];

const reducer = (state: Todo[], action: Action) => {
  let newState;

  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'delete':
      newState = state.filter((todo) => todo.id !== action.payload.id);
      localStorage.setItem('todos', JSON.stringify(newState));

      return newState;

    case 'toggle':
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });

    case 'updateAll':
      return action.payload;
    case 'clear':
      return state.filter((todo) => todo.completed === false);
    default:
      return state;
  }
};

interface ContextProps {
  children: React.ReactNode
}

export const TodosProvider: React.FC<ContextProps> = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, initialTodos);
  const [filterQuery, setFilterQuery] = useState<FilterQuery>(FilterQuery.All);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((todo: Todo) => {
    dispatch({ type: 'add', payload: todo });
  }, []);

  const deleteTodo = useCallback((todo: Todo) => {
    dispatch({ type: 'delete', payload: todo });
  }, []);

  const toggleTodo = useCallback((todo: Todo) => {
    dispatch({ type: 'toggle', payload: todo });
  }, []);

  const updateAllTodos = useCallback((updatedTodos: Todo[]) => {
    dispatch({ type: 'updateAll', payload: updatedTodos });
  }, []);

  const clearTodos = useCallback(() => {
    const incompleteTodos = todos.filter((todo) => todo.completed === false);

    dispatch({ type: 'updateAll', payload: incompleteTodos });

    localStorage.setItem('todos', JSON.stringify(incompleteTodos));
  }, [dispatch, todos]);

  const filter = useCallback((query: FilterQuery) => {
    setFilterQuery(query);
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filterQuery) {
      case Active:
        return todos.filter((todo) => !todo.completed);
      case Completed:
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [filterQuery, todos]);

  const handleTodoTitleUpdate = useCallback((todo: Todo, newTitle: string) => {
    const updatedTodos = todos.map((t) => (
      t.id === todo.id ? { ...t, title: newTitle } : t
    ));

    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    dispatch({ type: 'updateAll', payload: updatedTodos });
  }, [todos]);

  const contextValue: TodosContextType = {
    todos: filteredTodos,
    filterQuery,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateAllTodos,
    clearTodos,
    filter,
    dispatch,
    handleTodoTitleUpdate,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = (): TodosContextType => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('⚠ Component should be used Todos Context ⚠');
  }

  return context;
};
