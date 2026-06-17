import React, { useEffect, useReducer } from 'react';
import { Todo } from './types/Todo';
import { Query } from './types/Query';

type Action =
  | { type: 'add'; todo: Partial<Todo> & Pick<Todo, 'title'> }
  | { type: 'update'; todoToUpdate: Partial<Todo> & Pick<Todo, 'id'> }
  | { type: 'delete'; id: number }
  | { type: 'toggleAll' }
  | { type: 'clearCompleted' }
  | { type: 'setQuery'; query: Query };

interface State {
  todos: Todo[];
  query: Query;
}

function reducer(state: State, action: Action) {
  let resultState = state;

  switch (action.type) {
    case 'add':
      if (action.todo.title === '') {
        break;
      }

      const preparedData = {
        id: +new Date(),
        title: action.todo.title,
        completed: action.todo?.completed ?? false,
      };

      resultState = { ...state, todos: [...state.todos, preparedData] };
      break;
    case 'update':
      const updatedTodos = state.todos.map(todo => {
        if (todo.id === action.todoToUpdate.id) {
          return { ...todo, ...action.todoToUpdate };
        }

        return todo;
      });

      resultState = { ...state, todos: updatedTodos };
      break;

    case 'delete':
      const filteredTodos = state.todos.filter(todo => todo.id !== action.id);

      resultState = { ...state, todos: filteredTodos };
      break;

    case 'toggleAll':
      const activeCount = state.todos.filter(todo => !todo.completed).length;

      const targetStatus = activeCount > 0;

      resultState = {
        ...state,
        todos: state.todos.map(todo => ({ ...todo, completed: targetStatus })),
      };
      break;

    case 'clearCompleted':
      resultState = {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
      break;

    case 'setQuery':
      resultState = { ...state, query: action.query };
  }

  return resultState;
}

const getInitialTodos = (): Todo[] => {
  try {
    const stored = localStorage.getItem('todos');

    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
};

const initialState: State = {
  todos: getInitialTodos(),
  query: 'All',
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext(((action: Action) => {
  void action;
}) as React.Dispatch<Action>);

interface Props {
  children: React.ReactNode;
}

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
