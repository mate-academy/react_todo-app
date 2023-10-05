import React, { useReducer, useState } from 'react';

import { Todo } from '../../types/Todo';
import { Action } from '../../types/Action';
import { Status } from '../../types/Status';

import { getStartingState } from '../../utils/manageLocalState';
import { todosReducer } from '../../utils/todosReducer';

const startingState = getStartingState();

export const StateContext = React.createContext<Todo[]>(startingState);
export const DispatchContext = (
  React.createContext<React.Dispatch<Action>>(() => {})
);

export const FilterContext = React.createContext<Status>(Status.All);
export const SetFilterContext = (
  React.createContext<React.Dispatch<Status>>(() => {})
);

type Props = {
  children: React.ReactNode;
};

export const TodosContext: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, startingState);
  const [currentFilter, setCurrentFilter] = useState(Status.All);

  return (
    <SetFilterContext.Provider value={setCurrentFilter}>
      <FilterContext.Provider value={currentFilter}>
        <DispatchContext.Provider value={dispatch}>
          <StateContext.Provider value={todos}>
            {children}
          </StateContext.Provider>
        </DispatchContext.Provider>
      </FilterContext.Provider>
    </SetFilterContext.Provider>
  );
};
