import { createContext, useContext, useMemo, useState } from 'react';
import { Todo } from '../Type/Todo';
import { TodoListContext } from './TodoListContext';
import { Filters } from '../Enum/Filters';

type FilterContextType = {
  filter: Filters;
  setFilter: React.Dispatch<React.SetStateAction<Filters>>;
  filteredTodoList: Todo[];
};

export const FilterContext = createContext<FilterContextType>({
  filter: Filters.ALL,
  setFilter: () => {},
  filteredTodoList: [],
});

type FilterContextProviderProps = {
  children: React.ReactNode;
};

export const FilterContextProvider: React.FC<FilterContextProviderProps> = ({
  children,
}) => {
  const [filter, setFilter] = useState(Filters.ALL);
  const { todoList } = useContext(TodoListContext);

  const filteredTodoList = useMemo(() => {
    switch (filter) {
      case Filters.ACTIVE:
        return todoList.filter(todo => !todo.completed);
      case Filters.COMPLETED:
        return todoList.filter(todo => todo.completed);
      default:
        return todoList;
    }
  }, [filter, todoList]);

  return (
    <FilterContext.Provider value={{ filter, setFilter, filteredTodoList }}>
      {children}
    </FilterContext.Provider>
  );
};
