import { createContext, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';
import { ActionType } from '../types/ActionType'

type Action =
  | { type: ActionType.TODO_ADD; payload: Todo }
  | { type: ActionType.TODO_TOGGLE; payload: number }
  | { type: ActionType.TODO_REMOVE; payload: number }
  | { type: ActionType.TODO_EDIT; payload: { title: string; id: number } }
  | { type: ActionType.TODO_TOGGLE_ALL }
  | { type: ActionType.TODO_FILTER; payload: Filter }
  | { type: ActionType.TODO_CLEAR_COMPLETED };

type Props = {
  children: React.ReactNode;
};

interface State {
  todos: Todo[];
  filter: Filter;
}

function updateStorage(state: Todo[]): void {
  localStorage.setItem('todos', JSON.stringify(state));
}

function reducer(state: State, action: Action): State {
  let newState = state.todos;

  switch (action.type) {
    case ActionType.TODO_ADD:
      newState = [...state.todos, action.payload];
      break;
    case ActionType.TODO_REMOVE:
      newState = state.todos.filter(todo => todo.id !== action.payload);
      break;
    case ActionType.TODO_TOGGLE:
      newState = state.todos.map(todo => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      });
      break;
    case ActionType.TODO_EDIT:
      newState = state.todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, title: action.payload.title };
        } else {
          return todo;
        }
      });
      break;
    case ActionType.TODO_TOGGLE_ALL:
      const status = state.todos.every(todo => todo.completed);

      newState = state.todos.map(todo => {
        if (todo.completed === status) {
          return { ...todo, completed: !status };
        } else {
          return todo;
        }
      });
      break;
    case ActionType.TODO_CLEAR_COMPLETED:
      newState = state.todos.filter(todo => !todo.completed);
      break;
    case ActionType.TODO_FILTER:
      return { ...state, filter: action.payload };
    default:
      newState = state.todos;
      break;
  }

  updateStorage(newState);

  return { ...state, todos: newState };
}

const storedTodos = window.localStorage.getItem('todos');

if (storedTodos === null) {
  window.localStorage.setItem('todos', JSON.stringify([]));
}

const initialState: State = {
  todos: JSON.parse(storedTodos || '[]'),
  filter: Filter.ALL,
};

export const StateContext = createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = createContext((action: Action) => {});

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
