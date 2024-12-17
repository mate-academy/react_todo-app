import React, { useReducer } from "react";
import { Todo } from "../../types/Todo";
import { Action, reducer } from "../../GlobalReducer/AppReducer";
import { Filter } from "../../component/TodosFIlter/TodoFilter";

export type State = {
  todos: Todo[],
  filter: Filter,
}

const initialState: State = {
  todos: JSON.parse(localStorage.getItem('todos') || '[]'),
  filter: Filter.all,
}

export const StateContext = React.createContext<State>(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(() => {});

type Props = {
  children: React.ReactNode,
}


export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [ state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>

  );
}
