import React, { Dispatch, useEffect, useReducer } from 'react';
import {
  Action, ActionType, FilterType, Item,
} from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Props = {
  children: React.ReactNode;
};
type State = {
  todos: Item[],
  filterBy: FilterType,
};

function getFilterValue(): FilterType {
  switch (window.location.hash) {
    case '#/active':
      return FilterType.ACTIVE;
    case '#/completed':
      return FilterType.COMPLETED;
    default:
      return FilterType.ALL;
  }
}

const initialState: State = {
  todos: [],
  filterBy: getFilterValue(),
};

export const TodosContext = React.createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.ADD:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: +new Date(),
            title: action.payload,
            completed: false,
          },
        ],
      };
    case ActionType.REMOVE:
      return {
        ...state,
        todos: state.todos.filter(item => item.id !== action.payload),
      };
    case ActionType.TOGGLE:
      return {
        ...state,
        todos: state.todos.map(item => {
          if (item.id === action.payload) {
            return { ...item, completed: !item.completed };
          }

          return item;
        }),
      };
    case ActionType.UPDATE:
      return {
        ...state,
        todos: state.todos.map(item => {
          if (item.id === action.payload.id) {
            return action.payload;
          }

          return item;
        }),
      };
    case ActionType.REMOVE_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(item => !item.completed),
      };
    case ActionType.TOGGLE_ALL: {
      const allCompleted = state.todos.every(item => item.completed);

      return {
        ...state,
        todos: state.todos.map(item => (
          {
            ...item,
            completed: !allCompleted,
          }
        )),
      };
    }

    case ActionType.FILTER:
      return {
        ...state,
        filterBy: action.payload,
      };
    default:
      return state;
  }
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [
    localTodos,
    setLocalTodos,
  ] = useLocalStorage('todos', initialState.todos);
  const [
    state,
    dispatch,
  ] = useReducer(reducer, { ...initialState, todos: localTodos });

  useEffect(() => {
    setLocalTodos(state.todos);
  }, [state.todos, setLocalTodos]);

  useEffect(() => {
    const handleHashChange = () => {
      dispatch({ type: ActionType.FILTER, payload: getFilterValue() });
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
