import React from 'react';
import { useReducer } from 'react';
import { Todo } from './types/Todo';
import { Filter } from './enum/Filter';

type Action =
  | { type: 'add'; payload: Todo }
  | { type: 'update'; payload: Todo }
  | { type: 'updateMany'; payload: Todo[] }
  | { type: 'delete'; payload: number }
  | { type: 'deleteMany'; payload: number[] }
  | { type: 'filter'; payload: Filter };

interface State {
  todos: Todo[];
  filter: Filter;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'update':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo,
        ),
      };
    case 'updateMany':
      return {
        ...state,
        todos: state.todos.map(todo => {
          const updated = action.payload.find(t => t.id === todo.id);

          return updated ? updated : todo;
        }),
      };
    case 'delete':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'deleteMany':
      return {
        ...state,
        todos: state.todos.filter(todo => !action.payload.includes(todo.id)),
      };
    case 'filter':
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}

const getInitialTodos = (): Todo[] => {
  const stored = localStorage.getItem('todos');

  return stored ? JSON.parse(stored) : [];
};

const initialState: State = {
  todos: getInitialTodos(),
  filter: Filter.All,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
// export const Test: React.FC = () => {
// const initialTodos = [
//   { id: +new Date(), title: 'Title', completed: false },
//   { id: +new Date() + 1, title: 'Title2', completed: false },
// ];

//   const [{ todos }, dispatch] = useReducer(reducer, { todos: initialTodos });

//   localStorage.setItem('todos', JSON.stringify(todos));

//   const handleAddTodo = () =>
//     dispatch({
//       type: 'add',
//       payload: { id: +new Date(), title: 'Title', completed: false },
//     });

//   return <button onClick={handleAddTodo}>Add Todo</button>;
// };
