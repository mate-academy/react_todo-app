/* eslint-disable @typescript-eslint/no-shadow */
import React, {
  useReducer,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { Todo } from '../types/Todo';

export enum FilterBy {
  All = 'ALL',
  Active = 'ACTIVE',
  Completed = 'COMPLETED',
}

export type FilterAction = FilterBy.All | FilterBy.Active | FilterBy.Completed;

type TodoContextType = {
  todos: Todo[];
  originalTodos: Todo[];
  dispatch: (action: Action) => void;
  filteredBy: FilterBy;
  handleFilterBy: (type: FilterBy) => void;
};

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  originalTodos: [],
  dispatch: () => {},
  filteredBy: FilterBy.All,
  handleFilterBy: () => {},
});

export type Props = {
  children: React.ReactNode;
};

export enum ActionNames {
  Add = 'ADD',
  Delete = 'DELETE',
  Update = 'UPDATE',
  ToggleCompleted = 'TOGGLE_COMPLETED',
  ToggleAllCompleted = 'TOGGLE_ALL_COMPLETED',
  ClearCompleted = 'CLEAR_COMPLETED',
}

type T = {
  type: ActionNames.ToggleCompleted;
  payload: { id: number; completed: boolean };
};

export type Action =
  | { type: ActionNames.Add; payload: Todo }
  | { type: ActionNames.Delete; payload: number }
  | { type: ActionNames.Update; payload: { id: number; title: string } }
  | T
  | { type: ActionNames.ToggleAllCompleted; payload: Todo[] }
  | { type: ActionNames.ClearCompleted };

function reducer(state: Todo[], action: Action) {
  switch (action.type) {
    case ActionNames.Add:
      return [...state, action.payload];

    case ActionNames.Delete:
      return state.filter(todo => todo.id !== action.payload);

    case ActionNames.Update:
      return state.map((todo: Todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            title: action.payload.title.trim(),
          };
        }

        return todo;
      });

    case ActionNames.ToggleCompleted:
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      });

    case ActionNames.ToggleAllCompleted:
      const completed = state.some(todo => todo.completed === false);

      return state.map(todo => {
        return {
          ...todo,
          completed: completed,
        };
      });

    case ActionNames.ClearCompleted:
      return state.filter(todo => todo.completed === false);

    default:
      return state;
  }
}

function filter(todos: Todo[], type: FilterAction) {
  switch (type) {
    case FilterBy.Active:
      return todos.filter(todo => todo.completed === false);

    case FilterBy.Completed:
      return todos.filter(todo => todo.completed === true);

    case FilterBy.All:
    default:
      return todos;
  }
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, []);
  const [filteredBy, setFilteredBy] = useState<FilterBy>(FilterBy.All);

  const handleFilterBy = useCallback((type: FilterBy) => {
    setFilteredBy(type);
  }, []);

  const value = useMemo(
    () => ({
      todos: filter(todos, filteredBy),
      originalTodos: todos,
      dispatch,
      filteredBy,
      handleFilterBy,
    }),
    [dispatch, handleFilterBy, filteredBy, todos],
  );

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos') as string);

    if (todos) {
      todos.forEach((todo: Todo) => {
        dispatch({ type: ActionNames.Add, payload: todo });
      });
    }
  }, []);

  useEffect(() => {
    localStorage.clear();

    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
