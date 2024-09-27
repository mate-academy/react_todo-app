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
  changeTodo: (newTodo: Todo, todoId: number) => void;
}

type Action =
  | { type: 'setSortType'; newSortType: SortType }
  | { type: 'setTodos'; newTodos: Todo[] }
  | { type: 'addTodo'; title: string }
  | { type: 'removeTodo'; todoId: number }
  | { type: 'changeTodo'; newTodo: Todo; todoId: number };

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
          },
        ],
      };

    case 'removeTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.todoId),
      };

    case 'changeTodo':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.todoId ? action.newTodo : todo,
        ),
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

  const setSortType = (newSortType: SortType) => {
    dispatch({ type: 'setSortType', newSortType });
  };

  const setTodos = (newTodos: Todo[]) => {
    dispatch({ type: 'setTodos', newTodos });
  };

  const addTodo = (title: string) => {
    dispatch({ type: 'addTodo', title });
  };

  const removeTodo = (todoId: number) => {
    dispatch({ type: 'removeTodo', todoId });
  };

  const changeTodo = (newTodo: Todo, todoId: number) => {
    dispatch({ type: 'changeTodo', newTodo, todoId });
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
