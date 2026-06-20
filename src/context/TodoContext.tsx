import { createContext, useReducer } from 'react';
import { Todo } from '../types/todo';
import { TodoAction } from '../types/actions';

export interface State {
  todos: Todo[];
  selectedFilter: 'all' | 'active' | 'completed';
}

export interface ContextState extends State {
  filteredTodos: Todo[];
  todosToComplete: number;
}

function reducer(state: State, action: TodoAction): State {
  switch (action.type) {
    case 'HYDRATE_TODOS':
      return {
        ...state,
        todos: action.payload,
      };

    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now().toString(),
            title: action.payload.title,
            completed: false,
          },
        ],
      };

    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo,
        ),
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case 'CHECK_AS_COMPLETED':
      return {
        ...state,
        todos: state.todos.map(todo =>
          action.payload.completed
            ? { ...todo, completed: false }
            : { ...todo, completed: true },
        ),
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'SET_SELECTED_FILTER':
      return {
        ...state,
        selectedFilter: action.payload.selectedFilter,
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };

    default:
      return state;
  }
}

const initialState: State = {
  todos: [],
  selectedFilter: 'all',
};

export const StateContext = createContext<ContextState>({
  ...initialState,
  filteredTodos: [],
  todosToComplete: 0,
});
export const DispatchContext = createContext<React.Dispatch<TodoAction>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const todosToComplete = state.todos.filter(todo => !todo.completed).length;

  const filteredTodos = state.todos.filter(todo => {
    if (state.selectedFilter === 'active') {
      return !todo.completed;
    }

    if (state.selectedFilter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const contextValue = {
    ...state,
    todosToComplete,
    filteredTodos,
  };

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={contextValue}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
