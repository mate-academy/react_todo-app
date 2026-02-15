import { createContext, useReducer, useContext, useEffect } from 'react';
import { Todo } from '../types/Todo';
import { FILTERS, FilterType } from '../constants/filter';

type TodoState = {
  todos: Todo[];
  filter: FilterType;
  nextId: number;
};

const initialState: TodoState = {
  todos: [],
  filter: FILTERS.ALL,
  nextId: 1,
};

type Action =
  | { type: 'ADD_TODO'; payload: { title: string } }
  | { type: 'DELETE_TODO'; payload: { id: number } }
  | { type: 'TOGGLE_TODO'; payload: { id: number } }
  | { type: 'UPDATE_TODO'; payload: { id: number; title: string } }
  | { type: 'TOGGLE_ALL' }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_FILTER'; payload: FilterType };

function reducer(state: TodoState, action: Action): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.nextId,
            title: action.payload.title,
            completed: false,
          },
        ],
        nextId: state.nextId + 1,
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
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

    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo,
        ),
      };

    case 'TOGGLE_ALL':
      const allCompleted = state.todos.every(todo => todo.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !allCompleted,
        })),
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
}

function loadInitialState(): TodoState {
  const savedTodos = localStorage.getItem('todos');

  if (savedTodos) {
    try {
      const todos = JSON.parse(savedTodos);
      const maxId =
        todos.length > 0 ? Math.max(...todos.map((todo: Todo) => todo.id)) : 0;

      return {
        todos: todos,
        filter: FILTERS.ALL,
        nextId: maxId + 1,
      };
    } catch (error) {
      return initialState;
    }
  }

  return initialState;
}

const TodoStateContext = createContext<TodoState>(initialState);
const TodoDispatchContext = createContext<React.Dispatch<Action>>(() => {});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, loadInitialState());

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoDispatchContext.Provider value={dispatch}>
      <TodoStateContext.Provider value={state}>
        {children}
      </TodoStateContext.Provider>
    </TodoDispatchContext.Provider>
  );
};

export const useTodoState = () => {
  return useContext(TodoStateContext);
};

export const useTodoDispatch = () => {
  return useContext(TodoDispatchContext);
};
