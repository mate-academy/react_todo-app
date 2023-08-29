import { createContext, useReducer } from 'react';
import { Todo } from '../types/Todo';

// type TodosTemplate = todos: Todo[];

type Action = { type: 'addTodo', payload: string }
| { type: 'deleteTodo', payload: number };

export function reducer(state: Todo[], action: Action) {
  switch (action.type) {
    case 'addTodo':
      return [
        ...state,
        {
          id: Date.now(),
          title: action.payload,
          completed: false,
        },
      ];

    case 'deleteTodo':
      return [
        ...state.filter(todo => todo.id !== action.payload),
      ];
    // case 'toggle':
    //   return state.map(todo => {
    //     if (todo.id === action.payload) {
    //       todo.completed = !todo.completed
    //     }
    //     return todo
    //   })
    default:
      return state;
  }
}

export const initialTodos: Todo[] = [];

export const TodoContext = createContext({
  todos: initialTodos, dispatch: (action: Action) => {},
});
// export const DispatchContext = createContext((action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(
    reducer, initialTodos, // JSON.parse(localStorage.getItem('todos')) ?? [],
  );

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {/* <DispatchContext.Provider value={dispatch}> */}
      {children}
      {/* </DispatchContext.Provider> */}
    </TodoContext.Provider>
  );
};
