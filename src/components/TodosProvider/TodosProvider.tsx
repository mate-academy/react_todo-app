import { useMemo } from 'react';

import { Action, DispatchAction, Todo } from '../../types';
import { useLocalStorageReducer } from '../../hooks';
import { TodosContext } from '../../contexts';

function todosReducer(state: Todo[], action: DispatchAction): Todo[] {
  switch (action.type) {
    case Action.Add: {
      const newTodo: Todo = {
        id: +new Date(),
        title: action.payload,
        completed: false,
      };

      return [...state, newTodo];
    }

    case Action.Edit: {
      return state.map(todo => {
        return todo.id === action.payload.id
          ? {
            ...todo,
            title: action.payload.title,
          }
          : todo;
      });
    }

    case Action.Remove: {
      return state.filter(({ id }) => id !== action.payload);
    }

    case Action.Toggle: {
      return state.map(todo => {
        return todo.id === action.payload
          ? {
            ...todo,
            completed: !todo.completed,
          }
          : todo;
      });
    }

    case Action.ToggleAll: {
      const hasActive = state.some(({ completed }) => !completed);

      return state.map(todo => {
        if (hasActive) {
          return todo.completed
            ? todo
            : {
              ...todo,
              completed: true,
            };
        }

        return {
          ...todo,
          completed: false,
        };
      });
    }

    case Action.ClearCompleted: {
      return state.filter(({ completed }) => !completed);
    }

    default:
      return state;
  }
}

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useLocalStorageReducer('todos', todosReducer, []);

  const contextValue = useMemo(() => ({
    todos,
    dispatch,
  }), [todos]);

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
