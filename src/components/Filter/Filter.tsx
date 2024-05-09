import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useMemo,
} from 'react';
import './Filter.scss';
import { ACTIONSINFILTERCONTEXT, TodoInterface } from '../../utils';
import { TodoContext } from '../../Contexts';

interface FilterContextDataType {
  filteredTodos: TodoInterface[];
  setFilterCriteria: React.Dispatch<ACTIONSINFILTERCONTEXT>;
  currentFilterCriteria: ACTIONSINFILTERCONTEXT;
  itemsLeft: number;
  totalCompletedTodos: number;
}

export const FilterContext = createContext<undefined | FilterContextDataType>(
  undefined,
);

const refreshFilteredList = (
  state: Readonly<TodoInterface[]>,
  action: ACTIONSINFILTERCONTEXT,
) => {
  let newState;

  switch (action) {
    case ACTIONSINFILTERCONTEXT.ACTIVE:
      newState = state.filter(e => !e.completed);
      break;
    case ACTIONSINFILTERCONTEXT.COMPLETED:
      newState = state.filter(e => e.completed);
      break;
    default:
      newState = state;
      break;
  }

  return newState.map(e => {
    return { ...e };
  });
};

export const FilterContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { state: todos } = useContext(TodoContext)!;

  const [criteriaFilter, setCriteriaFilter] = useState(
    ACTIONSINFILTERCONTEXT.ALL,
  );

  const totalCompletedTodos = useMemo(() => {
    return todos.reduce((acc, el) => {
      const counter = acc + (el.completed ? 1 : 0);

      return counter;
    }, 0);
  }, [todos]);

  const filteredTodos = useMemo(() => {
    return refreshFilteredList(todos, criteriaFilter);
  }, [todos, criteriaFilter]);

  const itemsLeft = useMemo(
    () =>
      todos.reduce((acc, el) => {
        const counter = acc + (el.completed ? 0 : 1);

        return counter;
      }, 0),
    [todos],
  );

  return (
    <FilterContext.Provider
      value={{
        filteredTodos: filteredTodos,
        setFilterCriteria: setCriteriaFilter,
        currentFilterCriteria: criteriaFilter,
        itemsLeft: itemsLeft,
        totalCompletedTodos: totalCompletedTodos,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const Filter: React.FC = () => {
  const { currentFilterCriteria, setFilterCriteria } =
    useContext(FilterContext)!;

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={`filter__link ${currentFilterCriteria === ACTIONSINFILTERCONTEXT.ALL ? 'selected' : ''}`}
        data-cy="FilterLinkAll"
        onClick={() => setFilterCriteria(ACTIONSINFILTERCONTEXT.ALL)}
      >
        All
      </a>

      <a
        href="#/active"
        className={`filter__link ${currentFilterCriteria === ACTIONSINFILTERCONTEXT.ACTIVE ? 'selected' : ''}`}
        data-cy="FilterLinkActive"
        onClick={() => setFilterCriteria(ACTIONSINFILTERCONTEXT.ACTIVE)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={`filter__link ${currentFilterCriteria === ACTIONSINFILTERCONTEXT.COMPLETED ? 'selected' : ''}`}
        data-cy="FilterLinkCompleted"
        onClick={() => setFilterCriteria(ACTIONSINFILTERCONTEXT.COMPLETED)}
      >
        Completed
      </a>
    </nav>
  );
};
