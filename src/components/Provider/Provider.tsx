import React, { ReactNode, SetStateAction, createContext, useState } from "react";
import { Filtering, Todo, useCustomReducer } from "../CustomReducer/useCustomReducer";

export interface MyContextData {
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
  activeFilter: Filtering;
  setActiveFilter: React.Dispatch<SetStateAction<Filtering>>;
  reducer:Reducer,

}

interface Reducer{
  state: Todo[];
  filterItems: (filterType: Filtering) => Todo[];
  addTodo: (todo: Todo) => void;
  addCompleted: (id: number) => void;
  remove: (id: number) => void;
  clearCompleted: () => void;
  allCompleted: () => void;
  changeInput: (todo: Todo) => void;
};

interface Props {
  children: ReactNode
}

const MyContext = createContext<MyContextData | undefined>(undefined);

const MyProvider: React.FC<Props> = ({ children }) => {
  const reducer = useCustomReducer();
  // const { state, filterItems, addTodo, clearCompleted, allCompleted } = reducer;
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<Filtering>(Filtering.All);

  const values: MyContextData = {
    reducer,
    query,
    setQuery,
    activeFilter,
    setActiveFilter,
  }
  return(
    <MyContext.Provider value={ values }>
      {children}
    </MyContext.Provider>
  );
}

export {MyContext ,MyProvider}
