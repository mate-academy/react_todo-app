/* eslint-disable @typescript-eslint/indent */
import React, { useReducer, useState } from 'react';
import { Filter } from './types/Filter';
import { Todo } from './types/todo';

export enum ActionType {
  ADD_TODO = 'addTodo',
  DELETE_TODO = 'deleteTodo',
  CHANGE = 'change',
  DELETE_COMPLETED = 'deleteCompleted',
  TOGGLE_TODO = 'toggleTodo',
  TOGGLE_TODO_ALL = 'toggleTodoAll',
}

const startState: Todo[] = [];

type InitialState = {
  todoList: Todo[];
  todoVisible: Todo[];
};

type Action =
  | { type: ActionType.ADD_TODO; payload: Todo }
  | { type: ActionType.DELETE_TODO; payload: number }
  | { type: ActionType.CHANGE; payload: { title: string; id: number } }
  | { type: ActionType.DELETE_COMPLETED }
  | {
      type: ActionType.TOGGLE_TODO;
      payload: { completed: boolean; id: number };
    }
  | { type: ActionType.TOGGLE_TODO_ALL; payload: boolean };

const reducer = (state: Todo[], action: Action) => {
  switch (action.type) {
    case ActionType.ADD_TODO:
      return [...state, action.payload];

    case ActionType.DELETE_TODO:
      return state.filter(todo => todo.id !== action.payload);

    case ActionType.DELETE_COMPLETED:
      return state.filter(todo => todo.completed === false);

    case ActionType.CHANGE:
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo,
      );

    case ActionType.TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: action.payload.completed }
          : todo,
      );

    case ActionType.TOGGLE_TODO_ALL:
      return state.map(todo => ({ ...todo, completed: action.payload }));

    default:
      return state;
  }
};

export const filterTodos = (todoList: Todo[], filter?: Filter) => {
  if (filter === Filter.ACTIVE) {
    return todoList.filter(todo => todo.completed === false);
  }

  if (filter === Filter.COMPLETED) {
    return todoList.filter(todo => todo.completed === true);
  }

  return todoList;
};

export const StateContext = React.createContext<InitialState>({
  todoList: startState,
  todoVisible: startState,
});

export const FilterContext = React.createContext<React.Dispatch<Filter>>(
  () => {},
);

export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const initFromLocalStorage = (): Todo[] => {
    try {
      const saved = localStorage.getItem('todos');

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const [todoList, dispatch] = useReducer(
    reducer,
    startState,
    initFromLocalStorage,
  );

  const [filter, setFilter] = useState(Filter.ALL);

  const todoVisible = React.useMemo(
    () => filterTodos(todoList, filter),
    [todoList, filter],
  );

  React.useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todoList));
    } catch {}
  }, [todoList]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={{ todoVisible, todoList }}>
        <FilterContext.Provider value={setFilter}>
          {children}
        </FilterContext.Provider>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
