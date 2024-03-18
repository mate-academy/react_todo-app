import React from 'react';
import { Todo } from '../type/Todo';
import { Action } from '../type/Action';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface TodoContext {
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
}

export const TodosContext = React.createContext({} as TodoContext);

function todosHandler(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'create':
      return [
        ...todos,
        {
          id: action.playload.id,
          title: action.playload.title,
          completed: false,
        },
      ];

    case 'update':
      return todos.map(todo =>
        todo.id === action.playload.id ? { ...todo, ...action.playload } : todo,
      );

    case 'delete':
      return todos.filter(todo => todo.id !== action.playload.id);

    case 'updateAll':
      return todos.map(todo => {
        return {
          ...todo,
          completed: action.playload.completed,
        };
      });

    case 'deleteCompleted':
      return todos.filter(todo => todo.completed === false);

    default:
      return todos;
  }
}

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useLocalStorage(todosHandler, []);

  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
