import React, { useEffect, useReducer } from 'react';
import { StartTodos, Todo } from '../interfaces/Todo';
import { Status } from '../units/units';
import { Action } from '../types/Actions';

type Props = {
  children: React.ReactNode;
};

const newTodo = (title: string): Todo => {
  return {
    id: +new Date(),
    title: title,
    completed: false,
  };
};

function reducer({ todos, filter }: StartTodos, action: Action) {
  switch (action.type) {
    case 'ADD':
      return { todos: [...todos, newTodo(action.payload)], filter };
    case 'REMOVE':
      return {
        filter,
        todos: todos.filter(todo => todo.id !== action.payload.id),
      };
    case 'TOGGLE':
      return {
        todos: todos.map(todo => {
          if (todo.id === action.payload.id) {
            return { ...todo, completed: !todo.completed };
          }

          return todo;
        }),
        filter,
      };
    case 'CLEAR_COMPLETED':
      return { todos: todos.filter(todo => !todo.completed), filter };
    case 'UNCHECK_TODOS':
      return {
        todos: todos.map(todo => {
          return { ...todo, completed: !todo.completed };
        }),
        filter,
      };
    case 'CHECK_ALL_TODOS':
      return {
        todos: todos.map(todo => {
          if (!todo.completed) {
            return { ...todo, completed: !todo.completed };
          }

          return todo;
        }),
        filter,
      };
    case 'BLUR':
      return {
        todos: todos.map(todo => {
          if (todo.id === action.payload.id) {
            return { ...todo, title: action.payload.title };
          }

          return todo;
        }),
        filter,
      };
    case 'SHOW_ACTIVE':
      return { todos, filter: Status.Active };
    case 'SHOW_ALL':
      return { todos, filter: Status.All };
    case 'SHOW_COMPLETED':
      return { todos, filter: Status.Completed };
    default:
      return { todos, filter };
  }
}

const getTodosFromLocalStorage = () => {
  const data = localStorage.getItem('todos');

  return data ? JSON.parse(data) : [];
};

const startTodos: StartTodos = {
  filter: Status.All,
  todos: getTodosFromLocalStorage(),
};

export const StateContext = React.createContext<StartTodos>(startTodos);
export const DispatchContext = React.createContext<(action: Action) => void>(
  () => {},
);

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, startTodos);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
