import React from 'react';
import { Todo } from './types/Todo';

// function useLocalStorage<T>(
//   key: string,
//   defaultValue: T,
// ): [T, React.Dispatch<React.SetStateAction<T>>] {
//   const [value, setValue] = useState<T>(() => {
//     const saved = localStorage.getItem(key);

//     if (saved === null) {
//       return defaultValue;
//     }

//     try {
//       return JSON.parse(saved);
//     } catch (e) {
//       localStorage.removeItem(key);

//       return defaultValue;
//     }
//   });

//   React.useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue];
// }

type RootState = {
  todos: Todo[];
};

type Action =
  | { type: 'getTodos' }
  | { type: 'addTodo'; payload: Todo }
  | { type: 'deleteTodo'; payload: { id: Todo['id'] } }
  | { type: 'updateTodoStatus'; payload: { id: Todo['id']; complete: boolean } }
  | { type: 'updateTodoTitle'; payload: { id: Todo['id']; title: string } };

const reducer = (state: RootState, action: Action): RootState => {
  switch (action.type) {
    case 'getTodos':
      return state;

    case 'addTodo':
      return {
        todos: [...state.todos, action.payload],
      };

    case 'deleteTodo':
      return {
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };

    case 'updateTodoTitle':
      return {
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo,
        ),
      };

    case 'updateTodoStatus':
      return {
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: action.payload.complete }
            : todo,
        ),
      };

    default:
      return state;
  }
};

const initialState: RootState = {
  todos: [],
};

export const StateContext = React.createContext<RootState>(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const initializer = (state: RootState): RootState => {
    try {
      const todosStr = localStorage.getItem('todos');

      if (todosStr) {
        const todos = JSON.parse(todosStr);

        return { todos };
      }
    } catch {}

    return state;
  };

  const [state, dispatch] = React.useReducer(
    reducer,
    initialState,
    initializer,
  );

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
