import React, { useReducer } from 'react';
import { Todo } from '../types/Todo';

type Action =
  | { type: 'addTodo'; payload: Todo }
  | { type: 'updateTodoStatus'; payload: number }
  | { type: 'updateTodoTitle'; payload: Todo }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'toggleAll' }
  | { type: 'clearCompleted' };

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'addTodo':
      return [...state, action.payload];

    case 'updateTodoStatus':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    case 'updateTodoTitle':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo,
      );
    case 'toggleAll':
      const completedTodo = state.every(todo => todo.completed);

      return state.map(todo => ({
        ...todo,
        completed: !completedTodo,
      }));

    case 'deleteTodo':
      return state.filter(todo => todo.id !== action.payload);

    case 'clearCompleted':
      return state.filter(todo => !todo.completed);

    default:
      return state;
  }
}

const stateFromLocalStorage = (): Todo[] => {
  const localState = localStorage.getItem('todos');

  if (localState) {
    return JSON.parse(localState);
  }

  return [];
};

export const StateContext = React.createContext<Todo[]>([]);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, stateFromLocalStorage());

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state));
  }, [state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
