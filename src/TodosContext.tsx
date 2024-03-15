import React from 'react';
import { Todo } from './types/Todo';
import { Action } from './types/Action';
import { useLocalStorage } from './hooks/useLocalStorage';

interface TodoContext {
  state: Todo[];
  dispatch: React.Dispatch<Action>;
}

export const TodosContext = React.createContext<TodoContext>({} as TodoContext);

const todosReducer: React.Reducer<Todo[], Action> = (state, action) => {
  switch (action.type) {
    case 'create': {
      const newTodo = {
        id: action.payload.id,
        title: action.payload.title,
        completed: false,
      };

      return [...state, newTodo];
    }

    case 'update': {
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, ...action.payload } : todo,
      );
    }

    case 'updateAll': {
      return state.map(todo => {
        return {
          ...todo,
          completed: action.payload.newStatus,
        };
      });
    }

    case 'delete': {
      return state.filter(todo => todo.id !== action.payload.id);
    }

    case 'deleteCompleted': {
      return state.filter(todo => !todo.completed);
    }

    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useLocalStorage(todosReducer, []);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
