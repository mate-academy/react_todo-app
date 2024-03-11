import { createContext, useContext, useEffect, useReducer } from 'react';
import { Todo } from '../Types/Todo';
import useLocalStorage from '../hooks/useLocalStorage';
import { Status } from '../Types/Status';

type FilterStatus = keyof typeof Status;

type State = {
  todos: Todo[];
  filterStatus: FilterStatus;
  addTodo: (todo: Todo) => void;
  toggleCompletedTodo: (id: string) => void;
  toggleAllTodo: () => void;
  handleFilterTodo: (status: FilterStatus) => void;
  handleDeleteTodo: (id: string) => void;
  handleDeleteCompletedTodo: () => void;
  handleEditTodo: (id: string, title: string) => void;
};

const initialState: State = {
  todos: [],
  filterStatus: 'All',
  addTodo: () => {},
  toggleCompletedTodo: () => {},
  toggleAllTodo: () => {},
  handleFilterTodo: () => {},
  handleDeleteTodo: () => {},
  handleDeleteCompletedTodo: () => {},
  handleEditTodo: () => {},
};

const TodosContext = createContext(initialState);

type Action =
  | { type: 'todo/addTodo'; payload: Todo }
  | { type: 'todo/toggleComplete'; payload: string }
  | { type: 'todo/toggleAll' }
  | { type: 'todo/setFilterStatus'; payload: FilterStatus }
  | { type: 'todo/delete'; payload: string }
  | { type: 'todo/deleteCompleted' }
  | { type: 'todo/edit'; payload: { id: string; title: string } };

type Props = {
  children: React.ReactNode;
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'todo/addTodo':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'todo/toggleComplete':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      };

    case 'todo/toggleAll':
      return {
        ...state,
        todos: state.todos.every(todo => todo.completed)
          ? state.todos.map(todo => ({
              ...todo,
              completed: false,
            }))
          : state.todos.map(todo => ({
              ...todo,
              completed: true,
            })),
      };

    case 'todo/setFilterStatus':
      return {
        ...state,
        filterStatus: action.payload,
      };

    case 'todo/delete':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'todo/deleteCompleted':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'todo/edit':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              title: action.payload.title,
            };
          }

          return todo;
        }),
      };

    default:
      return state;
  }
}

const TodosProvider: React.FC<Props> = ({ children }) => {
  const [storedTodos, setStoredTodos] = useLocalStorage<Todo[]>('todos', []);
  const [storedFilterStatus, setStoredFilterStatus] =
    useLocalStorage<FilterStatus>('filterStatus', 'All');

  const [{ todos, filterStatus }, dispatch] = useReducer(
    reducer,
    initialState,
    () => {
      return {
        ...initialState,
        todos: storedTodos,
        filterStatus: storedFilterStatus,
      };
    },
  );

  useEffect(() => {
    setStoredTodos(todos);
    setStoredFilterStatus(filterStatus);
  }, [todos, filterStatus, setStoredTodos, setStoredFilterStatus]);

  const addTodo = (todo: Todo) => {
    dispatch({ type: 'todo/addTodo', payload: todo });
  };

  const toggleCompletedTodo = (id: string) => {
    dispatch({ type: 'todo/toggleComplete', payload: id });
  };

  const toggleAllTodo = () => {
    dispatch({ type: 'todo/toggleAll' });
  };

  const handleFilterTodo = (status: FilterStatus) => {
    dispatch({ type: 'todo/setFilterStatus', payload: status });
  };

  const handleDeleteTodo = (id: string) => {
    dispatch({ type: 'todo/delete', payload: id });
  };

  const handleDeleteCompletedTodo = () => {
    dispatch({ type: 'todo/deleteCompleted' });
  };

  const handleEditTodo = (id: string, title: string) => {
    dispatch({ type: 'todo/edit', payload: { id, title } });
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        filterStatus,
        addTodo,
        toggleCompletedTodo,
        toggleAllTodo,
        handleFilterTodo,
        handleDeleteTodo,
        handleDeleteCompletedTodo,
        handleEditTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

const useTodos = () => {
  const context = useContext(TodosContext);

  if (context === undefined) {
    throw new Error('TodosContext was used outside of the PostProvider');
  }

  return context;
};

export { useTodos, TodosProvider };
