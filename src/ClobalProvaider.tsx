import React, { useReducer, useState } from 'react';
import { Todo } from './types/todo';
import { FilterState } from './types/FilterState';

const startState: Todo[] = [];

type InitialState = {
  todoList: Todo[];
  todoVisible: Todo[];
};

type Action =
  | { type: 'addTodo'; payload: Todo }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'change'; payload: { title: string; id: number } }
  | { type: 'deleteCompleted' }
  | { type: 'toggleTodo'; payload: { completed: boolean; id: number } }
  | { type: 'toggleTodoAll'; payload: boolean };

const reducer = (state: Todo[], action: Action) => {
  switch (action.type) {
    case 'addTodo':
      return [...state, action.payload];

    case 'deleteTodo':
      return state.filter(todo => todo.id !== action.payload);

    case 'deleteCompleted':
      return state.filter(todo => todo.completed === false);

    case 'change':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo,
      );

    case 'toggleTodo':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: action.payload.completed }
          : todo,
      );

    case 'toggleTodoAll':
      return state.map(todo => ({ ...todo, completed: action.payload }));

    default:
      return state;
  }
};

export const filterTodos = (todoList: Todo[], filter?: FilterState) => {
  if (filter === FilterState.Active) {
    return todoList.filter(todo => todo.completed === false);
  }

  if (filter === FilterState.Completed) {
    return todoList.filter(todo => todo.completed === true);
  }

  return todoList;
};

export const StateContext = React.createContext<InitialState>({
  todoList: startState,
  todoVisible: startState,
});
export const FilterContext = React.createContext<React.Dispatch<FilterState>>(
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
  const [filter, setFilter] = useState(FilterState.All);

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
