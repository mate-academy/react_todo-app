import React, { useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Action = { type: 'addTodo', payload: Todo }
| { type: 'deleteTodo', payload: Todo }
| { type: 'changeTitle', payload: { todoToChange: Todo, newTitle: string } }
| {
  type: 'toggleTodo', payload: {
    todoToComplete: Todo,
    newCompleted: boolean
  }
}
| { type: 'toggleAll', payload: boolean }
| { type: 'clearCompleted' };

function reducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'addTodo':
      return [...todos, action.payload];

    case 'deleteTodo':
      return todos.filter(todo => todo.id !== action.payload.id);

    case 'changeTitle':
      return todos.map(todo => {
        if (todo.id === action.payload.todoToChange.id) {
          return {
            ...todo,
            title: action.payload.newTitle,
          };
        }

        return todo;
      });

    case 'toggleTodo':
      return todos.map(todo => {
        if (todo.id === action.payload.todoToComplete.id) {
          return {
            ...todo,
            completed: action.payload.newCompleted,
          };
        }

        return todo;
      });

    case 'toggleAll':
      return todos.map(todo => ({
        ...todo,
        completed: action.payload,
      }));

    case 'clearCompleted':
      return todos.filter(todo => !todo.completed);

    default:
      return todos;
  }
}

export const DispatchContext = React.createContext<(action: Action) => void>(
  () => { });
export const TodosContext = React.createContext<Todo[]>([]);

interface Props {
  children: React.ReactNode;
}

export const GlobalContextProvider: React.FC<Props> = ({ children }) => {
  const [localStorageValue, setLocalStorageValue] = useLocalStorage(
    'todos',
    [],
  );
  const [state, dispatch] = useReducer(reducer, localStorageValue);

  useEffect(
    () => {
      setLocalStorageValue(state);
    },
    [state, setLocalStorageValue],
  );

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosContext.Provider value={state}>
        {children}
      </TodosContext.Provider>
    </DispatchContext.Provider>
  );
};
