import React, {
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useLocation,
} from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import { Todo } from '../../types/Todo';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { TypeTodosContext } from '../../types/TypeTodosContext';
import { Status } from '../../types/Status';

type Props = {
  children: ReactNode;
};

export const TodosContext = React.createContext<TypeTodosContext>({
  todos: [],
  setTodos: () => { },
});

export const VisibleTodosContext = React.createContext<Todo[]>([]);
export const SelectedContext = React.createContext(Status.All);

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [selected, setSelected] = useState(Status.All);
  const location = useLocation();

  useEffect(() => {
    switch (location.hash) {
      case '#/active':
        setVisibleTodos(todos.filter(todo => todo.completed === false));
        setSelected(Status.ACTIVE);

        return;

      case '#/completed':
        setVisibleTodos(todos.filter(todo => todo.completed === true));
        setSelected(Status.COMPLETED);

        return;

      default:
        setVisibleTodos(todos);
        setSelected(Status.All);
    }
  }, [location, todos]);

  const value = useMemo(() => ({ todos, setTodos }), [todos]);

  return (
    <TodosContext.Provider value={value}>
      <VisibleTodosContext.Provider value={visibleTodos}>
        <SelectedContext.Provider value={selected}>
          {children}
        </SelectedContext.Provider>
      </VisibleTodosContext.Provider>
    </TodosContext.Provider>
  );
};
