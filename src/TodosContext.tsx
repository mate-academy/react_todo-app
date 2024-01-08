/* eslint-disable @typescript-eslint/indent */
import React, {
  useEffect, useReducer, useRef, useState,
} from 'react';
import { Todo } from './types/Todo';
import { todosFromServer } from './api/todos';

type Action = { type: 'add'; payload: Todo }
  | { type: 'delete'; payload: number }
  | { type: 'done'; payload: Todo }
  | { type: 'toggle-all' }
  | { type: 'clear-completed' };

function reducer(todos: Todo[], action: Action) {
  switch (action.type) {
    case 'add':
      return [...todos, action.payload];
    case 'delete':
      return todos.filter(currentPost => currentPost.id !== action.payload);
    case 'toggle-all': {
      const isEveryNotDone = todos.every((td) => td.completed === true);

      return todos.map((todo) => {
        const currentTodo = todo;

        if (isEveryNotDone) {
          currentTodo.completed = !currentTodo.completed;
        } else {
          currentTodo.completed = true;
        }

        return todo;
      });
    }

    case 'done': {
      const currentTodo = action.payload;

      currentTodo.completed = !currentTodo.completed;

      return [...todos];
    }

    case 'clear-completed':
      return todos.filter((todo) => todo.completed === false);
    default:
      return todos;
  }
}

export const TodosContext = React.createContext(todosFromServer);
export const DispatchContext = React.createContext((action: Action) => {
  // eslint-disable-next-line no-console
  console.log(action);
});

function useLocalStorage(
  key: string, initialValue: Todo[],
): [Todo[], (v: Todo[]) => void] {
  const [value, setValue] = useState(() => {
    /* get value by key from the local storage and save it to the `value` */
    const data = localStorage.getItem(key);

    if (data === null) {
      return initialValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      return initialValue;
    }
  });

  // save `value` to the `state` and local storage
  const save = (newValue: Todo[]) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}

type Props = {
  children: React.ReactNode;
};

export const GlobalTodosProvider: React.FC<Props> = ({ children }) => {
  const [localsTodos, setLocalsTodos]
    = useLocalStorage('todos', todosFromServer);
  const firstRender = useRef(true);
  const [todos, dispatch] = useReducer(reducer, localsTodos);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      return;
    }

    setLocalsTodos(todos);
  }, [todos, setLocalsTodos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosContext.Provider value={todos}>
        {children}
      </TodosContext.Provider>
    </DispatchContext.Provider>

  );
};
