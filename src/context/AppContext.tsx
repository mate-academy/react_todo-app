import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../types/todo';
import useLocalStorage from '../hooks/useLocalStorage.hook';
import { SortType } from '../enums/SortType';

type AppContextContainerProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  sortType: SortType;
  setSortType: React.Dispatch<React.SetStateAction<SortType>>;
  inputRef: React.RefObject<HTMLInputElement>;
};

type Props = {
  children: ReactNode;
};

const AppContextContainer = createContext({} as AppContextContainerProps);

export const useAppContextContainer = () => {
  return useContext(AppContextContainer);
};

export const AppContext = ({ children }: Props) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [sortType, setSortType] = useState<SortType>(SortType.ALL);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <AppContextContainer.Provider
      value={{ todos, setTodos, sortType, setSortType, inputRef }}
    >
      {children}
    </AppContextContainer.Provider>
  );
};
