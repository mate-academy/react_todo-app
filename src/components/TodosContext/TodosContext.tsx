import React, { useReducer } from 'react';
import { Todo } from '../../types/Todo';
import { Action, ActionType } from '../../types/Action';

function reducer(state: Todo[], action: Action) {
  switch (action.type) {
    case ActionType.Add:
      if (!action.payload) {
        return state;
      }

      return [...state, action.payload];
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
  dispatch: () => {},
};

export const TodosContext = React.createContext<TC>(DEFAULT_TODOSCONTEXT);

type Props = {
  children: React.ReactNode;
};

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, [] as Todo[]);

  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
