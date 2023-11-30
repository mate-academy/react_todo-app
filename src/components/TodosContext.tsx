import React, { Dispatch, useEffect, useReducer } from 'react';
import { Status } from '../types/Filter';
import { State } from '../types/State';
import { ToDo } from '../types/todo';

type Action = { type: 'add', payload: ToDo[] }
| { type: 'remove', payload: ToDo[] }
| { type: 'toggleAll', payload: ToDo[] }
| { type: 'clearAllCompleted', payload: ToDo[] }
| { type: 'completed', payload: ToDo[] }
| { type: 'nonCompleted', payload: ToDo[] }
| { type: 'filter', payload: Status }
| { type: 'edit', payload: ToDo[], }
;

function reducer(
  { todos, filtred }: State,
  action: Action,
): State {
  switch (action.type) {
    case 'edit':
      return {
        todos: action.payload,
        filtred,
      };

    case 'filter':
      return {
        todos,
        filtred: action.payload,
      };

    case 'add':
      return {
        todos: action.payload,
        filtred,
      };

    case 'remove':
      return {
        todos: action.payload,
        filtred,
      };

    case 'toggleAll':
      return {
        todos: action.payload,
        filtred,
      };

    case 'clearAllCompleted':
      return {
        todos: action.payload,
        filtred,
      };

    case 'completed':
      return {
        todos: action.payload,
        filtred,
      };

    case 'nonCompleted':
      return {
        todos: action.payload,
        filtred,
      };

    default:
      return {
        todos,
        filtred,
      };
  }
}

const initialToDos: State = {
  todos: [],
  filtred: Status.all,
};

const getStoredTodos = () => {
  const storedTodos = localStorage.getItem('todos');

  return {
    ...initialToDos,
    todos: storedTodos ? JSON.parse(storedTodos) : [],
  };
};

export const TodosContext = React.createContext(initialToDos);
export const DispatchContex = React.createContext(
  (() => { }) as Dispatch<Action>,
);

type Props = {
  children: React.ReactNode,
};

export const GlobalTodosProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialToDos, getStoredTodos);

  useEffect(() => {
    if (state.todos) {
      localStorage.setItem('todos', JSON.stringify(state.todos));
    }
  }, [state.todos]);

  return (
    <DispatchContex.Provider value={dispatch}>
      <TodosContext.Provider value={state}>
        {children}
      </TodosContext.Provider>
    </DispatchContex.Provider>
  );
};
