import React, {
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import {
  Action,
  Filtering,
  Todo,
  useCustomReducer,
} from '../CustomReducer/useCustomReducer';

export interface MyContextData {
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
  activeFilter: Filtering;
  setActiveFilter: React.Dispatch<SetStateAction<Filtering>>;
  reducer: Reducer;
}

interface Reducer {
  state: Todo[];
  filterItems: (filterType: Filtering) => Todo[];
  addTodo: (todo: Todo) => void;
  addCompleted: (id: number) => void;
  remove: (id: number) => void;
  clearCompleted: () => void;
  allCompleted: () => void;
  changeInput: (todo: Todo) => void;
  dispatch: React.Dispatch<Action>;
}

interface Props {
  children: ReactNode;
}

export const MyContext = createContext<MyContextData | string>('default value');

export const MyProvider: React.FC<Props> = ({ children }) => {
  const reducer = useCustomReducer();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<Filtering>(Filtering.All);
  const values: MyContextData = {
    reducer,
    query,
    setQuery,
    activeFilter,
    setActiveFilter,
  };

  return (
    <MyContext.Provider value={values}>{children}</MyContext.Provider>
  );
};
