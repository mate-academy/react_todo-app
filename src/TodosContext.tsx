/* eslint-disable @typescript-eslint/indent */
import React, { useReducer, useState } from 'react';
import { Todo } from './types/Todo';
import { todosFromServer } from './api/todos';
import { useLocalStorage } from './hooks/useLocalStogare';

type Action = { type: 'add'; payload: Todo }
  | { type: 'delete'; payload: number }
  | { type: 'done'; payload: Todo }
  | { type: 'toggle-all' }
  | { type: 'clear-completed' };

function reducer(todos: Todo[], action: Action) {
  switch (action.type) {
    case 'add':
      useLocalStorage('todos', [...todos, action.payload]);
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

type Props = {
  children: React.ReactNode;
};

export const GlobalTodosProvider: React.FC<Props> = ({ children }) => {
  const [localsTodos, setLocalsTodos]
    = useLocalStorage('todos', []);
  const [todos, dispatch] = useReducer(reducer, localsTodos);

  if (localsTodos !== todos) {
    setLocalsTodos([...todos]);
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosContext.Provider value={todos}>
        {children}
      </TodosContext.Provider>
    </DispatchContext.Provider>

  );
};
