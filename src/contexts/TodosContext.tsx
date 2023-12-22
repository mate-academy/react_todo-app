import {
  FC, createContext, useContext, useEffect, useReducer,
} from 'react';
import { Todo } from '../types/Todo';

type Action =
  { type: 'addTodo', payload: Todo }
  | { type: 'toggleTodo', payload: Todo['id'] }
  | { type: 'deleteTodo', payload: Todo['id'] }
  | { type: 'editTodo', payload: Todo }
  | { type: 'setFilter', payload: Status }
  | { type: 'deleteCompleted' }
  | { type: 'toggleAll', payload: boolean };

export enum Status {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

type State = {
  todos: Todo[]
  filter: Status
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'addTodo':
      return { ...state, todos: [...state.todos, action.payload] };

    case 'editTodo':
      return {
        ...state,
        todos: state.todos.map(todo => (todo.id === action.payload.id
          ? {
            ...todo,
            title: action.payload.title,
          } : todo)),
      };

    case 'toggleTodo':
      return {
        ...state,
        todos: state.todos.map(todo => (todo.id === action.payload
          ? {
            ...todo,
            completed: !todo.completed,
          } : todo)),
      };

    case 'toggleAll':
      return {
        ...state,
        todos: state.todos.map(
          todo => ({ ...todo, completed: action.payload }),
        ),
      };

    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case 'setFilter':
      return {
        ...state,
        filter: action.payload,
      };

    case 'deleteCompleted':
      return {
        ...state,
        todos: state.todos.filter(({ completed }) => !completed),
      };

    default:
      return state;
  }
}

const initialState: State = {
  filter: Status.ALL,
  todos: [],
};

const StateContext = createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DispatchContext = createContext((_action: Action) => { });

export const useSelector = () => useContext(StateContext);

export const useDispatch = () => useContext(DispatchContext);

type Props = {
  children: React.ReactNode
};

export const GlobalStateProvider: FC<Props> = ({ children }) => {
  if (!localStorage.getItem('todos')) {
    localStorage.setItem('todos', JSON.stringify(initialState));
  }

  const storage = localStorage.getItem('todos');
  const storageObj = JSON.parse(storage || '');

  const [state, dispatch] = useReducer(reducer, storageObj);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state));
  }, [state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
