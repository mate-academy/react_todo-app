import { createContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';
import { useLocalStorage } from '../hooks/useLocalStorage';

type TypeContext = {
  todos: Todo[];
  title: string;
  isFocusing: boolean;
  isLoading: boolean;
  error: string;
  filter: FilterType;

  setTodos: (value: Todo[] | ((prevState: Todo[]) => Todo[])) => void;
  setIsFocusing: (value: boolean | ((prevState: boolean) => boolean)) => void;
  setTitle: (value: string) => void;
  setError: (value: string) => void;
  setFilter: (value: FilterType) => void;
  setLoading: (value: boolean) => void;
  getFilteredTodos: (todosList: Todo[], filterQuery: FilterType) => Todo[];
};

const getFilteredTodos = (
  todosList: Todo[],
  filterQuery: FilterType,
): Todo[] => {
  const filteredTodos = [...todosList];

  switch (filterQuery) {
    case FilterType.active:
      return filteredTodos.filter(todo => !todo.completed);
    case FilterType.completed:
      return filteredTodos.filter(todo => todo.completed);
    default:
      return filteredTodos;
  }
};

export const TodosContext = createContext<TypeContext>({
  todos: [],
  title: '',
  isFocusing: true,
  error: '',
  isLoading: false,
  filter: FilterType.all,
  setTodos: () => {},
  setIsFocusing: () => {},
  setTitle: () => {},
  setError: () => {},
  setFilter: () => {},
  setLoading: () => {},
  getFilteredTodos: getFilteredTodos,
});

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isFocusing, setIsFocusing] = useState(true);
  const [error, setError] = useState('');

  const [filter, setFilter] = useState(FilterType.all);

  return (
    <TodosContext.Provider
      value={{
        todos,
        title,
        isFocusing,
        error,
        filter,
        isLoading,

        setTodos,
        setTitle,
        setIsFocusing,
        setError,
        setFilter,
        setLoading,
        getFilteredTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
