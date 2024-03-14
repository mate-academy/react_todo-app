import React, { useReducer } from 'react';
import { Todo } from './types/Todo';

type Action =
  | { type: 'create' | 'update'; payload: Todo }
  | { type: 'updateAll'; payload: Todo[] }
  | { type: 'delete'; payload: { id: number } }
  | { type: 'deleteCompleted' };

interface TodoContext {
  state: Todo[];
  dispatch: React.Dispatch<Action>;
}

export const TodosContext = React.createContext<TodoContext>({} as TodoContext);

const intialTodos: Todo[] = [];

function reducer(state: Todo[], action: Action): Todo[] {
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
      return action.payload;
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
}

type Props = {
  children: React.ReactNode;
};

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialTodos);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
