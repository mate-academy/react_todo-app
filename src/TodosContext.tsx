import {
  createContext,
  useState,
} from 'react';
import {
  Todo,
  Todos,
  EStatus,
  Props,
} from './types';

export const TodosContext = createContext<Todos>({
  todos: [],
  setTodos: () => { },
  filterType: EStatus.All,
  setFilterType: () => { },
});

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
