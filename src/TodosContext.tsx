import React, {
  useState,
  useReducer,
  useEffect,
  useMemo,
} from 'react';
import { Status } from './types/Status';
import { useLocalStorage } from './hooks/useLocalStorage';
import { State } from './types/State';
import { Action } from './types/Action';
import { reducer } from './hooks/reducer';
import { Todo } from './types/Todo';

type Props = {
  children: React.ReactNode,
};

const initialState: State = {
  todos: [],
  filterBy: Status.All,
  setFilterBy: () => { },
  visibleTodos: [],
};

export const TodosContext = React.createContext(initialState);
export const DispatchContext = React.createContext((_action: Action) => { }); // eslint-disable-line

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [storageTodos, setStorageTodos] = useLocalStorage<Todo[]>('todos', []);
  const [todos, dispatch] = useReducer(reducer, storageTodos);
  const [filterBy, setFilterBy] = useState(Status.All);

  const visibleTodos = useMemo(() => {
    switch (filterBy) {
      case Status.Active:
        return todos.filter(todo => !todo.completed);

      case Status.Completed:
        return todos.filter(todo => todo.completed);

      case Status.All:
      default:
        return todos;
    }
  }, [filterBy, todos]);

  const value = useMemo(() => {
    return {
      todos,
      filterBy,
      setFilterBy,
      visibleTodos,
    };
  }, [filterBy, todos, visibleTodos]);

  useEffect(() => {
    setStorageTodos(todos);
  }, [setStorageTodos, todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosContext.Provider value={value}>
        {children}
      </TodosContext.Provider>
    </DispatchContext.Provider>

  );
};
