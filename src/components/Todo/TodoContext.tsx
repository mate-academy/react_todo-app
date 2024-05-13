import { Todo } from '../../types/Todo';
import { FilterBy } from '../../types/FilterBy';
import React, { useReducer, useEffect } from 'react';

type Action =
  | { type: 'AddTodo'; title: string; id: number }
  | { type: 'removeTodo'; id: number }
  | { type: 'changeTodo'; title: string; id: number }
  | { type: 'markComplete'; id: number }
  | { type: 'toggleTodo' }
  | { type: 'removeCompletedTodo' }
  | { type: 'changeFilterStatus'; status: FilterBy };

interface State {
  todos: Todo[];
  filterStatus: FilterBy;
}

type Props = {
  children: React.ReactNode;
};

function reducer(state: State, action: Action) {
  const { todos } = state;

  switch (action.type) {
    case 'AddTodo':
      return {
        ...state,
        todos: [
          ...todos,
          {
            id: action.id,
            completed: false,
            title: action.title.trim(),
          },
        ],
      };

    case 'removeTodo':
      return {
        ...state,
        todos: todos.filter(todo => todo.id !== action.id),
      };

    case 'changeTodo':
      return {
        ...state,
        todos: todos.map(todo =>
          todo.id === action.id ? { ...todo, title: action.title } : todo,
        ),
      };

    case 'markComplete':
      return {
        ...state,
        todos: todos.map(todo =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    case 'toggleTodo':
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !state.todos.every(tod => tod.completed),
        })),
      };
    case 'removeCompletedTodo':
      return {
        ...state,
        todos: todos.filter(todo => !todo.completed),
      };
    case 'changeFilterStatus':
      return {
        ...state,
        filterStatus: action.status,
      };
    default:
      return state;
  }
}

const keyIsExist = localStorage.getItem('todos');

const initialValue: State = {
  todos: keyIsExist ? JSON.parse(keyIsExist) : [],
  filterStatus: FilterBy.All,
};

export const StateContext = React.createContext(initialValue);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((_action: Action) => {});

export const GlobaleStateProvider: React.FC<Props> = ({ children }) => {
  const [{ todos, filterStatus }, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={{ todos, filterStatus }}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
