import { createContext, useMemo } from 'react';

import { Action, Todo } from '../../types';
import { useLocalStorageReducer } from '../../hooks';

type TodosContextValue = {
  todos: Todo[];
  dispatch: React.Dispatch<DispatchAction>;
};

export const TodosContext = createContext<TodosContextValue>({
  todos: [],
  dispatch: () => {},
});

type DispatchAction = { type: Action.Add, payload: string }
| { type: Action.Remove, payload: number }
| { type: Action.Edit, payload: { id: number, title: string } }
| { type: Action.Toggle, payload: number }
| { type: Action.ToggleAll }
| { type: Action.ClearCompleted };

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
      const index = state.findIndex(({ id }) => id === action.payload.id);
      const oldTodo = state[index];
      const newTodo = {
        ...oldTodo,
        title: action.payload.title,
      };

      return [
        ...state.slice(0, index),
        newTodo,
        ...state.slice(index + 1),
      ];
    }

    case Action.Remove: {
      return state.filter(({ id }) => id !== action.payload);
    }

    case Action.Toggle: {
      const index = state.findIndex(({ id }) => id === action.payload);
      const oldTodo = state[index];
      const newTodo = {
        ...oldTodo,
        completed: !oldTodo.completed,
      };

      return [
        ...state.slice(0, index),
        newTodo,
        ...state.slice(index + 1),
      ];
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
      throw new Error('Unsupported action.');
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
