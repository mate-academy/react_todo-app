import React, { useEffect, useReducer } from 'react';
import { Todo } from './type/Todo';
import { Action } from './type/Action';
import { useLocalStorage } from './hooks/useLocalStorage';

interface State {
  todos: Todo[];
}

const initialState: State = {
  todos: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: (state.todos as Todo[]).concat({
          id: +new Date(),
          title: action.payload,
          completed: false,
        }),
      };
    case 'setCompleted': {
      const complitedItem = state.todos.filter(
        (todo) => todo.id === action.payload,
      );

      complitedItem[0].completed = !complitedItem[0].completed;

      return {
        ...state,
        todos: [...state.todos],
      };
    }

    case 'deleteTodo': {
      const deleteItem = state.todos.findIndex(
        (todo) => todo.id === action.payload,
      );

      state.todos.splice(deleteItem, 1);

      return {
        ...state,
        todos: [...state.todos],
      };
    }

    case 'deleteAllCompleted':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'editTitle':
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

    case 'setToggleAll': {
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

    default:
      return state;
  }
}

export const TodosContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [localStorageValue, setLocalStorageValue] = useLocalStorage(
    'todos',
    initialState.todos,
  );

  const [state, dispatch] = useReducer<typeof reducer>(
    reducer,
    { ...initialState, todos: localStorageValue },
  );

  useEffect(
    () => {
      setLocalStorageValue(state.todos);
    },
    [state, setLocalStorageValue],
  );

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosContext.Provider value={state}>{children}</TodosContext.Provider>
    </DispatchContext.Provider>
  );
};
