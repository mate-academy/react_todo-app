import { createContext } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../enums/Status';
import { useLocalStorage } from '../hooks/useLocalStorage';

type TodosContextProps = {
  todos: Todo[];
  updateTodos: (newTodos: Todo[]) => void;
  filter: Status;
  updateFilter: (newFilter: Status) => void;
};

export const TodosContext = createContext<TodosContextProps>({
  todos: [],
  updateTodos: () => {},
  filter: Status.All,
  updateFilter: () => {},
});

type TodosProviderProps = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useLocalStorage('filter', Status.All);

  const updateFilter = (newFilter: Status) => setFilter(newFilter);
  const updateTodos = (newTodos: Todo[]) => setTodos(newTodos);

  const value = {
    todos,
    updateTodos,
    filter,
    updateFilter,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
