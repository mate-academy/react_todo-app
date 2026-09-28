import React from 'react';
import { Todo } from './types/Todo';
import { FilterCriteria } from './types/FilterCriteria';

type State = {
  todos: Todo[];
  selectedFilter: FilterCriteria;
  isFocused: boolean;
};

if (window.localStorage.getItem('todos') === null) {
  window.localStorage.setItem('todos', '[]');
}

const initialState: State = {
  todos: JSON.parse(window.localStorage.getItem('todos') || '[]'),
  selectedFilter: FilterCriteria.ALL,
  isFocused: true,
};

type TodoUpdate = { [K in keyof Todo]: Pick<Todo, K> }[keyof Todo];

type Action =
  | { type: 'updateTodo'; payload: { updatedData: TodoUpdate; todo: Todo } }
  | { type: 'addTodo'; payload: string }
  | { type: 'deleteTodo'; payload: { todo: Todo } }
  | { type: 'setFilterCriteria'; payload: { filterCriteria: FilterCriteria } }
  | { type: 'setIsFocused'; payload: { isFocusNeed: boolean } };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'addTodo':
      const newTodo: Todo = {
        id: +new Date(),
        title: action.payload,
        completed: false,
      };

      return { ...state, todos: [...state.todos, newTodo] };

    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.todo.id),
      };

    case 'updateTodo':
      const updatedTodo = {
        ...(state.todos.find(
          todo => todo.id === action.payload.todo.id,
        ) as Todo),
        ...action.payload.updatedData,
      };

      state.todos.splice(
        state.todos.findIndex(todo => todo.id === action.payload.todo.id),
        1,
        updatedTodo,
      );

      return {
        ...state,
        todos: [...state.todos],
      };

    case 'setFilterCriteria':
      return { ...state, selectedFilter: action.payload.filterCriteria };

    case 'setIsFocused':
      return { ...state, isFocused: action.payload.isFocusNeed };
    default:
      return state;
  }
};

const StateContext = React.createContext<State>(initialState);
const DispatchContext = React.createContext<React.Dispatch<Action>>(() => {});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useDispatch = () => React.useContext(DispatchContext);
export const useGlobalState = () => React.useContext(StateContext);
