import React from 'react';
import { Todo } from '../../types/Todo';
import { Action, ActionType } from '../../types/Action';
import { useLocalStorage } from '../../hooks/useLocalStorage';

function reducer(state: Todo[], action: Action) {
  switch (action.type) {
    case ActionType.AddTodo:
      if (!action.payload) {
        return state;
      }

      return [...state, action.payload];

    case ActionType.DeleteTodo:
      return state.filter(({ id }) => id !== action.payload);

    case ActionType.DeleteComplited:
      return state.filter(({ completed }) => !completed);

    case ActionType.ChangeCompleted: {
      const index = state.findIndex(item => item.id === action.payload);
      const stateCopy = state.slice();

      stateCopy[index] = {
        ...state[index],
        completed: !state[index].completed,
      };

      return stateCopy;
    }

    case ActionType.ChangeAllCompleted: {
      if (state.every(({ completed }) => completed)
        || state.every(({ completed }) => !completed)) {
        return state.map((item) => {
          return {
            ...item,
            completed: !item.completed,
          };
        });
      }

      return state.map((item) => {
        return {
          ...item,
          completed: true,
        };
      });
    }

    case ActionType.ChangeTitle: {
      const index = state.findIndex(item => item.id === action.payload.id);
      const stateCopy = state.slice();

      stateCopy[index] = {
        ...state[index],
        title: action.payload.title,
      };

      return stateCopy;
    }

    case ActionType.SetTodos:
      return action.payload;

    default:
      return state;
  }
}

type TC = {
  todos: Todo[];
  dispatch: (o: Action) => void;
};

const DEFAULT_TODOSCONTEXT: TC = {
  todos: [],
  dispatch: () => { },
};

export const TodosContext = React.createContext<TC>(DEFAULT_TODOSCONTEXT);

type Props = {
  children: React.ReactNode;
};

const localStorageAction: Action = {
  type: ActionType.SetTodos,
  payload: [],
};

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  // eslint-disable-next-line max-len
  const [todos, dispatch] = useLocalStorage<Todo[], Action>('todos', reducer, [] as Todo[], localStorageAction);

  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
