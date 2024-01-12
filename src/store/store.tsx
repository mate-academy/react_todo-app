import React, { useReducer } from 'react';
import { initStotage } from '../utils/initStotage';
import { saveStotage } from '../utils/saveStorage';
import { StatusTodos } from '../types/StatusTodos';
import { Todo } from '../types/Todo';

const KEY = 'todos';

type Action = { type: 'createTodo', payload: Todo }
| { type: 'deleteTodo', payload: number }
| { type: 'updateTodo', payload: Todo }
| { type: 'toggleTodo', payload: number }
| { type: 'toggleAllTodos' }
| { type: 'clearCompletedTodos' }
| { type: 'selectedTodos', payload: StatusTodos };

type State = {
  todos: Todo[],
  selectedTodos: StatusTodos,
};

function Reducer(state: State, action:Action):State {
  switch (action.type) {
    case 'createTodo': {
      const newTodos = [...state.todos, action.payload];

      saveStotage(KEY, newTodos);

      return { ...state, todos: newTodos };
    }

    case 'updateTodo': {
      const newTodos = state.todos.map(todo => (
        todo.id === action.payload.id
          ? {
            ...todo,
            title: action.payload.title,
            completed: action.payload.completed,
          }
          : todo
      ));

      saveStotage(KEY, newTodos);

      return { ...state, todos: newTodos };
    }

    case 'deleteTodo': {
      const newTodos = state.todos
        .filter(todo => todo.id !== action.payload);

      saveStotage(KEY, newTodos);

      return { ...state, todos: newTodos };
    }

    case 'toggleTodo': {
      const newTodos = state.todos.map(todo => (
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      ));

      saveStotage(KEY, newTodos);

      return { ...state, todos: newTodos };
    }

    case 'toggleAllTodos': {
      const newTodos = state.todos.map(todo => (
        { ...todo, completed: !todo.completed }
      ));

      saveStotage(KEY, newTodos);

      return { ...state, todos: newTodos };
    }

    case 'clearCompletedTodos': {
      const newTodos = state.todos
        .filter(todo => !todo.completed);

      saveStotage(KEY, newTodos);

      return { ...state, todos: newTodos };
    }

    case 'selectedTodos': {
      return { ...state, selectedTodos: action.payload };
    }

    default:
      return state;
  }
}

const initialTodos = initStotage<Todo[]>(KEY, []);

const initialState:State = {
  todos: initialTodos,
  selectedTodos: StatusTodos.All,
};

export const StateContext = React.createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
