import React from 'react';
import { Todo } from './types/Todo';
import { Action } from './types/Action';
import { useLocalStorage } from './localStorage/useLocalStorage';

type TodoContextProps = {
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
};

type Props = {
  children: React.ReactNode;
};

export const ContextTodos = React.createContext({} as TodoContextProps);

const todosHandler = (todos: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'create':
      return [
        ...todos,
        {
          id: action.playload.id,
          completed: action.playload.completed,
          title: action.playload.title,
        },
      ];
    case 'update':
      return todos.map(todo =>
        todo.id === action.playload.id ? { ...todo, ...action.playload } : todo,
      );
    case 'delete':
      return todos.filter(todo => todo.id !== action.playload.id);
    case 'updateCompleteAll':
      return todos.map(todo => {
        return {
          ...todo,
          completed: action.playload.completed,
        };
      });
    case 'deleteCompleted':
      return todos.filter(todo => todo.completed !== true);

    default:
      return todos;
  }
};

export const TodoContext: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useLocalStorage(todosHandler, []);

  return (
    <ContextTodos.Provider value={{ todos, dispatch }}>
      {children}
    </ContextTodos.Provider>
  );
};
