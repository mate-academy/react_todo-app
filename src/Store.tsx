import React, { useEffect, useReducer } from 'react';
import { SelectedFilter } from './types/SelectedFilter';
import { State } from './types/State';
import { Action } from './types/Action';
import { loadFromLocalStorage } from './utils/LocaleStorage';

const initialState: State = {
  todos: [],
  query: '',
  filter: SelectedFilter.ALL,
  editingTodoId: null,
  currentTitle: '',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'toogleAllChecked':
      const checked = state.todos.every(todo => todo.completed);

      return {
        ...state,
        todos: [...state.todos.map(todo => ({ ...todo, completed: !checked }))],
      };

    case 'addTodo':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'setQuery':
      return {
        ...state,
        query: action.payload,
      };

    case 'deleteTodo':
      return {
        ...state,
        todos: [...state.todos.filter(todo => todo.id !== action.payload)],
      };

    case 'massDelete':
      return {
        ...state,
        todos: [
          ...state.todos.filter(todo => !action.payload.includes(todo.id)),
        ],
      };

    case 'changeCheckbox':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo =>
            todo.id === action.payload
              ? { ...todo, completed: !todo.completed }
              : todo,
          ),
        ],
      };

    case 'updateTodo':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            return todo.id === action.payload.id
              ? { ...todo, title: action.payload.title }
              : todo;
          }),
        ],
      };

    case 'setCurrentTitle':
      return {
        ...state,
        currentTitle: action.payload,
      };

    case 'setEditingTodoId':
      return {
        ...state,
        editingTodoId: action.payload,
      };

    case 'setFilter':
      return {
        ...state,
        filter: action.payload,
      };
  }
}

export const StateContext = React.createContext<State>(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => ({
    todos: loadFromLocalStorage('todos'),
    query: '',
    filter: SelectedFilter.ALL,
    editingTodoId: null,
    currentTitle: '',
  }));

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useGlobalState = () => React.useContext(StateContext);
export const useGlobalDispatch = () => React.useContext(DispatchContext);
