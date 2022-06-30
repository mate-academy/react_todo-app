import React, { useReducer } from 'react';
import ITodo from './models/Todo';

interface IState {
  todos: ITodo[];
  user: null;
}

const reducer = (state: IState = initialState, action: any) => {
  switch (action.type) {
    case 'toggleAll':
      return {
        ...state,
        todos: state.todos.map((todo: ITodo) => {
          if (action.allTodosCompleted) {
            return {
              ...todo,
              completed: false,
            };
          }

          return {
            ...todo,
            completed: true,
          };
        }),
      };
    case 'getUser':
      return {
        ...state,
        user: action.user,
      };
    case 'getUserTodos':
      return {
        ...state,
        todos: action.todos,
      };
    case 'addTodo':
      return {
        ...state,
        todos: [...state.todos, action.todo],
      };
    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter((todo: ITodo) => todo.id !== action.id),
      };
    case 'updateTodo':
      return {
        ...state,
        todos: state.todos.map((todo: ITodo) => {
          if (todo.id === action.id) {
            return action.todo;
          }

          return todo;
        }),
      };
    case 'clearCompletedTodos':
      return {
        ...state,
        todos: state.todos.filter((todo: ITodo) => todo.completed === false),
      };
    default:
      return {
        ...state,
      };
  }
};

const initialState = {
  todos: [],
  user: null,
};

export const DispatchContext = React.createContext<any>(() => {});
export const StateContext = React.createContext<IState>(initialState);

type Props = {
  children: React.ReactNode,
}

export const StateProvider:React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
