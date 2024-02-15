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
  visibleTodos: [],
  setTodos: () => { },
});

export const SelectedContext = React.createContext(Status.All);

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [selected, setSelected] = useState(Status.All);
  const location = useLocation();

  useEffect(() => {
    switch (location.hash) {
      case '#/active':
        setVisibleTodos(todos.filter(todo => !todo.completed));
        setSelected(Status.ACTIVE);

        return;

      case '#/completed':
        setVisibleTodos(todos.filter(todo => todo.completed));
        setSelected(Status.COMPLETED);

        return;

      default:
        setVisibleTodos(todos);
        setSelected(Status.All);
    }
  }, [location, todos]);

  const value = useMemo(() => {
    return { todos, setTodos, visibleTodos };
  }, [todos, visibleTodos]);

  return (
    <TodosContext.Provider value={value}>
      <SelectedContext.Provider value={selected}>
        {children}
      </SelectedContext.Provider>
    </TodosContext.Provider>
  );
};
