import React from 'react';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';

import { Todo } from '../types/Todo';
import { FilterAction, ListAct } from '../types/Actions';

type ContextProps = {
  todo: Todo;
  todos: Todo[];
  allTodos: Todo[];
  dispatch: (type: Action) => void;
  handleFilter: (type: FilterAction) => void;
  filterOption: FilterAction;
};

type ProviderProps = {
  children: React.ReactNode;
};

export type Action =
  | { type: ListAct.Add; payload: Todo }
  | { type: ListAct.Delete; payload: number }
  | { type: ListAct.Update; payload: { id: number; title: string } }
  | { type: ListAct.ClearComplet }
  | { type: ListAct.SetComplet; payload: { id: number; completed: boolean } }
  | { type: ListAct.SetAllComplet };

const reducer = (state: Todo[], action: Action) => {
  switch (action.type) {
    case ListAct.Add:
      return [...state, action.payload];

    case ListAct.Delete:
      return state.filter(todo => todo.id !== action.payload);

    case ListAct.Update:
      return state.map((todo: Todo) =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title.trim() }
          : todo,
      );

    case ListAct.SetComplet:
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: action.payload.completed }
          : todo,
      );

    case ListAct.ClearComplet:
      return state.filter(todo => todo.completed === false);

    case ListAct.SetAllComplet:
      const completed = state.some(todo => !todo.completed);

      return state.map(todo => {
        return { ...todo, completed: completed };
      });

    default:
      return state;
  }
};

const filter = (todos: Todo[], action: FilterAction) => {
  switch (action) {
    case FilterAction.All:
    default:
      return todos;

    case FilterAction.Active:
      return todos.filter(todo => todo.completed === false);

    case FilterAction.Completed:
      return todos.filter(todo => todo.completed === true);
  }
};

export const TodoContext = React.createContext<ContextProps>({
  todos: [],
  allTodos: [],
  dispatch: () => {},
  handleFilter: () => void {},
  filterOption: FilterAction.All,
  todo: {
    id: 0,
    title: '',
    completed: false,
  },
});

export const TodoProvider: React.FC<ProviderProps> = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, []);
  const [filterOption, setFilterOption] = useState(FilterAction.All);

  const handleFilter = useCallback((type: FilterAction) => {
    setFilterOption(type);
  }, []);

  const value = useMemo(
    () => ({
      todos: filter(todos, filterOption),
      allTodos: todos,
      handleFilter,
      filterOption,
      dispatch,
      todo: {
        id: 0,
        title: '',
        completed: false,
      },
    }),
    [dispatch, handleFilter, filterOption, todos],
  );

  // useEffect(() => {
  //   const storedTodos = JSON.parse(localStorage.getItem('todos') as string);

  //   if (storedTodos) {
  //     storedTodos.forEach((todo: Todo) => {
  //       dispatch({ type: ListAct.Add, payload: todo });
  //     });
  //   }
  // }, []);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);

      parsedTodos.forEach((todo: Todo) => {
        dispatch({ type: ListAct.Add, payload: todo });
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
