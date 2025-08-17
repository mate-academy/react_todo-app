import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Todo } from '../Type/Todo';
import { TodoListContext } from './TodoListContext';
import { Filters } from '../Enum/Filters';

type FilterContextType = {
  filter: Filters;
  setFilter: React.Dispatch<React.SetStateAction<Filters>>;
  filteredTodoList: (filter: Filters) => Todo[];
  filteredList: Todo[];
};

export const FilterContext = createContext<FilterContextType>({
  filter: Filters.ALL,
  setFilter: () => {},
  filteredTodoList: () => [],
  filteredList: [],
});

type FilterContextProviderProps = {
  children: React.ReactNode;
};

export const FilterContextProvider: React.FC<FilterContextProviderProps> = ({
  children,
}) => {
  const [filter, setFilter] = useState(Filters.ALL);
  const { todoList } = useContext(TodoListContext);

  const filteredTodoList = useCallback(
    (filterType: Filters): Todo[] => {
      switch (filterType) {
        case Filters.ACTIVE:
          return todoList.filter(todo => !todo.completed);
        case Filters.COMPLETED:
          return todoList.filter(todo => todo.completed);
        default:
          return todoList;
      }
    },
    [todoList],
  );

  const filteredList = useMemo(
    () => filteredTodoList(filter),
    [filter, filteredTodoList],
  );

  return (
    <FilterContext.Provider
      value={{ filter, setFilter, filteredTodoList, filteredList }}
    >
      {children}
    </FilterContext.Provider>
  );
};
