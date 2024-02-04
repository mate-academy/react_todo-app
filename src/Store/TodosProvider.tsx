import React, { useReducer, useEffect } from 'react';
import { Todo } from '../Types/Todo';
import { useLocalStorage } from './LocalStorage';

export type Action
  = { type: 'addTodo', payload: Todo }
  | { type: 'deleteTodo', payload: Todo }
  | {
    type: 'toggleCompleted',
    payload: { toComplete: Todo, completed: boolean }
  }
  | { type: 'toggleAll', payload: boolean }
  | { type: 'clearCompleted' }
  | { type: 'editTodo', payload: { toEditTodo: Todo, newTitle: string } };

type HandleAction = (action: Action) => void;

export const TodosContext = React.createContext<Todo[]>([]);
export const DispatchContext = React.createContext<HandleAction>(() => { });

type Props = {
  children: React.ReactNode;
};

function reducer(todos: Todo[], action: Action) {
  const { type } = action;

  switch (type) {
    case 'addTodo':
      return [...todos, action.payload];

    case 'toggleAll':
      return todos.map(todo => ({
        ...todo,
        completed: action.payload,
      }));

    case 'toggleCompleted':
      return todos.map(todo => {
        if (todo.id === action.payload.toComplete.id) {
          return {
            ...todo,
            completed: action.payload.completed,
          };
        }

        return todo;
      });

    case 'editTodo':
      return todos.map(todo => {
        if (todo.id === action.payload.toEditTodo.id) {
          return {
            ...todo,
            title: action.payload.newTitle,
          };
        }

        return todo;
      });

    case 'deleteTodo':
      return todos.filter((todo) => todo.id !== action.payload.id);

    case 'clearCompleted':
      return todos.filter(todo => !todo.completed);

    default:
      return [...todos];
  }
}

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [storedTodos, setTodosState] = useLocalStorage<Todo[]>('todos', []);
  const [state, dispatch] = useReducer(reducer, storedTodos);

  useEffect(
    () => {
      setTodosState(state);
    }, [state, setTodosState],
  );

  return (
    <TodosContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  );
};
