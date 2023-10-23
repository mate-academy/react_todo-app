import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

export type Todo = {
  id: string,
  title: string,
  completed: boolean,
};

export type Todos = {
  todos: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>
  filterType: EStatus,
  setFilterType: Dispatch<SetStateAction<EStatus>>;
};

export enum EStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodosContext = createContext<Todos>({
  todos: [],
  setTodos: () => {},
  filterType: EStatus.All,
  setFilterType: () => {},
});

type Props = {
  children: React.ReactNode
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState(EStatus.All);

  return (
    <TodosContext.Provider value={{
      todos,
      setTodos,
      filterType,
      setFilterType,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const filterTodos = (array: Todo[], type: string) => {
  switch (type) {
    case 'active':
      return array.filter(todo => todo.completed === false);
    case 'completed':
      return array.filter(todo => todo.completed === true);
    default:
      return array;
  }
};
