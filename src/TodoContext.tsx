import React, { useEffect, useMemo, useReducer } from 'react';
import { Todo } from './types/Todo';
import { SortType } from './types/SortType';

interface State {
  todos: Todo[];
  sortType: SortType;
}

interface TodoContextType extends State {
  setSortType: (newSortType: SortType) => void;
  setTodos: (newTodos: Todo[]) => void;
  addTodo: (title: string) => void;
  removeTodo: (index: number) => void;
  changeTodo: (newTodo: Todo, index: number) => void;
}

type Action =
  | { type: 'setSortType'; newSortType: SortType }
  | { type: 'setTodos'; newTodos: Todo[] }
  | { type: 'addTodo'; title: string }
  | { type: 'removeTodo'; index: number }
  | { type: 'changeTodo'; newTodo: Todo; index: number };

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  sortType: SortType.None,
  setSortType: () => {},
  setTodos: () => {},
  addTodo: () => {},
  removeTodo: () => {},
  changeTodo: () => {},
});

type Props = {
  children: React.ReactNode;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setSortType':
      return {
        ...state,
        sortType: action.newSortType,
      };

    case 'setTodos':
      return {
        ...state,
        todos: action.newTodos,
      };

    case 'addTodo':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: +new Date(),
            title: action.title.trim(),
            completed: false,
            beingEdited: false,
          },
        ],
      };

    case 'removeTodo':
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, action.index),
          ...state.todos.slice(action.index + 1),
        ],
      };

    case 'changeTodo':
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, action.index),
          action.newTodo,
          ...state.todos.slice(action.index + 1),
        ],
      };

    default:
      return state;
  }
}

const initialState: State = {
  todos: JSON.parse(localStorage.getItem('todos') as string) || [],
  sortType: SortType.None,
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [{ todos, sortType }, dispatch] = useReducer(reducer, initialState);

  const setSortType = (newSortType: SortType) =>
    dispatch({ type: 'setSortType', newSortType });
  const setTodos = (newTodos: Todo[]) =>
    dispatch({ type: 'setTodos', newTodos });
  const addTodo = (title: string) => dispatch({ type: 'addTodo', title });
  const removeTodo = (index: number) => dispatch({ type: 'removeTodo', index });
  const changeTodo = (newTodo: Todo, index: number) => {
    dispatch({ type: 'changeTodo', newTodo, index });
  };

  const value = useMemo(
    () => ({
      todos,
      sortType,
      setSortType,
      setTodos,
      addTodo,
      removeTodo,
      changeTodo,
    }),
    [todos, sortType],
  );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
