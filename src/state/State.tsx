import React, { useReducer } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';
import {
  countTodos,
  deleteTodo,
  editTodoItem,
  switchCompleted,
  switchToggleAll,
} from '../services/todo';

type State = {
  todos: Todo[];
  filterBy: Filter;
  todosCounter: number;
};

type Action
  = { type: 'addTodo', payload: string }
  | { type: 'toggle', payload: { id: number, status: boolean } }
  | { type: 'delete', payload: number }
  | { type: 'toggleAll', payload: boolean }
  | { type: 'loadFromStorage' }
  | { type: 'setFilter', payload: Filter }
  | { type: 'clearCompleted' }
  | { type: 'edit', payload: { value: string, id: number } };

type Props = {
  children: React.ReactNode;
};

export const initialState: State = {
  todos: [],
  filterBy: 'all',
  todosCounter: 0,
};

const reducer = (state: State, action: Action): State => {
  let newState: State = {
    ...state,
  };

  let stateFromStorage: string | null = null;

  switch (action.type) {
    case 'addTodo':
      newState = {
        ...state,
        todos: [
          ...state.todos,
          { id: +new Date(), title: action.payload, completed: false },
        ],
      };
      localStorage.setItem('todos', JSON.stringify(newState));

      return newState;

    case 'toggle':
      newState = {
        ...state,
        todos: switchCompleted(
          action.payload.id,
          action.payload.status,
          state.todos,
        ),
        todosCounter: countTodos(state.todos),
      };
      localStorage.setItem('todos', JSON.stringify(newState));

      return newState;

    case 'delete':
      newState = {
        ...state,
        todos: deleteTodo(action.payload, state.todos),
      };
      localStorage.setItem('todos', JSON.stringify(newState));

      return newState;

    case 'toggleAll':
      newState = {
        ...state,
        todos: switchToggleAll(action.payload, state.todos),
        todosCounter: countTodos(state.todos),
      };
      localStorage.setItem('todos', JSON.stringify(newState));

      return newState;

    case 'loadFromStorage':
      stateFromStorage = localStorage.getItem('todos');
      if (stateFromStorage) {
        newState = JSON.parse(stateFromStorage);
      }

      return newState;

    case 'setFilter':
      return {
        ...newState,
        filterBy: action.payload,
      };

    case 'clearCompleted':
      newState = {
        ...newState,
        todos: newState.todos.filter(el => el.completed === false),
      };
      localStorage.setItem('todos', JSON.stringify(newState));

      return newState;

    case 'edit':
      newState = {
        ...newState,
        todos: editTodoItem(newState.todos, action.payload),
      };
      localStorage.setItem('todos', JSON.stringify(newState));

      return newState;
    default:
      return state;
  }
};

export const TodosContext = React.createContext(initialState);
export const DispatchContext
  = React.createContext((() => { }) as React.Dispatch<Action>);

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosContext.Provider value={state}>
        {children}
      </TodosContext.Provider>
    </DispatchContext.Provider>
  );
};
